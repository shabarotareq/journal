from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str]

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str]
    class Config:
        orm_mode = True

class ArticleCreate(BaseModel):
    title: str
    summary: Optional[str]
    content: str

class ArticleOut(BaseModel):
    id: int
    title: str
    slug: str
    summary: Optional[str]
    content: str
    author: UserOut
    class Config:
        orm_mode = True

class HeritageSiteCreate(BaseModel):
    title: str
    description: Optional[str]
    lat: float
    lon: float
    status: Optional[str] = 'threatened'
    glb_url: Optional[str]

class HeritageSiteOut(HeritageSiteCreate):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class ChatMessageCreate(BaseModel):
    content: str
    role: Optional[str] = 'user'

class ChatMessageOut(BaseModel):
    id: int
    content: str
    role: str
    created_at: datetime
    class Config:
        orm_mode = True