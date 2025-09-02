from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from .routes import auth, news, heritage, ai_assistant

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="أصداء - منصة إعلامية تراثية", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(news.router, prefix="/api/news", tags=["news"])
app.include_router(heritage.router, prefix="/api/heritage", tags=["heritage"])
app.include_router(ai_assistant.router, prefix="/api/ai", tags=["ai"])

@app.get("/")
async def root():
    return {"message": "مرحباً بكم في منصة أصداء الإعلامية التراثية"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "asadah-backend"}