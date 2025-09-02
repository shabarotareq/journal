from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os, httpx

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') or ''
router = APIRouter(prefix='/ai', tags=['ai'])

class PromptIn(BaseModel):
    prompt: str
    max_tokens: int = 300

@router.post('/chat')
async def ai_chat(payload: PromptIn):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail='AI API key not configured')
    headers = {'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json'}
    body = {'model': 'gpt-4o-mini', 'messages': [{'role': 'user', 'content': payload.prompt}], 'max_tokens': payload.max_tokens}
    async with httpx.AsyncClient() as client:
        resp = await client.post('https://api.openai.com/v1/chat/completions', json=body, headers=headers)
        resp.raise_for_status()
        return resp.json()