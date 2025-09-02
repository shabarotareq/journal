from sqlalchemy.orm import Session
from sqlalchemy import desc, func
import models
import schemas

def get_articles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Article).order_by(desc(models.Article.created_at)).offset(skip).limit(limit).all()

def get_article(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.id == article_id).first()

def create_article(db: Session, article: schemas.ArticleCreate, author_id: int):
    db_article = models.Article(**article.dict(), author_id=author_id)
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def get_breaking_news(db: Session, limit: int = 5):
    return db.query(models.Article).filter(models.Article.is_breaking == True).order_by(desc(models.Article.created_at)).limit(limit).all()

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_heritage_sites(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.HeritageSite).order_by(desc(models.HeritageSite.importance_level)).offset(skip).limit(limit).all()

def get_heritage_site(db: Session, site_id: int):
    return db.query(models.HeritageSite).filter(models.HeritageSite.id == site_id).first()

def create_heritage_site(db: Session, site: schemas.HeritageSiteCreate):
    db_site = models.HeritageSite(**site.dict())
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site

def get_ai_analyses(db: Session, analysis_type: str = None, skip: int = 0, limit: int = 10):
    query = db.query(models.AIAnalysis)
    if analysis_type:
        query = query.filter(models.AIAnalysis.analysis_type == analysis_type)
    return query.order_by(desc(models.AIAnalysis.created_at)).offset(skip).limit(limit).all()

def create_ai_analysis(db: Session, analysis: schemas.AIAnalysisCreate):
    db_analysis = models.AIAnalysis(**analysis.dict())
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis