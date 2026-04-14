import pandas as pd
from database import SessionLocal
from models import FleetVehicle, HRDriver

def seed_armada():
    db = SessionLocal()
    
    print("Membaca file data_armada.csv...")
    try:
        # Kita lewatin 2 baris atas yang kosong/format aneh
        df = pd.read_excel('data_armada.xlsx', skiprows=2)
    except Exception as e:
        print(f"Gagal baca file CSV. Pastikan namanya 'data_armada.xlsx' dan ada di folder backend. Error: {e}")
        return

    # Bersihin data truk dan supir lama (kalau ada) biar fresh!
    print("Menghapus data truk/supir lama dari database...")
    db.query(FleetVehicle).delete()
    db.query(HRDriver).delete()
    db.commit()

    print("Menyuntikkan Armada & Supir JAPFA 2026...")
    
    # Kita masukin satu-satu sesuai baris di Excel lu
    for index, row in df.iterrows():
        nopol = str(row.get('Nopol', '')).strip()
        tipe = str(row.get('Type', '')).strip()
        kapasitas = float(row.get('Kapasitas', 0))
        nama_supir = str(row.get('Supir', '')).strip()
        
        if not nopol or nopol == 'nan':
            continue

        # 1. Bikin Data Supirnya
        new_driver = HRDriver(
            name=nama_supir,
            status=True
        )
        db.add(new_driver)

        # 2. Bikin Data Truknya
        new_truck = FleetVehicle(
            vehicle_id=f"V-{nopol.replace(' ', '')}",
            license_plate=nopol,
            type=tipe,
            capacity_kg=kapasitas,
            status="Available",
            is_internal=True,
            current_km=10000 
        )
        db.add(new_truck)
        
        print(f"✅ Masuk: Truk {nopol} (Kapasitas: {kapasitas} KG) <---> Supir: {nama_supir}")

    db.commit()
    db.close()
    print("🚀 PROSES SUNTIK SELESAI! SILAKAN GAS ROUTING DI WEB!")

if __name__ == "__main__":
    seed_armada()