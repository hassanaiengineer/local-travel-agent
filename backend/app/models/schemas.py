from datetime import date as Date
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    query: str = Field(min_length=3, max_length=600)
    stream: bool = False


class SearchRequest(BaseModel):
    query: Optional[str] = Field(default=None, max_length=600)
    origin: Optional[str] = None
    destination: Optional[str] = None
    date: Optional[Date] = None
    time_preference: Optional[Literal["morning", "afternoon", "evening", "night", "any"]] = "any"


class ParsedQuery(BaseModel):
    origin: str
    destination: str
    date: Date
    time_preference: Literal["morning", "afternoon", "evening", "night", "any"] = "any"
    budget_preference: Optional[Literal["cheapest", "fastest", "best", "any"]] = "any"


class BusOption(BaseModel):
    option_id: str
    service_name: str
    class_name: str
    departure_city: str
    arrival_city: str
    departure_time: str
    arrival_time: str
    departure_date: Date
    duration_minutes: int
    duration_text: str
    price_pkr: int
    facilities: List[str] = []
    raw: Dict[str, Any] = {}


class RecommendationResult(BaseModel):
    summary: str
    best_option_id: Optional[str] = None
    cheapest_option_id: Optional[str] = None
    fastest_option_id: Optional[str] = None


class SearchResponse(BaseModel):
    success: bool
    query: str
    parsed_query: ParsedQuery
    recommendation: RecommendationResult
    options: List[BusOption]
    metadata: Dict[str, Any] = {}


class HealthResponse(BaseModel):
    success: bool
    service: str
    environment: str
