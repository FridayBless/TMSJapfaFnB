from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from io import BytesIO

import shutil
import os
import datetime
import pandas as pd
import json
import math
import requests
import time

# Import file lokal 
from database import SessionLocal, engine, Base
import models, schemas, auth, dependencies, vrp_solver
from models import TMSRoutePlan, FleetVehicle, HRDriver, DeliveryOrder, User, DOStatus

# ==========================================
# 1. PERSIAPAN FOLDER & INISIALISASI
# ==========================================
os.makedirs("uploads/epod", exist_ok=True)
app = FastAPI(title="TMS JAPFA - AI Engine Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 🌟 RUMUS BAN SEREP (JARAK GARIS LURUS BUMI)
# ==========================================
def calculate_haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius bumi dalam KM
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return int((R * c) * 1000) # Meter

# ==========================================
# 🔌 API 1: UPLOAD SAP EXCEL (DETEKTIF NLP & TIME WINDOWS)
# ==========================================
@app.post("/api/orders/upload")
async def upload_sap_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    try:
        df = pd.read_csv(BytesIO(contents)) if file.filename.endswith('.csv') else pd.read_excel(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Gagal baca file: {str(e)}")

    # 1. Normalisasi Header
    df.columns = df.columns.str.upper().str.strip()
    df = df.dropna(how='all')

    # Identifikasi Kolom (Auto-Mapping)
    col_nama = 'NAMA CUSTOMER' if 'NAMA CUSTOMER' in df.columns else df.columns[2]
    col_kode = 'KODE CUST.' if 'KODE CUST.' in df.columns else df.columns[12]
    col_desc = 'VALIDASI' if 'VALIDASI' in df.columns else df.columns[4]
    col_qty = 'QTY' if 'QTY' in df.columns else df.columns[7]
    col_ket = 'KETERANGAN' if 'KETERANGAN' in df.columns else df.columns[11]

    # 2. Obat Anti-Total (Hapus baris tanpa nama barang)
    df = df.dropna(subset=[col_desc])

    # 3. Obat Kebal Kordinat
    for col in ['LATITUDE', 'LONGITUDE']:
        if col not in df.columns: df[col] = None

    # Bersihkan DO Lama yang masih gantung
    db.query(models.DeliveryOrder).filter(
        models.DeliveryOrder.status.in_([models.DOStatus.so_waiting_verification, models.DOStatus.do_verified])
    ).delete(synchronize_session=False)

    df[col_nama] = df[col_nama].ffill()
    df[col_kode] = df[col_kode].ffill()

    orders_dict = {}
    
    for _, row in df.iterrows():
        kode_cust_val = row.get(col_kode)
        if pd.isna(kode_cust_val) or str(kode_cust_val).strip() == '': continue
        
        # 🌟 DETEKTIF NLP: BACA KETERANGAN EXCEL
        keterangan_teks = str(row.get(col_ket, '')).strip().upper()
        
        # Aturan 1: Kalau Diambil Cust, langsung lewatin (Drop dari Routing)
        if 'DIAMBIL CUST' in keterangan_teks:
            continue
            
        # Aturan 2: Time Windows (Batas Jam Pengiriman)
        # Standar operasional: 06:00 (360 mnt) sampai 20:00 (1200 mnt)
        window_start = 360 
        window_end = 1200  
        
        # 🌟 DETEKTIF NLP YANG UDAH DI-UPGRADE
        if 'PAGI' in keterangan_teks or '10' in keterangan_teks:
            window_end = 600 # Maksimal Jam 10:00
        elif '12' in keterangan_teks or 'SIANG' in keterangan_teks:
            window_end = 720 # Maksimal Jam 12:00
        elif '15' in keterangan_teks or 'SORE' in keterangan_teks:
            window_end = 900 # Maksimal Jam 15:00
        
        kode_cust = str(kode_cust_val).split('.')[0]
        nama_toko = str(row.get(col_nama, 'Unknown')).strip()
        cust_key = f"{kode_cust}_{nama_toko}"
        
        if cust_key not in orders_dict:
            orders_dict[cust_key] = {
                "kode": kode_cust, "nama": nama_toko, "lat": None, "lon": None, 
                "berat": 0.0, "items": [], "tw_start": window_start, "tw_end": window_end
            }
            
        lat_val, lon_val, qty_val, desc_val = row.get('LATITUDE'), row.get('LONGITUDE'), row.get(col_qty), row.get(col_desc)

        # 🌟 LOGIKA NGINTIP MASTER DATABASE
        if pd.notna(lat_val) and str(lat_val).strip() not in ['-', 'LATITUDE']:
            try:
                orders_dict[cust_key]["lat"] = float(str(lat_val).replace(',', '.'))
                orders_dict[cust_key]["lon"] = float(str(lon_val).replace(',', '.'))
            except: pass
            
        # Kalau di Excel kosong, coba intip tabel CustomerMaster!
        if orders_dict[cust_key]["lat"] is None or orders_dict[cust_key]["lon"] is None:
            master_data = db.query(models.CustomerMaster).filter(models.CustomerMaster.kode_customer == kode_cust).first()
            if master_data and master_data.latitude and master_data.longitude:
                orders_dict[cust_key]["lat"] = master_data.latitude
                orders_dict[cust_key]["lon"] = master_data.longitude
            
        if pd.notna(qty_val):
            try:
                str_qty = str(qty_val).replace(',', '.')
                if str_qty.count('.') > 1: str_qty = str_qty.replace('.', '', str_qty.count('.') - 1)
                q = float(str_qty)
                if q > 0:
                    orders_dict[cust_key]["items"].append({"nama_barang": str(desc_val) if pd.notna(desc_val) else "Item SAP", "qty": f"{q} KG"})
                    orders_dict[cust_key]["berat"] += q
            except: pass

    success_list, failed_list, count = [], [], 0
    
    for cust_key, data in orders_dict.items():
        if data["berat"] <= 0: continue
        
        if data["lat"] and data["lon"]:
            new_do = models.DeliveryOrder(
                order_id=f"DO-{data['kode']}-{int(time.time())}-{count}",
                customer_name=data['nama'],
                latitude=data['lat'],
                longitude=data['lon'],
                weight_total=data['berat'],
                service_type=json.dumps(data['items']),
                delivery_window_start=data['tw_start'], 
                delivery_window_end=data['tw_end'],     
                status=models.DOStatus.do_verified 
            )
            db.add(new_do)
            count += 1
            success_list.append({
                "order_id": new_do.order_id,
                "kode_customer": data['kode'],
                "nama_toko": data['nama'], 
                "berat": round(data['berat'], 2), 
                "kordinat": f"{data['lat']}, {data['lon']}", 
                "jam_maks": "10:00" if data['tw_end'] == 600 else "20:00",
                "items": data['items'] # 🌟 ITEMS DIKIRIM KE FRONTEND
            })
        else:
            failed_list.append({
                "kode_customer": data['kode'],
                "nama_toko": data['nama'], 
                "berat": round(data['berat'], 2), # 🌟 BERAT DIKIRIM JUGA!
                "items": data['items'],           # 🌟 ITEMS DIKIRIM JUGA!
                "jam_maks": "10:00" if data['tw_end'] == 600 else "20:00",
                "alasan": "Koordinat GPS Kosong / Format Salah"
            })
            
    db.commit()
    return {"message": "Validasi Upload Selesai!", "success_list": success_list, "failed_list": failed_list}

def classify_store(store_name):
    if not store_name: return False
    return any(keyword in str(store_name).upper() for keyword in ['MALL', 'PLAZA', 'SQUARE', 'FOOD HALL', 'SUPERMARKET', 'ITC', 'HYPERMART', 'AEON', 'HERO'])


# ==========================================
# ⏱️ API BARU: UPDATE JAM MAKSIMAL (MANUAL OVERRIDE)
# ==========================================
class TimeUpdateParams(BaseModel):
    jam_maksimal: str  # Format dari React bakal bentuk "12:00"

@app.put("/api/orders/{order_id}/time")
def update_batas_waktu(order_id: str, data: TimeUpdateParams, db: Session = Depends(get_db)):
    order = db.query(models.DeliveryOrder).filter(models.DeliveryOrder.order_id == order_id).first()
    if not order: raise HTTPException(status_code=404, detail="Order tidak ditemukan")
    
    try:
        if not data.jam_maksimal or data.jam_maksimal == "":
            # Kalau dihapus/kosongin sama admin, balikin ke default Jam 20:00 (1200 menit)
            order.delivery_window_end = 1200
        else:
            # Ubah format "10:30" jadi total menit (630 menit) buat dikunyah AI
            h, m = map(int, data.jam_maksimal.split(":"))
            total_menit = (h * 60) + m
            order.delivery_window_end = total_menit
            
        db.commit()
        return {"message": f"Batas waktu {order.customer_name} diubah jadi {data.jam_maksimal}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Format jam salah!")

# ==========================================
# 📍 API BARU: INPUT KOORDINAT MANUAL (SELF-HEALING)
# ==========================================
class CoordinateUpdateParams(BaseModel):
    latitude: float
    longitude: float
    kode_customer: str
    nama_customer: str

@app.put("/api/orders/{order_id}/coordinate")
def update_koordinat_manual(order_id: str, data: CoordinateUpdateParams, db: Session = Depends(get_db)):
    # Karena kita ngirim ID dummy "DRAFT-0" dari Frontend buat toko yang gagal masuk DB,
    # Kita bypass pencarian Order ID kalau depannya "DRAFT"
    
    if order_id.startswith("DRAFT-"):
        # Kita cuma fokus nyimpen ke Master Database aja
        master_cust = db.query(models.CustomerMaster).filter(models.CustomerMaster.kode_customer == data.kode_customer).first()
        if master_cust:
            master_cust.latitude = data.latitude
            master_cust.longitude = data.longitude
        else:
            new_master = models.CustomerMaster(
                kode_customer=data.kode_customer,
                nama_customer=data.nama_customer,
                latitude=data.latitude,
                longitude=data.longitude
            )
            db.add(new_master)
            
        db.commit()
        return {"message": "Koordinat DRAFT berhasil diselamatkan ke Master Database!"}

    # Kalau ID-nya beneran (Misal DO-123), update ordernya juga (Buat jaga-jaga kalau kepake)
    order = db.query(models.DeliveryOrder).filter(models.DeliveryOrder.order_id == order_id).first()
    if not order: 
        raise HTTPException(status_code=404, detail="Order tidak ditemukan")
    
    order.latitude = data.latitude
    order.longitude = data.longitude
    order.status = models.DOStatus.do_verified
    
    master_cust = db.query(models.CustomerMaster).filter(models.CustomerMaster.kode_customer == data.kode_customer).first()
    if master_cust:
        master_cust.latitude = data.latitude
        master_cust.longitude = data.longitude
    else:
        new_master = models.CustomerMaster(
            kode_customer=data.kode_customer,
            nama_customer=data.nama_customer,
            latitude=data.latitude,
            longitude=data.longitude
        )
        db.add(new_master)
        
    db.commit()
    return {"message": "Koordinat berhasil diselamatkan dan disimpan ke Master Database!"}
    
# ==========================================
# 🚚 API 2: FUSION VRP + TOMTOM MATRIX + REAL ROAD GEOMETRY
# ==========================================
@app.post("/optimize-routes")
def optimize_and_assign_routes(preview: bool = False, db: Session = Depends(get_db)):
    pending_orders = db.query(models.DeliveryOrder).filter(models.DeliveryOrder.status == models.DOStatus.do_verified).all()
    if not pending_orders: raise HTTPException(status_code=400, detail="Tidak ada DO terverifikasi!")

    vehicles = db.query(models.FleetVehicle).all()
    drivers = db.query(models.HRDriver).filter(models.HRDriver.status == True).all()
    if not vehicles or not drivers: raise HTTPException(status_code=500, detail="Master data Truk/Supir kosong!")

    # 🌟 OBAT BARU CTO: DYNAMIC FLEET SELECTION
    total_berat_all_orders = sum(int(o.weight_total) for o in pending_orders)
    
    # Asumsi kapasitas rata-rata truk lu, misalnya 2000 KG (Bisa lu sesuain)
    avg_capacity = 2000 
    
    # Hitung kebutuhan ideal (N truk). Kita tambahin + 1 truk cadangan biar AI ngga engap.
    ideal_truck_needed = (total_berat_all_orders // avg_capacity) + 2 
    
    # Pastiin jumlah ideal_truck ngga melebihi total truk fisik yang lu punya di database
    active_vehicles_count = min(ideal_truck_needed, len(vehicles))

    # KASIH JATAH TRUK KE AI SESUAI JUMLAH AKTIF AJA!
    vehicle_capacities = [int(vehicles[i].capacity_kg) for i in range(active_vehicles_count)]
    num_vehicles = len(vehicle_capacities)

    # ... Sisa kodingan ke bawah (gudang_lat, gudang_lon, dsb) biarin tetep utuh!

    gudang_lat, gudang_lon = -6.207356, 106.479163
    locations = [{"lat": gudang_lat, "lon": gudang_lon}]
    demands = [0]          
    is_mall_list = [False] 
    time_windows = [(360, 1200)] 
    node_to_order = {} 
    
    for idx, order in enumerate(pending_orders):
        locations.append({"lat": float(order.latitude), "lon": float(order.longitude)})
        demands.append(int(order.weight_total)) 
        is_mall_list.append(classify_store(order.customer_name))
        tw_start = order.delivery_window_start if order.delivery_window_start else 360
        tw_end = order.delivery_window_end if order.delivery_window_end else 1200
        time_windows.append((tw_start, tw_end))
        node_to_order[idx + 1] = order

    TOMTOM_API_KEY = "xUy50YsjmbRexLalxX3ThDpmC1lOzElP"

    try:
        url = f"https://api.tomtom.com/routing/matrix/2/async?key={TOMTOM_API_KEY}"
        points = [{"point": {"latitude": loc["lat"], "longitude": loc["lon"]}} for loc in locations]
        payload = {"origins": points, "destinations": points, "options": {"routeType": "fastest", "traffic": "historical", "travelMode": "truck"}}
        
        print(f"CCTV 4: Menembak API TomTom MATRIX ASYNC...")
        response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
        response.raise_for_status()
        
        matrix_result = None
        if response.status_code == 202:
            job_id = response.json().get('jobId')
            tracking_url = f"https://api.tomtom.com/routing/matrix/2/async/{job_id}?key={TOMTOM_API_KEY}"
            for _ in range(30):
                time.sleep(2)
                status_res = requests.get(tracking_url)
                if status_res.status_code == 200:
                    data_tomtom = status_res.json()
                    status_pengerjaan = data_tomtom.get("state", "").upper()
                    if status_pengerjaan == "COMPLETED":
                        matrix_result = requests.get(f"https://api.tomtom.com/routing/matrix/2/async/{job_id}/result?key={TOMTOM_API_KEY}").json()
                        break
                    elif status_pengerjaan == "FAILED": raise Exception("TomTom gagal menghitung rute!")
            if not matrix_result: raise Exception("TomTom kelamaan mikir!")
        else: matrix_result = response.json()
        
        jumlah_lokasi = len(locations)
        distance_matrix, time_matrix = [[0]*jumlah_lokasi for _ in range(jumlah_lokasi)], [[0]*jumlah_lokasi for _ in range(jumlah_lokasi)]

        if "data" in matrix_result:
            for cell in matrix_result["data"]:
                o_idx, d_idx = cell.get("originIndex", 0), cell.get("destinationIndex", 0)
                if "routeSummary" in cell:
                    distance_matrix[o_idx][d_idx] = cell["routeSummary"]["lengthInMeters"]
                    time_matrix[o_idx][d_idx] = int(cell["routeSummary"].get("travelTimeInSeconds", 0) / 60)
                else: distance_matrix[o_idx][d_idx], time_matrix[o_idx][d_idx] = 999999, 999
        print("✅ CCTV 4: SUKSES MENARIK DATA TOMTOM MATRIX!")
    except Exception as e:
        print(f"⚠️ TOMTOM ERROR: {e}. SWITCH KE BAN SEREP HAVERSINE!")
        distance_matrix, time_matrix = [], []
        for i in locations:
            row, t_row = [], []
            for j in locations:
                jarak_m = calculate_haversine(float(i["lat"]), float(i["lon"]), float(j["lat"]), float(j["lon"]))
                row.append(jarak_m)
                t_row.append(int(jarak_m / 400)) 
            distance_matrix.append(row)
            time_matrix.append(t_row)

    # ... (Kode di atasnya tetep sama)
    
    matrix_km = [[int(jarak / 1000) for jarak in baris] for baris in distance_matrix]
    print("CCTV 5: Mesin VRP OR-Tools Sedang Berpikir...")
    hasil_vrp = vrp_solver.solve_vrp(matrix_km, time_matrix, demands, num_vehicles, vehicle_capacities, is_mall_list, time_windows)
    if not hasil_vrp: raise HTTPException(status_code=400, detail="Mesin VRP nyerah! Rute terlalu kompleks!")

    formatted_routes, assigned_nodes = [], set()
    today_date = datetime.datetime.now().date()
    
    rute_lama = db.query(models.TMSRoutePlan).filter(models.TMSRoutePlan.planning_date == today_date).all()
    for rute in rute_lama: db.query(models.TMSRouteLine).filter(models.TMSRouteLine.route_id == rute.route_id).delete()
    db.query(models.TMSRoutePlan).filter(models.TMSRoutePlan.planning_date == today_date).delete()
    
    def menit_ke_jam(menit_total): return datetime.time(hour=int((menit_total // 60) % 24), minute=int(menit_total % 60))

    # 🌟 PERBAIKAN: Bikin penghitung buat truk yang beneran jalan
    active_truck_counter = 0 

    for truck_idx, route_indices in enumerate(hasil_vrp['routes']):
        if len(route_indices) <= 2: continue # Kalau isinya cuma Depot -> Depot, lewatin aja

        # 🌟 AMAN SENTOSA: Tarik dari database berdasarkan truk yang BENERAN JALAN
        vehicle_db = vehicles[active_truck_counter]
        driver_db = drivers[active_truck_counter] if active_truck_counter < len(drivers) else drivers[0]
        route_plan_id = f"RP-{datetime.datetime.now().strftime('%Y%m%d')}-T{active_truck_counter+1}"
        active_truck_counter += 1
        
        total_jarak_m = sum(distance_matrix[route_indices[i]][route_indices[i+1]] for i in range(len(route_indices)-1))
        real_total_km = round(total_jarak_m / 1000.0, 1)

        new_plan = models.TMSRoutePlan(route_id=route_plan_id, planning_date=today_date, vehicle_id=vehicle_db.vehicle_id, driver_id=driver_db.driver_id, total_weight=0, total_distance_km=real_total_km)
        db.add(new_plan)
        
        # ... (Sisa kodingan ke bawah tetep sama persis: total_muatan = 0 dst...)
        
        total_muatan, current_time_minutes, prev_node = 0, 360, 0
        manifest_rute = [] 
        
        # 🌟 LOGIKA BARU: Tarik GARIS ASPAL TomTom
        route_geometry = []
        waypoints_str = ":".join([f"{locations[n]['lat']},{locations[n]['lon']}" for n in route_indices])
        try:
            calc_url = f"https://api.tomtom.com/routing/1/calculateRoute/{waypoints_str}/json?key={TOMTOM_API_KEY}&routeType=fastest&travelMode=truck"
            calc_res = requests.get(calc_url)
            if calc_res.status_code == 200:
                pts = calc_res.json()['routes'][0]['legs']
                for leg in pts:
                    for p in leg['points']:
                        route_geometry.append([p['latitude'], p['longitude']])
        except Exception as e: print(f"Gagal tarik garis aspal TomTom truk {truck_idx}: {e}")

        for step, node_idx in enumerate(route_indices):
            assigned_nodes.add(node_idx) 
            segment_jarak_m = distance_matrix[prev_node][node_idx] if step != 0 else 0
            segmen_km_real = round(segment_jarak_m / 1000.0, 1)

            if node_idx == 0:
                current_time_minutes += time_matrix[prev_node][node_idx] if step != 0 else 0
                prev_node = node_idx
                manifest_rute.append({
                    "urutan": step, "lokasi": "📍 GUDANG CIKUPA", "jam": str(menit_ke_jam(current_time_minutes)), 
                    "keterangan": "Start" if step == 0 else "Finish", "lat": gudang_lat, "lon": gudang_lon, "distance_from_prev_km": segmen_km_real 
                })
                continue 
                
            muatan_titik = demands[node_idx]
            total_muatan += muatan_titik
            current_time_minutes += time_matrix[prev_node][node_idx]
            
            if current_time_minutes < time_windows[node_idx][0]: current_time_minutes = time_windows[node_idx][0]
                
            durasi_bongkar = (60 if is_mall_list[node_idx] else 15) + (muatan_titik / 10.0)
            selesai_bongkar = current_time_minutes + durasi_bongkar
            prev_node = node_idx
            order = node_to_order[node_idx]
            
            new_line = models.TMSRouteLine(route_id=route_plan_id, order_id=order.order_id, sequence=step, est_arrival=menit_ke_jam(current_time_minutes), distance_from_prev_km=segmen_km_real)
            db.add(new_line)
            order.status = models.DOStatus.do_assigned_to_route
            
            manifest_rute.append({
                "urutan": step, "nomor_do": order.order_id, "nama_toko": order.customer_name, 
                "turun_barang_kg": round(muatan_titik, 2), "jam_tiba": str(menit_ke_jam(current_time_minutes)),
                "lat": float(order.latitude), "lon": float(order.longitude), "distance_from_prev_km": segmen_km_real
            })
            current_time_minutes = selesai_bongkar
            
        new_plan.total_weight = total_muatan
        
        # 🌟 SIMPAN GEOMETRY KE JSON LOKAL BIAR GAK NEMBAK API TERUS SAAT REFRESH
        if not preview:
            os.makedirs("route_geometries", exist_ok=True)
            with open(f"route_geometries/{route_plan_id}.json", "w") as f:
                json.dump(route_geometry, f)

        formatted_routes.append({
            "route_id": route_plan_id, "armada": vehicle_db.license_plate, 
            "total_muatan_kg": total_muatan, "total_jarak_km": real_total_km, 
            "detail_perjalanan": manifest_rute, "garis_aspal": route_geometry 
        })

    dropped_nodes_data = []
    unassigned = [node_to_order[n] for n in range(1, len(locations)) if n not in assigned_nodes]
    for o in unassigned:
        dropped_nodes_data.append({
            "nama_toko": o.customer_name, "berat_kg": o.weight_total, 
            "lat": float(o.latitude), "lon": float(o.longitude), "alasan": "Kapasitas Truk Penuh / Luar Jam Kerja"
        })

    toko_hilang = len(unassigned)
    pesan_info = "Seluruh rute berhasil dicetak ke Database." if toko_hilang == 0 else f"⚠️ {toko_hilang} Toko di-drop oleh AI (Over Capacity / Lewat Jam Kerja)!"

    if preview:
        db.rollback()
        pesan_info = "[PREVIEW MODE] " + pesan_info
    else: db.commit()

    return {"message": "FUSION VRP BERHASIL!", "jadwal_truk_internal": formatted_routes, "dropped_nodes_peta": dropped_nodes_data, "info_text": pesan_info}

# ==========================================
# 📋 ROUTE READERS & UTILITIES (DIUPDATE BUAT BACA GEOMETRY JSON LOKAL)
# ==========================================
@app.get("/api/routes")
def get_all_routes(date: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.TMSRoutePlan)
    if date:
        try: 
            tanggal_asli = datetime.datetime.strptime(date, "%Y-%m-%d").date()
            query = query.filter(models.TMSRoutePlan.planning_date == tanggal_asli)
        except: pass
            
    hasil = []
    zona_dummy = ["CENGKARENG", "KELAPA GADING", "PONDOK INDAH", "BEKASI SELATAN", "DEPOK", "BOGOR", "TANGERANG"]
    
    for rute in query.all():
        lines = db.query(models.TMSRouteLine).filter(models.TMSRouteLine.route_id == rute.route_id).order_by(models.TMSRouteLine.sequence).all()
        detail_rute = []
        
        for l in lines:
            order_data = db.query(models.DeliveryOrder).filter(models.DeliveryOrder.order_id == l.order_id).first()
            if order_data:
                items_list = []
                try:
                    if order_data.service_type:
                        items_list = json.loads(order_data.service_type)
                except: pass
                
                detail_rute.append({
                    "urutan": l.sequence, 
                    "nama_toko": order_data.customer_name, 
                    "latitude": float(order_data.latitude) if order_data.latitude else 0.0,
                    "longitude": float(order_data.longitude) if order_data.longitude else 0.0,
                    "berat_kg": order_data.weight_total, 
                    "jam_tiba": str(l.est_arrival),
                    "distance_from_prev_km": getattr(l, 'distance_from_prev_km', 0.0), 
                    "items": items_list
                })
                
        idx_zona = int(rute.route_id[-1]) % len(zona_dummy) if rute.route_id[-1].isdigit() else 0
        
        # 🌟 BACA GEOMETRY LOKAL (BIAR GAK BOROS KUOTA PAS REFRESH HALAMAN)
        garis_aspal = []
        try:
            with open(f"route_geometries/{rute.route_id}.json", "r") as f:
                garis_aspal = json.load(f)
        except: pass

        hasil.append({
            "route_id": rute.route_id, 
            "tanggal": rute.planning_date.strftime("%Y-%m-%d") if rute.planning_date else "-",
            "driver_name": rute.driver.name if rute.driver else "Belum Ditentukan",
            "kendaraan": rute.vehicle.license_plate if rute.vehicle else "-", 
            "jenis": rute.vehicle.type if rute.vehicle else "-",
            "destinasi_jumlah": len(detail_rute), 
            "total_berat": rute.total_weight, 
            "total_distance_km": rute.total_distance_km,
            "status": "Menunggu",
            "zone": zona_dummy[idx_zona], 
            "detail_rute": detail_rute,
            "garis_aspal": garis_aspal # 🌟 KIRIM GEOMETRY KE FRONTEND
        })
        
    unassigned = db.query(models.DeliveryOrder).filter(models.DeliveryOrder.status == models.DOStatus.do_verified).all()
    return {
        "routes": hasil, 
        "dropped_nodes": [{"nama_toko": o.customer_name, "berat_kg": o.weight_total, "alasan": "Di-drop AI (Over Capacity / Time)"} for o in unassigned]
    }

@app.post("/api/routes/confirm")
def confirm_saved_routes(payload: dict, db: Session = Depends(get_db)):
    try:
        today_date = datetime.datetime.now().date()
        
        # 1. Hapus rute lama (kalau sebelumnya udah pernah save di hari yang sama)
        rute_lama = db.query(models.TMSRoutePlan).filter(models.TMSRoutePlan.planning_date == today_date).all()
        for rute in rute_lama: 
            db.query(models.TMSRouteLine).filter(models.TMSRouteLine.route_id == rute.route_id).delete()
        db.query(models.TMSRoutePlan).filter(models.TMSRoutePlan.planning_date == today_date).delete()

        # 2. Ambil data peta yang dikirim dari layar Frontend
        jadwal = payload.get("jadwal_truk_internal", [])
        
        # 3. MASUKIN KE DATABASE (Tanpa manggil AI / OR-Tools lagi)
        for truk in jadwal:
            vehicle = db.query(models.FleetVehicle).filter(models.FleetVehicle.license_plate == truk.get("armada")).first()
            if not vehicle: continue
            
            driver = db.query(models.HRDriver).filter(models.HRDriver.status == True).first()
            
            new_plan = models.TMSRoutePlan(
                route_id=truk["route_id"], planning_date=today_date, 
                vehicle_id=vehicle.vehicle_id, driver_id=driver.driver_id if driver else 1,
                total_weight=truk["total_muatan_kg"], total_distance_km=truk["total_jarak_km"]
            )
            db.add(new_plan)
            
            for stop in truk["detail_perjalanan"]:
                if stop["urutan"] == 0: continue 
                
                try:
                    h, m = map(int, str(stop["jam_tiba"]).split(":")[:2])
                    jam_est = datetime.time(hour=h, minute=m)
                except:
                    jam_est = datetime.time(hour=12, minute=0)

                new_line = models.TMSRouteLine(
                    route_id=truk["route_id"], order_id=stop["nomor_do"], 
                    sequence=stop["urutan"], est_arrival=jam_est,
                    distance_from_prev_km=stop["distance_from_prev_km"]
                )
                db.add(new_line)
                
                order = db.query(models.DeliveryOrder).filter(models.DeliveryOrder.order_id == stop["nomor_do"]).first()
                if order: order.status = models.DOStatus.do_assigned_to_route

        db.commit() # KUNCI PERMANEN KE DATABASE
        return {"message": "Rute berhasil dikunci ke Database!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))