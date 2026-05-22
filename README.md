# AI Travel Assistant MVP (Pakistan Bus Search)

Production-ready MVP that feels like ChatGPT for Pakistan bus travel search.

- Backend: FastAPI + Gemini 2.5 Flash + Faisal Movers live AJAX integration
- Frontend: Next.js 15 + TypeScript + Tailwind
- Deployment: Railway/Render (backend), Vercel (frontend)

## Architecture

```
backend/
  app/
    main.py
    routes/
    services/
    agents/
    tools/
    models/
    utils/
    config/
frontend/
  app/
  components/
  lib/
  hooks/
```

## Features

- Natural language search parsing with Gemini 2.5 Flash
- City-to-ID mapping for Faisal Movers endpoint
- Live bus schedule fetch from `admin-ajax.php`
- Normalized, frontend-ready bus options
- AI recommendation: best + cheapest + fastest
- Streaming chat responses (SSE)
- Mobile-first modern UI with suggestion chips and result cards

## Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check:

```bash
curl http://localhost:8000/api/health
```

Chat search:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"query":"I need cheapest bus from Lahore to Multan tomorrow morning"}'
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open: `http://localhost:3000`

## Key API Endpoints

- `GET /api/health`
- `POST /api/search`
- `POST /api/chat` (set `stream: true` for SSE)

## Deployment

### Backend (Railway)

1. Create Railway project and point to repo root.
2. Use `backend/Dockerfile`.
3. Add backend env vars from `.env.example`.
4. Deploy and copy backend URL.

### Frontend (Vercel)

1. Import repo and set root directory to `frontend`.
2. Add `NEXT_PUBLIC_API_BASE_URL=<your-backend-url>`.
3. Deploy.

## Notes

- MVP intentionally excludes payment, seat selection, auth, and DB.
- Parser is designed around discovered Faisal Movers HTML with `data-detail` payloads.
- Extend `backend/app/models/city_map.py` to add more cities/aliases.
