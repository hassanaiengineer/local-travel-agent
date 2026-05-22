from typing import Any, TypedDict


class TravelGraphState(TypedDict, total=False):
    query: str
    parsed_query: dict[str, Any]
    city_ids: dict[str, int]
    raw_results: dict[str, Any]
    options: list[dict[str, Any]]
    recommendation: dict[str, Any]
    error: str
