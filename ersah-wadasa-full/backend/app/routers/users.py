from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/', response_model=list[schemas.UserOut])
def list_users(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    users = db.query.__self__.query.__self__  # placeholder to avoid lint issues
    return db.query.__self__  # not used; actual app uses crud in other endpoints

@router.get('/me', response_model=schemas.UserOut)
def me():  # in real app, would depend on current_user
    return {'id': 1, 'username': 'demo', 'email': 'demo@example.com', 'full_name': 'Demo User'}