from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

# 1. Konfigurasi Kunci Rahasia (JANGAN SAMPAI BOCOR KE PUBLIK)
# Kalau di production, ini harus ditaruh di file .env
SECRET_KEY = "JAPFA_TMS_SUPER_SECRET_KEY_BOSKU_123!@" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # Token valid selama 24 Jam (1 hari)

# 2. Mesin Pengacak Password (Bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """Mengecek apakah password yang diketik sama dengan yang ada di database"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Mengacak password asli menjadi teks sandi (hash)"""
    return pwd_context.hash(password)

# 3. Mesin Pencetak Token (ID Card JWT)
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Membuat ID Card (Token) yang berisi jabatan/role user"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
        
    to_encode.update({"exp": expire})
    
    # Stempel token dengan Kunci Rahasia kita
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt