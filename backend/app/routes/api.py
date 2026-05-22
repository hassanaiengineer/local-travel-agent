import asyncio
import json
import logging
from datetime import date
from typing import AsyncGenerator

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.agents.travel_agent import TravelAgent
from app.models.schemas import ChatRequest, HealthResponse, ParsedQuery, SearchRequest, SearchResponse
from app.services.search_service import SearchService
from app.utils.errors import user_friendly_error

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["travel"])
agent = TravelAgent()
search_service = SearchService()


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    from app.config.settings import get_settings

    settings = get_settings()
    return HealthResponse(success=True, service=settings.app_name, environment=settings.app_env)


@router.post("/search", response_model=SearchResponse)
async def search_route(payload: SearchRequest) -> SearchResponse:
    try:
        if payload.query:
            return await search_service.run_search(payload.query)

        if not payload.origin or not payload.destination:
            raise HTTPException(status_code=400, detail="Provide either query or origin+destination")

        parsed = ParsedQuery(
            origin=payload.origin.lower(),
            destination=payload.destination.lower(),
            date=payload.date or date.today(),
            time_preference=payload.time_preference or "any",
            budget_preference="any",
        )
        synthetic_query = (
            f"Buses from {parsed.origin} to {parsed.destination} on {parsed.date.isoformat()}"
            f" ({parsed.time_preference})"
        )
        return await search_service.run_search_from_parsed(query=synthetic_query, parsed=parsed)
    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=user_friendly_error(str(exc))) from exc
    except Exception as exc:
        logger.exception("Search route failed")
        raise HTTPException(status_code=500, detail=user_friendly_error(str(exc))) from exc


async def _chat_event_stream(query: str) -> AsyncGenerator[str, None]:
    try:
        yield f"event: status\ndata: {json.dumps({'message': 'Parsing your request...'})}\n\n"
        await asyncio.sleep(0.05)

        result = await agent.handle_query(query)
        summary = result.recommendation.summary

        for token in summary.split(" "):
            yield f"event: token\ndata: {json.dumps({'text': token + ' '})}\n\n"
            await asyncio.sleep(0.015)

        yield f"event: done\ndata: {result.model_dump_json()}\n\n"
    except ValueError as exc:
        message = user_friendly_error(str(exc))
        logger.info("Streaming chat needs clarification: %s", message)
        for token in message.split(" "):
            yield f"event: token\ndata: {json.dumps({'text': token + ' '})}\n\n"
            await asyncio.sleep(0.015)
        yield f"event: error\ndata: {json.dumps({'error': message})}\n\n"
    except Exception as exc:
        logger.exception("Streaming chat failed")
        yield f"event: error\ndata: {json.dumps({'error': user_friendly_error(str(exc))})}\n\n"


@router.post("/chat")
async def chat_route(payload: ChatRequest):
    if payload.stream:
        return StreamingResponse(_chat_event_stream(payload.query), media_type="text/event-stream")

    try:
        response = await agent.handle_query(payload.query)
        return response
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=user_friendly_error(str(exc))) from exc
    except Exception as exc:
        logger.exception("Chat route failed")
        raise HTTPException(status_code=500, detail=user_friendly_error(str(exc))) from exc
