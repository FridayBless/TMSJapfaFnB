from sqlalchemy import Column, Integer, String, Float, DateTime, Date, Time, Boolean, ForeignKey, Enum, Numeric, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime
import enum

# ==========================================
# 0. MASTER DATA ENUMS (Logika State Machine Bos)
# ==========================================
class UserRole(enum.Enum):
    admin_sales = "admin_sales"
    admin_distribusi = "admin_distribusi"
    admin_pod = "admin_pod"
    driver = "driver"

class DOStatus(enum.Enum):
    so_waiting_verification = "SO_WAITING_VERIFICATION" # Admin Sales upload
    do_verified = "DO_VERIFIED"                         # Admin Distribusi setuju
    do_assigned_to_route = "DO_ASSIGNED_TO_ROUTE"     # Mesin VRP VIX
    delivered_success = "DELIVERED_SUCCESS"            # Driver upload foto
    delivered_partial = "DELIVERED_PARTIAL"            # Driver lapor barang kurang/retur
    billed = "BILLED"                                   # Admin POD print invoice

# ==========================================
# 1. AUTENTIKASI & HR (Relasi User <-> Driver)
# ==========================================

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(100))
    full_name = Column(String(100))
    role = Column(Enum(UserRole))
    
    # KUNCI INTEGRASI: Hubungkan akun driver system ke data HR Driver
    driver_profile = relationship("HRDriver", back_populates="user_account", uselist=False)

class HRDriver(Base):
    __tablename__ = "hr_drivers"
    __table_args__ = {'extend_existing': True}
    
    driver_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # FK ke Users Table
    name = Column(String(100))
    phone = Column(String(15))
    status = Column(Boolean, default=True) # Aktif/Libur
    
    user_account = relationship("User", back_populates="driver_profile")
    route_plans = relationship("TMSRoutePlan", back_populates="driver")

# ==========================================
# 2. MASTER DATA ARMADA
# ==========================================

class FleetVehicle(Base):
    __tablename__ = "fleet_vehicles"
    vehicle_id = Column(String, primary_key=True, index=True) 
    license_plate = Column(String, unique=True, index=True)   
    type = Column(String)                                     
    capacity_kg = Column(Float)
    
    status = Column(String, default="Available") 
    is_internal = Column(Boolean, default=True)  
    current_km = Column(Integer, default=0)      

    # 🌟 OBATNYA DI SINI: TANGAN BUAT PEGANGAN SAMA TABEL LAIN!
    from sqlalchemy.orm import relationship
    route_plans = relationship("TMSRoutePlan", back_populates="vehicle")

# ==========================================
# 3. MASTER CUSTOMERS 🌟 (YANG BENER DI SINI)
# ==========================================

class MasterCustomer(Base):
    __tablename__ = "master_customers"
    __table_args__ = {'extend_existing': True} # Obat anti-error kembar
    
    store_id = Column(Integer, primary_key=True, index=True)
    kode_cust = Column(String(50), unique=True, index=True) # 🌟 TAMBAHAN: Biar klop sama seed_data.py
    store_name = Column(String(100))
    latitude = Column(Numeric(10, 8), nullable=True) # Pakai Decimal biar presisi peta aspal
    longitude = Column(Numeric(11, 8), nullable=True)
    address = Column(Text)
    
    orders = relationship("DeliveryOrder", back_populates="customer")

# ==========================================
# 4. TRANSAKSI DELIVERY ORDER
# ==========================================

class DeliveryOrder(Base):
    __tablename__ = "delivery_orders"
    __table_args__ = {'extend_existing': True}
    
    order_id = Column(String(50), primary_key=True) # SO-XXXXX atau DO-XXXXX
    customer_name = Column(String(255))
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    weight_total = Column(Float)
    
    delivery_window_start = Column(Integer, default=360) 
    delivery_window_end = Column(Integer, default=1200)
    
    # KOLOM KUNCI LOGIKA TUAN: Cek tipe Mall/Kafe
    service_type = Column(Text, default="Regular") 
    
    # State Machine: PENDING -> DO_VERIFIED -> dst.
    status = Column(Enum(DOStatus), default=DOStatus.so_waiting_verification)
    
    # Relasi ke Route Line (Day 11 save to DB urutan toko)
    route_line = relationship("TMSRouteLine", back_populates="order", uselist=False)
    
    # Link ke Master Customer (Kalau ada store_id di SO)
    store_id = Column(Integer, ForeignKey("master_customers.store_id"), nullable=True)
    customer = relationship("MasterCustomer", back_populates="orders")

