from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix='/articles', tags=['articles'])

@router.post('/', response_model=schemas.ArticleOut)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    # For demo, assume author_id = 1
    return crud.create_article(db, article, author_id=1)

@router.get('/', response_model=list[schemas.ArticleOut])
def list_articles(skip: int=0, limit: int=20, db: Session = Depends(get_db)):
    return crud.list_articles(db, skip, limit)

@router.get('/{article_id}', response_model=schemas.ArticleOut)
def get_article(article_id: int, db: Session = Depends(get_db)):
    a = crud.get_article(db, article_id)
    if not a:
        raise HTTPException(status_code=404, detail='Article not found')
    return a