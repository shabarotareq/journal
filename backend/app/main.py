from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import SessionLocal, engine, get_db
from ai_analysis import analyze_article_content
import json

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Media Platform API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Media Platform API"}

@app.get("/articles/", response_model=List[schemas.Article])
def read_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    articles = crud.get_articles(db, skip=skip, limit=limit)
    return articles

@app.get("/articles/{article_id}", response_model=schemas.Article)
def read_article(article_id: int, db: Session = Depends(get_db)):
    db_article = crud.get_article(db, article_id=article_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article

@app.post("/articles/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    # In a real app, you would get author_id from authentication
    return crud.create_article(db=db, article=article, author_id=1)

@app.get("/breaking-news/", response_model=List[schemas.Article])
def read_breaking_news(limit: int = 5, db: Session = Depends(get_db)):
    return crud.get_breaking_news(db, limit=limit)

@app.get("/categories/", response_model=List[schemas.Category])
def read_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)

@app.get("/heritage-sites/", response_model=List[schemas.HeritageSite])
def read_heritage_sites(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_heritage_sites(db, skip=skip, limit=limit)

@app.get("/heritage-sites/{site_id}", response_model=schemas.HeritageSite)
def read_heritage_site(site_id: int, db: Session = Depends(get_db)):
    db_site = crud.get_heritage_site(db, site_id=site_id)
    if db_site is None:
        raise HTTPException(status_code=404, detail="Heritage site not found")
    return db_site

@app.post("/heritage-sites/", response_model=schemas.HeritageSite)
def create_heritage_site(site: schemas.HeritageSiteCreate, db: Session = Depends(get_db)):
    return crud.create_heritage_site(db=db, site=site)

@app.get("/ai-analyses/", response_model=List[schemas.AIAnalysis])
def read_ai_analyses(analysis_type: str = None, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_ai_analyses(db, analysis_type=analysis_type, skip=skip, limit=limit)

@app.post("/analyze-article/")
def analyze_article(article_id: int, analysis_type: str, db: Session = Depends(get_db)):
    db_article = crud.get_article(db, article_id=article_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    analysis_result = analyze_article_content(db_article.content, analysis_type)
    
    ai_analysis = schemas.AIAnalysisCreate(
        article_id=article_id,
        analysis_type=analysis_type,
        summary=analysis_result["summary"],
        key_points=analysis_result["key_points"],
        sentiment_score=analysis_result["sentiment_score"]
    )
    
    return crud.create_ai_analysis(db=db, analysis=ai_analysis)

# Additional endpoints for the dashboard data
@app.get("/dashboard-stats/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # This would be more complex in a real application
    return {
        "political_decisions": 73,
        "violations_documented": 156,
        "public_rejection": 89,
        "youth_percentage": 67,
        "unemployment_rate": 34,
        "community_initiatives": 89,
        "tourism_revenue": "2.3M",
        "new_jobs": 1247,
        "ecommerce_growth": 67
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)