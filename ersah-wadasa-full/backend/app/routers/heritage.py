from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix='/heritage', tags=['heritage'])

@router.post('/', response_model=schemas.HeritageSiteOut)
def create_site(site: schemas.HeritageSiteCreate, db: Session = Depends(get_db)):
    return crud.create_heritage_site(db, site)

@router.get('/', response_model=list[schemas.HeritageSiteOut])
def list_sites(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.list_heritage(db, skip, limit)

@router.get('/{site_id}', response_model=schemas.HeritageSiteOut)
def get_site(site_id: int, db: Session = Depends(get_db)):
    s = crud.get_heritage(db, site_id)
    if not s:
        raise HTTPException(status_code=404, detail='Site not found')
    return s