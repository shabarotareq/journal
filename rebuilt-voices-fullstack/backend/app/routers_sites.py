
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .db import get_db
from . import models, schemas
from .security import get_current_user

router = APIRouter(prefix="/sites", tags=["sites"])

@router.post("/", response_model=schemas.SiteOut)
def create_site(site_in: schemas.SiteCreate, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    site = models.Site(
        title=site_in.title,
        description=site_in.description,
        latitude=site_in.latitude,
        longitude=site_in.longitude,
        owner_id=user.id
    )
    db.add(site)
    db.flush()
    for m in site_in.media:
        media = models.Media(site_id=site.id, type=m.type, title=m.title, url=m.url, file_path=m.file_path)
        db.add(media)
    db.commit()
    db.refresh(site)
    return site

@router.get("/", response_model=List[schemas.SiteOut])
def list_sites(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(models.Site).offset(skip).limit(limit).all()

@router.get("/{site_id}", response_model=schemas.SiteOut)
def get_site(site_id: int, db: Session = Depends(get_db)):
    site = db.query(models.Site).filter(models.Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site

@router.delete("/{site_id}")
def delete_site(site_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    site = db.query(models.Site).filter(models.Site.id == site_id, models.Site.owner_id == user.id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found or not owned by user")
    db.delete(site)
    db.commit()
    return {"ok": True}
