from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, database

router = APIRouter()

# This is a simple mock AI response function
# In a real application, you would integrate with an AI service like OpenAI
def generate_ai_response(message: str) -> str:
    ai_responses = {
        "كيف أكتب تقريراً عن التراث الفلسطيني": "ابدأ بالسياق التاريخي، ثم اربط بالواقع الحالي، واستخدم شهادات شخصية من السكان المحليين...",
        "ما هي أهم المواقع في نابلس": "البلدة القديمة، جبل جرزيم، مسجد النصر، السوق القديم، وقصر عبد الهادي من أهم المواقع التراثية في نابلس.",
        "كيف أستخدم تقنية AR": "لبدء تجربة الواقع المعزز، توجه إلى قسم الخريطة التفاعلية واضغط على زر 'ابدأ تجربة AR' ثم وجه الكاميرا نحو الموقع."
    }
    
    return ai_responses.get(message, "أهلاً بك! أنا مساعدك الذكي للصحافة والتراث. كيف يمكنني مساعدتك اليوم؟")

@router.post("/chat", response_model=schemas.AIChat)
async def chat_with_ai(chat: schemas.AIChatCreate, db: Session = Depends(database.get_db)):
    response = generate_ai_response(chat.message)
    
    db_chat = models.AIChat(
        message=chat.message,
        response=response,
        user_id=1  # Hardcoded for demo
    )
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat

@router.get("/chat/history", response_model=List[schemas.AIChat])
async def get_chat_history(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    chats = db.query(models.AIChat).offset(skip).limit(limit).all()
    return chats