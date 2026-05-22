from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = Field(default="AI Travel Assistant API", alias="APP_NAME")
    app_env: str = Field(default="development", alias="APP_ENV")
    app_debug: bool = Field(default=True, alias="APP_DEBUG")
    app_host: str = Field(default="0.0.0.0", alias="APP_HOST")
    app_port: int = Field(default=8000, alias="APP_PORT")
    rate_limit_per_minute: int = Field(default=40, alias="RATE_LIMIT_PER_MINUTE")

    allowed_origins: str = Field(default="http://localhost:3000", alias="ALLOWED_ORIGINS")
    allowed_origin_regex: str = Field(
        default=r"http://(localhost|127\.0\.0\.1):\d+",
        alias="ALLOWED_ORIGIN_REGEX",
    )

    gemini_api_key: str = Field(default="", alias="GEMINI_API_KEY")
    gemini_model: str = Field(default="gemini-2.5-flash", alias="GEMINI_MODEL")
    gemini_timeout_seconds: float = Field(default=25, alias="GEMINI_TIMEOUT_SECONDS")

    faisal_movers_base_url: str = Field(default="https://faisalmovers.com", alias="FAISAL_MOVERS_BASE_URL")
    faisal_movers_ajax_path: str = Field(default="/wp-admin/admin-ajax.php", alias="FAISAL_MOVERS_AJAX_PATH")
    faisal_movers_timeout_seconds: float = Field(default=25, alias="FAISAL_MOVERS_TIMEOUT_SECONDS")

    @property
    def allowed_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
