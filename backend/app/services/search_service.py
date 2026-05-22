import logging
from datetime import date, timedelta
from typing import Any, Dict

from app.models.schemas import ParsedQuery, SearchResponse
from app.services.city_service import CityService
from app.services.gemini_service import GeminiService
from app.tools.faisal_movers_tool import FaisalMoversTool
from app.utils.date_utils import to_faisal_movers_date

logger = logging.getLogger(__name__)


class SearchService:
    def __init__(self) -> None:
        self.gemini = GeminiService()
        self.city_service = CityService()
        self.fm_tool = FaisalMoversTool()

    async def run_search(self, query: str) -> SearchResponse:
        parsed = await self.gemini.extract_query(query=query, today=date.today())
        return await self.run_search_from_parsed(query=query, parsed=parsed)

    async def run_search_from_parsed(self, query: str, parsed: ParsedQuery) -> SearchResponse:
        origin_name, origin_id = self.city_service.resolve_city(parsed.origin)
        destination_name, destination_id = self.city_service.resolve_city(parsed.destination)

        if origin_id is None or destination_id is None:
            supported = ", ".join(self.city_service.supported_cities())
            raise ValueError(
                f"Unsupported city or missing route in query. origin='{parsed.origin}' destination='{parsed.destination}'. "
                f"Supported: {supported}"
            )

        parsed.origin = origin_name
        parsed.destination = destination_name

        start = to_faisal_movers_date(parsed.date)
        end = to_faisal_movers_date(parsed.date + timedelta(days=1))

        raw = await self.fm_tool.search_buses(
            origin_id=origin_id,
            destination_id=destination_id,
            start=start,
            end=end,
        )
        options = self.fm_tool.parse_results(raw)

        if parsed.time_preference != "any":
            options = [o for o in options if self._matches_time_preference(o.departure_time, parsed.time_preference)]

        options_data = [option.model_dump(mode="json") for option in options]
        recommendation_options = self._recommendation_sample(options_data)
        recommendation = await self.gemini.generate_recommendation(
            user_query=query,
            parsed_query=parsed,
            options=recommendation_options,
        )

        return SearchResponse(
            success=True,
            query=query,
            parsed_query=parsed,
            recommendation=recommendation,
            options=options,
            metadata={
                "total_options": len(options),
                "source": "faisal_movers",
            },
        )

    @staticmethod
    def _recommendation_sample(options_data: list[dict[str, Any]]) -> list[dict[str, Any]]:
        def compact(item: dict[str, Any]) -> dict[str, Any]:
            return {
                "option_id": item["option_id"],
                "service_name": item["service_name"],
                "class_name": item["class_name"],
                "departure_time": item["departure_time"],
                "arrival_time": item["arrival_time"],
                "duration_minutes": item["duration_minutes"],
                "price_pkr": item["price_pkr"],
            }

        cheapest = sorted(options_data, key=lambda item: (item["price_pkr"], item["duration_minutes"]))[:6]
        fastest = sorted(options_data, key=lambda item: (item["duration_minutes"], item["price_pkr"]))[:6]
        earliest = sorted(options_data, key=lambda item: item["departure_time"])[:6]

        sampled: list[dict[str, Any]] = []
        seen: set[str] = set()
        for item in cheapest + fastest + earliest:
            if item["option_id"] in seen:
                continue
            seen.add(item["option_id"])
            sampled.append(compact(item))

        return sampled[:18]

    @staticmethod
    def _matches_time_preference(departure_time: str, pref: str) -> bool:
        hour = int(departure_time.split(":")[0])
        is_pm = "PM" in departure_time
        hour_24 = hour % 12 + (12 if is_pm else 0)

        ranges: Dict[str, Any] = {
            "morning": range(5, 12),
            "afternoon": range(12, 17),
            "evening": range(17, 21),
            "night": list(range(21, 24)) + list(range(0, 5)),
        }

        if pref == "night":
            return hour_24 in ranges["night"]
        return hour_24 in ranges.get(pref, range(0, 24))