# ==========================================
# 5. HASIL ROUTING OR-TOOLS (SAVE TO DB PLAN)
# ==========================================

class TMSRoutePlan(Base):
    __tablename__ = "tms_route_plan"
    __table_args__ = {'extend_existing': True}
    
    route_id = Column(String(50), primary_key=True) # RP-YYYYMMDD-TRK1
    planning_date = Column(Date, default=datetime.date.today)
    
    vehicle_id = Column(Integer, ForeignKey("fleet_vehicles.vehicle_id"))
    driver_id = Column(Integer, ForeignKey("hr_drivers.driver_id"))
    
    # Cikupa Depot Start Time
    start_time = Column(DateTime, default=lambda: datetime.datetime.now().replace(hour=6, minute=0, second=0))
    end_time = Column(DateTime) # Update by driver later
    
    total_weight = Column(Float)
    total_distance_km = Column(Float) # From OSRM
    
    vehicle = relationship("FleetVehicle", back_populates="route_plans")
    driver = relationship("HRDriver", back_populates="route_plans")
    route_lines = relationship("TMSRouteLine", back_populates="route_plan")

class TMSRouteLine(Base):
    __tablename__ = "tms_route_line"
    __table_args__ = {'extend_existing': True}
    
    line_id = Column(Integer, primary_key=True, index=True)
    route_id = Column(String(50), ForeignKey("tms_route_plan.route_id"))
    order_id = Column(String(50), ForeignKey("delivery_orders.order_id"))
    
    # KOLOM KUNCI Day 11 VRP: Urutan Toko (1, 2, 3)
    sequence = Column(Integer) 
    
    # Jam Estimasi Satelit Day 11
    est_arrival = Column(Time) 
    
    # 🌟 LACI BARU BUAT NYIMPEN JARAK REAL (KM) DARI TOKO SEBELUMNYA
    distance_from_prev_km = Column(Float, default=0.0)
    
    route_plan = relationship("TMSRoutePlan", back_populates="route_lines")
    order = relationship("DeliveryOrder", back_populates="route_line")
    epod = relationship("TMSEpodHistory", back_populates="route_line", uselist=False)

# ==========================================
# 6. E-POD HISTORY
# ==========================================

class TMSEpodHistory(Base):
    __tablename__ = "tms_epod_history"
    __table_args__ = {'extend_existing': True}
    
    pod_id = Column(Integer, primary_key=True, index=True)
    line_id = Column(Integer, ForeignKey("tms_route_line.line_id"))
    
    # Final Status by Driver (Success/Partial)
    status = Column(Enum(DOStatus)) 
    
    timestamp = Column(DateTime, default=datetime.datetime.now)
    photo_url = Column(Text) # Backend simpen link fotonya di sini
    
    # Lokasi absen driver pas upload foto (Cek kecurangan)
    gps_location_lat = Column(Numeric(10, 8)) 
    gps_location_lon = Column(Numeric(11, 8))
    
    route_line = relationship("TMSRouteLine", back_populates="epod")

# 🌟 TABEL BARU BUAT CATATAN BENSIN (TARUH DI PALING BAWAH MODELS.PY)
class FuelLog(Base):
    __tablename__ = "fuel_logs"
    log_id = Column(Integer, primary_key=True, autoincrement=True)
    vehicle_id = Column(String, ForeignKey("fleet_vehicles.vehicle_id"))
    date_logged = Column(Date, default=datetime.datetime.utcnow)
    km_awal = Column(Integer)
    km_akhir = Column(Integer)
    liters = Column(Float)
    cost_rp = Column(Float)
    station_name = Column(String)

class CustomerMaster(Base):
    __tablename__ = "customer_master"
    
    kode_customer = Column(String, primary_key=True, index=True)
    nama_customer = Column(String, index=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)