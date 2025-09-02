from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, database

router = APIRouter()

@router.get("/projects", response_model=List[schemas.HeritageProject])
async def read_heritage_projects(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    projects = db.query(models.HeritageProject).offset(skip).limit(limit).all()
    return projects

@router.get("/projects/{location}", response_model=List[schemas.HeritageProject])
async def read_heritage_projects_by_location(location: str, skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    projects = db.query(models.HeritageProject).filter(models.HeritageProject.location == location).offset(skip).limit(limit).all()
    return projects

@router.post("/projects", response_model=schemas.HeritageProject)
async def create_heritage_project(project: schemas.HeritageProjectCreate, db: Session = Depends(database.get_db)):
    db_project = models.HeritageProject(**project.dict(), creator_id=1)  # Hardcoded for demo
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project