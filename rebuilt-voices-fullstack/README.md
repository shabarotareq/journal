
# Rebuilt Voices (أصوات مرمّمة) — Full Stack (FastAPI + PostgreSQL + React)

**Stack**
- Backend: Python 3.11, FastAPI, SQLAlchemy, JWT Auth, file uploads
- DB: PostgreSQL
- Frontend: React (Vite), HTML5/CSS3/JS
- Map: Leaflet
- AR: `<model-viewer>` (WebXR where supported) + fallback image
- Containerization: Docker Compose

## Quick Start (Docker)
```bash
# 1) create .env files
cp backend/.env.example backend/.env
# 2) run
docker compose up --build
# Backend: http://localhost:8000  (docs: /docs)
# Frontend: http://localhost:5173
```

## Local Dev (without Docker)
### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # on Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# update DB creds in .env, then:
python app/main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment
- Backend reads `.env`:
```
DATABASE_URL=postgresql+psycopg2://postgres:postgres@db:5432/rebuilt_voices
SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=60
BACKEND_CORS_ORIGINS=http://localhost:5173
UPLOAD_DIR=/app/uploads
```
If running locally without Docker, set `DATABASE_URL` to your local Postgres (e.g. `postgresql+psycopg2://postgres:postgres@localhost:5432/rebuilt_voices`).

## Features
- Auth: Register/Login with JWT
- Sites: CRUD for memory sites (title, location, description, media refs)
- Media: Upload (local disk) or external URL
- Map: browse sites on a map
- AR Viewer: display GLB/GLTF (if present) using `<model-viewer>`

## Notes on AR
- Mobile Chrome/Android may open Scene Viewer; iOS uses Quick Look.
- Provide a `.glb/.gltf` URL in each site media to enable AR button.
- For demo, a placeholder 3D model path is referenced. Replace with real models.

## Security & Production
- Replace SECRET_KEY and use strong hashing + HTTPS in production.
- Serve uploads via secure CDN or object storage (S3/MinIO) if possible.
- Add Alembic for migrations (schema is auto-created for demo).
```

