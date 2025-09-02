import openai
import os
from typing import Dict, Any

# Initialize OpenAI (you'll need to set OPENAI_API_KEY in your environment)
openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_article_content(content: str, analysis_type: str) -> Dict[str, Any]:
    """
    Analyze article content using AI based on the analysis type
    """
    prompts = {
        "political": "قم بتحليل النص التالي من الناحية السياسية مع تحديد النقاط الرئيسية وتقييم المشاعر (من 1 إلى 10 حيث 10 هي الأكثر إيجابية):",
        "social": "قم بتحليل النص التالي من الناحية الاجتماعية مع تحديد التأثير على المجتمع والنقاط الرئيسية:",
        "cultural": "قم بتحليل النص التالي من الناحية الثقافية والتراثية مع تحديد الأهمية التاريخية والثقافية:",
        "economic": "قم بتحليل النص التالي من الناحية الاقتصادية مع تحديد التأثيرات الاقتصادية والنقاط الرئيسية:",
        "occupation": "قم بتحليل النص التالي من ناحية تأثير الاحتلال والمعيقات مع تحديد التحديات الرئيسية:"
    }
    
    prompt = prompts.get(analysis_type, "قم بتحليل النص التالي:")
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert analyst specializing in Palestinian heritage and media analysis."},
                {"role": "user", "content": f"{prompt}\n\n{content}"}
            ],
            max_tokens=500
        )
        
        analysis_text = response.choices[0].message.content
        
        # Simple sentiment analysis (this can be enhanced)
        sentiment_score = 5  # Default neutral
        positive_words = ["إيجابي", "ممتاز", "جيد", "مبشر", "تقدم", "نجاح", "ازدهار"]
        negative_words = ["سلبي", "سيء", "مشكلة", "تحدي", "صعوبة", "تراجع", "أزمة"]
        
        for word in positive_words:
            if word in analysis_text:
                sentiment_score += 1
                
        for word in negative_words:
            if word in analysis_text:
                sentiment_score -= 1
                
        sentiment_score = max(1, min(10, sentiment_score))
        
        return {
            "summary": analysis_text,
            "key_points": extract_key_points(analysis_text),
            "sentiment_score": sentiment_score
        }
        
    except Exception as e:
        # Fallback analysis if AI service is unavailable
        return {
            "summary": f"تحليل {analysis_type}: {content[:200]}...",
            "key_points": "النقاط الرئيسية غير متاحة حاليًا",
            "sentiment_score": 5
        }

def extract_key_points(text: str) -> str:
    """
    Extract key points from analysis text (simplified version)
    """
    # This is a simplified version - in production, you'd use more sophisticated NLP
    sentences = text.split('.')
    if len(sentences) >= 3:
        return '.'.join(sentences[:3]) + "."
    return text