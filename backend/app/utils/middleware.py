import logging
import time
from collections import defaultdict, deque
from typing import Awaitable, Callable

from fastapi import Request, Response
from starlette.responses import JSONResponse

from app.config.settings import get_settings

logger = logging.getLogger(__name__)

RequestHandler = Callable[[Request], Awaitable[Response]]

_requests: dict[str, deque[float]] = defaultdict(deque)


async def request_logging_middleware(request: Request, call_next: RequestHandler) -> Response:
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info("%s %s -> %s %.1fms", request.method, request.url.path, response.status_code, duration_ms)
    return response


async def rate_limit_middleware(request: Request, call_next: RequestHandler) -> Response:
    if request.url.path == "/api/health":
        return await call_next(request)

    settings = get_settings()
    client_ip = request.client.host if request.client else "unknown"
    now = time.monotonic()
    window = _requests[client_ip]

    while window and now - window[0] > 60:
        window.popleft()

    if len(window) >= settings.rate_limit_per_minute:
        return JSONResponse(
            status_code=429,
            content={"detail": "Rate limit exceeded. Please wait a moment and try again."},
        )

    window.append(now)
    return await call_next(request)


async def security_headers_middleware(request: Request, call_next: RequestHandler) -> Response:
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    return response
