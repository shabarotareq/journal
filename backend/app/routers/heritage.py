from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud


router = APIRouter(prefix='/heritage', tags=['heritage'])


@router.post('/', response_model=schemas.HeritageSiteOut)
def create_site(site: schemas.Heritag