
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
import os, uuid
from .db import get_db
from . import models, schemas
from .settings import settings
from .security import get_current_user

router = APIRouter(prefix="/media", tags=["media"])

@router.post("/upload", response_model=schemas.MediaOut)
async def upload_media(site_id: int, type: str, title: str | None = None,
                       file: UploadFile = File(...),
                       db: Session = Depends(get_db),
                       user: models.User = Depends(get_current_user)):
    site = db.query(models.Site).filter(models.Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    ext = os.path.splitext(file.filename)[1]
    fname = f"{uuid.uuid4().hex}{ext}"
    out_path = os.path.join(settings.UPLOAD_DIR, fname)
    with open(out_path, "wb") as f:
        f.write(await file.read())
    media = models.Media(site_id=site.id, type=type, title=title, file_path=f"/uploads/{fname}")
    db.add(media)
    db.commit()
    db.refresh(media)
    return media
