import asyncio
import copy
import json
import logging
import time
from datetime import datetime, timedelta
from html import unescape
from typing import Any, Dict, List

import httpx
from bs4 import BeautifulSoup

from app.config.settings import get_settings
from app.models.schemas import BusOption
from app.utils.date_utils import duration_to_minutes

logger = logging.getLogger(__name__)


class FaisalMoversTool:
    _cache: dict[tuple[int, int, str, str], tuple[float, Dict[str, Any]]] = {}
    _cache_ttl_seconds = 600

    def __init__(self) -> None:
        self.settings = get_settings()

    async def search_buses(self, origin_id: int, destination_id: int, start: str, end: str) -> Dict[str, Any]:
        cache_key = (origin_id, destination_id, start, end)
        cached = self._get_cached_response(cache_key)
        if cached is not None:
            return cached

        payload = {
            "action": "scheduler_form",
            "origin": origin_id,
            "destination": destination_id,
            "start": start,
            "end": end,
        }
        url = f"{self.settings.faisal_movers_base_url}{self.settings.faisal_movers_ajax_path}"

        last_error: Exception | None = None
        for attempt in range(1, 4):
            try:
                async with httpx.AsyncClient(timeout=self.settings.faisal_movers_timeout_seconds) as client:
                    response = await client.post(
                        url,
                        data=payload,
                        headers={"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                )
                response.raise_for_status()
                data = response.json()
                if self._has_departure_results(data):
                    self._cache_response(cache_key, data)
                    return data
                await asyncio.sleep(0.35 * attempt)
            except Exception as exc:
                last_error = exc
                logger.warning("Faisal Movers attempt %s failed: %s", attempt, exc)

        cached = self._get_cached_response(cache_key)
        if cached is not None:
            return cached

        if last_error is not None:
            raise RuntimeError(f"Faisal Movers API failed after retries: {last_error}")

        return {
            "success": True,
            "data": {"data": {"departure": {"html": "", "count": 0}, "return": {"html": "", "count": 0}}},
        }

    def _get_cached_response(self, key: tuple[int, int, str, str]) -> Dict[str, Any] | None:
        cached = self._cache.get(key)
        if cached is None:
            return None

        cached_at, data = cached
        if time.monotonic() - cached_at > self._cache_ttl_seconds:
            self._cache.pop(key, None)
            return None

        return copy.deepcopy(data)

    def _cache_response(self, key: tuple[int, int, str, str], data: Dict[str, Any]) -> None:
        self._cache[key] = (time.monotonic(), copy.deepcopy(data))

    def _has_departure_results(self, raw: Dict[str, Any]) -> bool:
        normalized = self.normalize_response(raw)
        return bool(normalized["success"] and normalized["departure_count"] and normalized["departure_html"])

    def normalize_response(self, raw: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "success": raw.get("success", False),
            "departure_count": raw.get("data", {}).get("data", {}).get("departure", {}).get("count", 0),
            "return_count": raw.get("data", {}).get("data", {}).get("return", {}).get("count", 0),
            "departure_html": raw.get("data", {}).get("data", {}).get("departure", {}).get("html", ""),
        }

    def parse_results(self, raw: Dict[str, Any]) -> List[BusOption]:
        normalized = self.normalize_response(raw)
        if not normalized["success"]:
            return []

        soup = BeautifulSoup(normalized["departure_html"], "html.parser")
        links = soup.select("a.ticket-whatsapp-link")
        options: List[BusOption] = []

        for idx, link in enumerate(links):
            detail_raw = link.get("data-detail", "")
            if not detail_raw:
                continue

            try:
                detail = json.loads(unescape(detail_raw))
            except Exception:
                logger.debug("Skipping unparsable bus detail payload")
                continue

            start_time_text = link.get("data-starttime", "12:00 AM")
            start_date_iso = detail.get("start_date")
            service_name = detail.get("service_name", "Unknown Service")
            duration_text = detail.get("total_travel_time") or detail.get("travel_times") or "00:00"
            duration_minutes = duration_to_minutes(duration_text)

            try:
                departure_dt = datetime.strptime(f"{start_date_iso} {start_time_text}", "%Y-%m-%d %I:%M %p")
            except Exception:
                departure_dt = datetime.utcnow()

            arrival_dt = departure_dt + timedelta(minutes=duration_minutes)
            facilities = [item.strip() for item in (detail.get("facilities") or "").split(",") if item.strip()]

            fares = [
                ("Economy", int(detail.get("simple_fare") or 0)),
                ("Business", int(detail.get("business_class_fare") or 0)),
            ]

            for fare_class, price in fares:
                if price <= 0:
                    continue
                option_id_parts = [
                    str(detail.get("schedule_id") or idx),
                    str(detail.get("route_details_id") or detail.get("route_id") or "route"),
                    departure_dt.strftime("%Y%m%d%H%M"),
                    fare_class.lower(),
                    str(idx),
                ]
                option_id = "-".join(option_id_parts)
                options.append(
                    BusOption(
                        option_id=option_id,
                        service_name=service_name,
                        class_name=fare_class,
                        departure_city=str(detail.get("from_city_name", "")).title(),
                        arrival_city=str(detail.get("to_city_name", "")).title(),
                        departure_time=departure_dt.strftime("%I:%M %p"),
                        arrival_time=arrival_dt.strftime("%I:%M %p"),
                        departure_date=departure_dt.date(),
                        duration_minutes=duration_minutes,
                        duration_text=f"{duration_minutes // 60:02d}:{duration_minutes % 60:02d}",
                        price_pkr=price,
                        facilities=facilities,
                        raw=detail,
                    )
                )

        options.sort(key=lambda x: (x.price_pkr, x.duration_minutes))
        return options
