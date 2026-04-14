from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
import models, auth
from database import SessionLocal

# Ini trik sakti FastAPI biar muncul ikon "Gembok" (Authorize) di Swagger UI!
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. SATAPAM PENGECEK KEASLIAN TOKEN
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="ID Card (Token) tidak valid atau sudah kedaluwarsa Bos!",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Buka isi tokennya pakai stempel rahasia kita
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Pastikan orangnya masih ada di database (bukan akun karyawan yang udah dipecat/dihapus)
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

# 2. SATPAM PENGECEK JABATAN (RBAC)
def require_role(required_role: str):
    def role_checker(current_user: models.User = Depends(get_current_user)):
        # Cocokin jabatan di database sama jabatan yang dibutuhin ruangan API-nya
        if current_user.role.value != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Akses Ditolak! Ruangan ini khusus {required_role}. Jabatan kamu: {current_user.role.value}"
            )
        return current_user
    return role_checker