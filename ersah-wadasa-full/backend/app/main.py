import os
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from .database import engine, Base
from .routers import auth, users, articles, heritage, media, ai
from dotenv import load_dotenv

load_dotenv()

# create tables (dev convenience)
Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title='إرث وعدسة API')
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(SessionMiddleware, secret_key=os.getenv('SECRET_KEY','devsecret'))

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(articles.router)
app.include_router(heritage.router)
app.include_router(media.router)
app.include_router(ai.router)

# simple websocket chat (broadcast to connected clients)
clients = set()
@app.websocket('/ws/chat')
async def websocket_chat(ws: WebSocket):
    await ws.accept()
    clients.add(ws)
    try:
        while True:
            data = await ws.receive_text()
            # echo to others
            for c in list(clients):
                if c != ws:
                    try:
                        await c.send_text(data)
                    except:
                        clients.discard(c)
    except Exception:
        clients.discard(ws)