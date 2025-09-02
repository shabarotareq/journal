from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    email: str
    username: str
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        orm_mode = True

class NewsItemBase(BaseModel):
    title: str
    content: str
    category: str
    region: str

class NewsItemCreate(NewsItemBase):
    pass

class NewsItem(NewsItemBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: datetime
    image_url: Optional[str] = None
    
    class Config:
        orm_mode = True

class HeritageProjectBase(BaseModel):
    title: str
    description: str
    location: str

class HeritageProjectCreate(HeritageProjectBase):
    pass

class HeritageProject(HeritageProjectBase):
    id: int
    creator_id: int
    created_at: datetime
    image_url: Optional[str] = None
    vr_enabled: bool
    ar_enabled: bool
    
    class Config:
        orm_mode = True

class AIChatBase(BaseModel):
    message: str

class AIChatCreate(AIChatBase):
    pass

class AIChat(AIChatBase):
    id: int
    user_id: int
    response: str
    created_at: datetime
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None