from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.routes.api import router as api_router
from app.utils.logger import setup_logging
from app.utils.middleware import rate_limit_middleware, request_logging_middleware, security_headers_middleware

setup_logging()
settings = get_settings()

app = FastAPI(title=settings.app_name, debug=settings.app_debug)

app.middleware("http")(security_headers_middleware)
app.middleware("http")(request_logging_middleware)
app.middleware("http")(rate_limit_middleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_origin_regex=settings.allowed_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
