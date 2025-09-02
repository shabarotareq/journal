from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, database
from ..routes.auth import oauth2_scheme

router = APIRouter()

@router.get("/", response_model=List[schemas.NewsItem])
async def read_news(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    news_items = db.query(models.NewsItem).offset(skip).limit(limit).all()
    return news_items

@router.get("/{category}", response_model=List[schemas.NewsItem])
async def read_news_by_category(category: str, skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    news_items = db.query(models.NewsItem).filter(models.NewsItem.category == category).offset(skip).limit(limit).all()
    return news_items

@router.post("/", response_model=schemas.NewsItem)
async def create_news_item(news_item: schemas.NewsItemCreate, db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)):
    # In a real app, you would decode the token to get the user
    db_news_item = models.NewsItem(**news_item.dict(), author_id=1)  # Hardcoded for demo
    db.add(db_news_item)
    db.commit()
    db.refresh(db_news_item)
    return db_news_item