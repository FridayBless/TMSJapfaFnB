import pandas as pd
import random
import uuid
from sqlalchemy.orm import Session
from database import SessionLocal, engine
# 🌟 PENTING: MasterCustomer jangan lupa di-import!
from models import DeliveryOrder, Base, DOStatus, FleetVehicle, HRDriver, TMSRoutePlan, TMSRouteLine, TMSEpodHistory, MasterCustomer

# Bikin tabel kalau misalnya belum terbuat
Base.metadata.create_all(bind=engine)

def seed_data():
    db: Session = SessionLocal()
    
    print("Mereset tabel VRP, E-POD, DeliveryOrder, Supir, Truk, dan Master Customer...")
    db.query(TMSEpodHistory).delete()
    db.query(TMSRouteLine).delete()
    db.query(TMSRoutePlan).delete()
    db.query(DeliveryOrder).delete()
    db.query(FleetVehicle).delete()
    db.query(HRDriver).delete()
    db.query(MasterCustomer).delete() # 🌟 Reset Master Data juga
    db.commit()

    # ==========================================
    # 1. SUNTIK DATA 7 TRUK & 7 SUPIR JAPFA
    # ==========================================
    print("Mencetak 7 Armada Truk & Supir ke Database...")
    vehicle_capacities = [2000, 2000, 2000, 2000, 2700, 2700, 5000]
    
    for i, cap in enumerate(vehicle_capacities):
        new_driver = HRDriver(name=f"Supir JAPFA {i+1}", phone=f"0812345678{i}", status=True)
        db.add(new_driver)
        
        new_vehicle = FleetVehicle(
            license_plate=f"B {1000+i} JPF",
            type="CDD" if cap > 2000 else "Blind Van",
            capacity_kg=cap,
            ownership="INTERNAL"
        )
        db.add(new_vehicle)
    db.commit()

    # ==========================================
    # 2. BACA EXCEL / CSV MENTAH
    # ==========================================
    print("Membaca file data pengiriman...")
    try:
        # PENTING: Ubah ke read_csv karena data lu kmrn formatnya .csv ya Bos!
        df = pd.read_excel("data_pengiriman3.xlsx")
    except FileNotFoundError:
        print("Woy Bos! File ngga ketemu!")
        return
    
    df_sample = df.copy()
    df_sample['KODE CUST.'] = df_sample['KODE CUST.'].fillna(0).astype(str)
    df_sample['NAMA CUSTOMER'] = df_sample['NAMA CUSTOMER'].fillna('Customer Unknown')
    df_sample['QTY'] = df_sample['QTY'].fillna(0)
    
    # ==========================================
    # 3. PROSES 1.0 (DFD): ADMIN SALES BIKIN MASTER DATA
    # ==========================================
    print("Membangun Master Data Customer (Simulasi Admin Sales)...")
    grouped_master = df_sample.groupby('KODE CUST.')
    
    for kode_cust, group in grouped_master:
        first_row = group.iloc[0]
        nama_toko = first_row['NAMA CUSTOMER']
        
        lat_master = None
        lon_master = None
        
        # Anggap Admin Sales ngisi ini di Frontend
        if 'LATITUDE' in group.columns and 'LONGITUDE' in group.columns:
            if pd.notna(first_row['LATITUDE']) and pd.notna(first_row['LONGITUDE']):
                lat_master = float(first_row['LATITUDE'])
                lon_master = float(first_row['LONGITUDE'])

        new_master = MasterCustomer(
            kode_cust=kode_cust,
            store_name=nama_toko,
            latitude=lat_master,
            longitude=lon_master
        )
        db.add(new_master)
    db.commit()
    print("✅ Master Data Customer siap!\n")

    # ==========================================
    # 4. PROSES 2.0 (DFD): ADMIN DISTRIBUSI UPLOAD ORDERAN SAP
    # ==========================================
    print("Mencocokkan Orderan SAP dengan Master Data...")
    
    grouped_orders = df_sample.groupby('NAMA CUSTOMER')
    
    toko_dengan_koordinat = 0
    toko_tanpa_koordinat = 0
    list_toko_tanpa_koordinat = []

    for name, group in grouped_orders:
        total_qty = int(group['QTY'].sum())
        if total_qty == 0:
            continue
            
        first_row = group.iloc[0]
        kode_cust = str(first_row.get('KODE CUST.', '0'))
        
        # 🌟 2.2 VERIFIKASI KE MASTER DATA (Sesuai DFD Level 2!)
        master_toko = db.query(MasterCustomer).filter(MasterCustomer.kode_cust == kode_cust).first()
        
        lat_asli = -6.2300 # Lempar ke Cikupa kalau gagal
        lon_asli = 106.4900 
        punya_koordinat = False
        
        # 🌟 2.3 INJEKSI KORDINAT (Jika Ditemukan di DB Master)
        if master_toko and master_toko.latitude is not None and master_toko.longitude is not None:
            lat_asli = master_toko.latitude
            lon_asli = master_toko.longitude
            punya_koordinat = True
            toko_dengan_koordinat += 1
        else:
            toko_tanpa_koordinat += 1
            list_toko_tanpa_koordinat.append(name)
            
        # 🌟 2.4 SIMPAN ORDER VALID
        new_order = DeliveryOrder(
            order_id=f"DO-{kode_cust}-{random.randint(1000, 9999)}",
            customer_name=name,
            weight_total=total_qty,
            status=DOStatus.do_verified,
            latitude=lat_asli, 
            longitude=lon_asli
        )
        db.add(new_order)

    db.commit()

    # ==========================================
    # 🌟 CETAK LAPORAN REKONSILIASI KE LAYAR!
    # ==========================================
    print(f"✅ BERHASIL MEMBACA {toko_dengan_koordinat + toko_tanpa_koordinat} TOKO UNIK DARI SAP!")
    print(f"📍 Ditemukan di Master DB (Siap Rute): {toko_dengan_koordinat}")
    print(f"⚠️ Gagal Cocok / Blank di Master DB: {toko_tanpa_koordinat}")
    
    if toko_tanpa_koordinat > 0:
        print("\n📝 PEMBERITAHUAN KE ADMIN SALES (Mohon Lengkapi Koordinat Toko Ini):")
        for i, toko in enumerate(list_toko_tanpa_koordinat):
            print(f"   {i+1}. {toko}")
    print("\n")

if __name__ == "__main__":
    seed_data()