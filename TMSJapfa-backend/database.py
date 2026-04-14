from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Pastikan URL ini sesuai sama settingan PostgreSQL di pgAdmin lu kemaren ya!
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:captainzhyper@localhost:5433/tms_japfa_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# KUNCI UTAMANYA DI SINI: Base itu diciptakan di file ini!
Base = declarative_base()