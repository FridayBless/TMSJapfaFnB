import pandas as pd
import requests
import urllib.parse
import time

# --- KONFIGURASI ---
API_KEY = 'xUy50YsjmbRexLalxX3ThDpmC1lOzElP'
INPUT_FILE = 'Cust_Jabodetabek.csv'
OUTPUT_FILE = 'Jabodetabek2.csv'

print("Membaca dan merapikan data Excel...")
df = pd.read_csv(INPUT_FILE)

# Buang baris yang kolom ALAMAT-nya kosong
df = df.dropna(subset=['ALAMAT'])
df = df[df['ALAMAT'].astype(str).str.strip() != '']

def tambah_koma(teks):
    teks = str(teks).strip()
    if teks and teks.lower() != 'nan':
        return ', ' + teks
    return ''

# Menggabungkan alamat
df['ALAMAT_LENGKAP'] = df['ALAMAT'].astype(str).str.strip() + \
                       df['KECAMATAN/RT/RW'].apply(tambah_koma) + \
                       df['KOTA/KAB'].apply(tambah_koma)

# KUNCI PERBAIKAN: Bersihkan karakter garis miring atau tanda plus yang merusak URL TomTom
df['ALAMAT_LENGKAP'] = df['ALAMAT_LENGKAP'].str.replace('/', ' ', regex=False).str.replace('+', ' ', regex=False)

latitudes = []
longitudes = []
alamat_list = df['ALAMAT_LENGKAP'].tolist()
total_data = len(alamat_list)

print(f"Total data valid siap diproses: {total_data} alamat.")
print("Memulai proses penarikan koordinat satu per satu (Metode Aman)...")
print("-" * 50)

for i, address in enumerate(alamat_list):
    # Encode alamat agar aman dikirim ke server
    safe_address = urllib.parse.quote(address)
    
    # Menggunakan Single Geocoding API yang sudah terbukti berhasil
    url = f"https://api.tomtom.com/search/2/geocode/{safe_address}.json?key={API_KEY}"
    
    try:
        response = requests.get(url)
        
        # Jika sukses dan TomTom menemukan hasilnya
        if response.status_code == 200:
            data = response.json()
            if data.get('results'):
                # Ambil hasil teratas
                pos = data['results'][0]['position']
                latitudes.append(pos['lat'])
                longitudes.append(pos['lon'])
            else:
                latitudes.append(None)
                longitudes.append(None)
        else:
            latitudes.append(None)
            longitudes.append(None)
            
    except Exception as e:
        latitudes.append(None)
        longitudes.append(None)
        
    # Tampilkan progres di terminal setiap 50 data agar Bos bisa pantau
    if (i + 1) % 50 == 0 or (i + 1) == total_data:
        print(f"Progres: {i + 1} / {total_data} alamat berhasil di-scan.")
        
    # WAJIB JEDA 0.2 detik (Maksimal 5 request per detik untuk akun gratis)
    time.sleep(0.2)

# Simpan hasilnya ke kolom baru
df['Latitude'] = latitudes
df['Longitude'] = longitudes

# Hapus kolom bantuan agar Excel tetap rapi
df = df.drop(columns=['ALAMAT_LENGKAP'])

# Simpan ke CSV
df.to_csv(OUTPUT_FILE, index=False)
print("-" * 50)
print(f"SELESAI, BOS! File berhasil disimpan dengan nama: {OUTPUT_FILE}")