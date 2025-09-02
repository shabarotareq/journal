
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .db import Base, engine
from .settings import settings
from . import routers_auth, routers_sites, routers_media

# Create tables (demo; use Alembic in production)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Rebuilt Voices API", version="0.1.0")

origins = [settings.BACKEND_CORS_ORIGINS] if settings.BACKEND_CORS_ORIGINS else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static for uploads
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

app.include_router(routers_auth.router)
app.include_router(routers_sites.router)
app.include_router(routers_media.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
