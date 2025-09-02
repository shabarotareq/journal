from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db
import os

router = APIRouter(prefix='/media', tags=['media'])

@router.post('/upload')
async def upload_media(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # very simple save to local 'uploads' folder (dev only)
    uploads_dir = os.path.join(os.getcwd(), 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)
    path = os.path.join(uploads_dir, file.filename)
    with open(path, 'wb') as f:
        content = await file.read()
        f.write(content)
    m = crud.create_media(db, file.filename, f'/uploads/{file.filename}', file.content_type)
    return {'id': m.id, 'url': m.url}

@router.get('/', response_model=list[schemas.ChatMessageOut])
def list_media(db: Session = Depends(get_db)):
    # placeholder, reuse chat schema for simple response preview
    return []