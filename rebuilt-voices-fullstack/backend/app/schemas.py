
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

# Auth
class UserCreate(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Media
class MediaBase(BaseModel):
    type: str
    title: Optional[str] = None
    url: Optional[str] = None
    file_path: Optional[str] = None

class MediaCreate(MediaBase):
    pass

class MediaOut(MediaBase):
    id: int
    class Config:
        from_attributes = True

# Site
class SiteBase(BaseModel):
    title: str
    description: Optional[str] = None
    latitude: float
    longitude: float

class SiteCreate(SiteBase):
    media: List[MediaCreate] = []

class SiteOut(SiteBase):
    id: int
    owner_id: Optional[int] = None
    media: List[MediaOut] = []
    class Config:
        from_attributes = True
