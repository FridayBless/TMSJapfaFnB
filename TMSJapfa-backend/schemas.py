from pydantic import BaseModel
from models import UserRole

# Formulir untuk Login
class UserLogin(BaseModel):
    username: str
    password: str

# Formulir untuk Bikin Karyawan Baru (Register)
class UserCreate(BaseModel):
    username: str
    password: str
    full_name: str
    role: UserRole

# Format Balasan kalau Login Sukses (Ngirim ID Card / Token)
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str

from datetime import time
from typing import Optional

# (Kodingan skema UserLogin dll yang lama biarin aja di atas)

# ==========================================
# 📦 FORMULIR UNTUK DELIVERY ORDER (PESANAN)
# ==========================================

# Formulir Input Order dari Frontend
class OrderCreate(BaseModel):
    order_id: str
    customer_name: str
    latitude: float
    longitude: float
    weight_total: float
    service_type: str = "regular"
    delivery_window_start: Optional[time] = None
    delivery_window_end: Optional[time] = None
    store_id: Optional[int] = None

# Format Balasan Data Order dari Database
class OrderResponse(OrderCreate):
    status: str
    driver_id: Optional[int] = None
    pod_image_url: Optional[str] = None

    class Config:
        from_attributes = True # Wajib ada biar Pydantic bisa baca data dari SQLAlchemy