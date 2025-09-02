from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ArticleBase(BaseModel):
    title: str
    content: str
    summary: Optional[str] = None
    image_url: Optional[str] = None
    category_id: int
    is_breaking: bool = False
    is_verified: bool = False

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    author_id: int
    views_count: int
    likes_count: int
    shares_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class HeritageSiteBase(BaseModel):
    name: str
    description: str
    location: str
    historical_period: str
    image_url: Optional[str] = None
    vr_tour_url: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    importance_level: int = 1

class HeritageSiteCreate(HeritageSiteBase):
    pass

class HeritageSite(HeritageSiteBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class AIAnalysisBase(BaseModel):
    article_id: int
    analysis_type: str
    summary: str
    key_points: str
    sentiment_score: int

class AIAnalysisCreate(AIAnalysisBase):
    pass

class AIAnalysis(AIAnalysisBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True