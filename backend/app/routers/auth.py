from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db
from ..auth import create_access_token, verify_password


router = APIRouter(prefix='/auth', tags=['auth'])


@router.post('/register', response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
existing = crud.get_user_by_username(db, user.username)
if existing:
raise HTTPException(status_code=400, detail='username taken')
return crud.create_user(db, user)


@router.post('/login')
def login(form_data: schemas.UserCreate, db: Session = Depends(get_db)):
user = crud.get_user_by_username(db, form_data.username)
if not user or not verify_password(form_data.password, user.hashed_password):
raise HTTPException(status_code=401, detail='Invalid credentials')
token = create_access_token({'sub': user.username, 'user_id': user.id})
return {'access_token': token, 'token_type': 'bearer'}