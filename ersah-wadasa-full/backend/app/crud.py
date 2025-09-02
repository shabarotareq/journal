from sqlalchemy.orm import Session
from . import models, schemas
from .auth import get_password_hash
from slugify import slugify

def create_user(db: Session, user: schemas.UserCreate):
    hashed = get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed, full_name=user.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id==user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username==username).first()

def create_article(db: Session, article: schemas.ArticleCreate, author_id: int):
    slug = slugify(article.title)[:250]
    db_article = models.Article(title=article.title, slug=slug, summary=article.summary, content=article.content, author_id=author_id)
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def get_article(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.id==article_id).first()

def list_articles(db: Session, skip: int=0, limit: int=20):
    return db.query(models.Article).offset(skip).limit(limit).all()

def create_heritage_site(db: Session, site: schemas.HeritageSiteCreate):
    db_site = models.HeritageSite(**site.dict())
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site

def list_heritage(db: Session, skip: int=0, limit: int=100):
    return db.query(models.HeritageSite).offset(skip).limit(limit).all()

def get_heritage(db: Session, site_id: int):
    return db.query(models.HeritageSite).filter(models.HeritageSite.id==site_id).first()

def create_media(db: Session, filename: str, url: str, type_: str):
    m = models.Media(filename=filename, url=url, type=type_)
    db.add(m)
    db.commit()
    db.refresh(m)
    return m

def list_media(db: Session, skip: int=0, limit: int=100):
    return db.query(models.Media).offset(skip).limit(limit).all()