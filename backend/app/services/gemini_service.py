import json
import logging
from datetime import date
from typing import Any, Dict, List

import httpx

from app.config.settings import get_settings
from app.models.schemas import ParsedQuery, RecommendationResult

logger = logging.getLogger(__name__)


class GeminiService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.base_url = "https://generativelanguage.googleapis.com/v1beta"

    async def _generate_content(
        self,
        prompt: str,
        *,
        json_mode: bool = False,
        temperature: float = 0.2,
    ) -> str:
        if not self.settings.gemini_api_key:
            raise RuntimeError("GEMINI_API_KEY is not configured")

        url = f"{self.base_url}/models/{self.settings.gemini_model}:generateContent"
        params = {"key": self.settings.gemini_api_key}

        payload: Dict[str, Any] = {
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": temperature,
            },
        }
        if json_mode:
            payload["generationConfig"]["responseMimeType"] = "application/json"

        async with httpx.AsyncClient(timeout=self.settings.gemini_timeout_seconds) as client:
            response = await client.post(url, params=params, json=payload)
            response.raise_for_status()

        data = response.json()
        candidates = data.get("candidates", [])
        if not candidates:
            raise RuntimeError("Gemini returned no candidates")

        content = candidates[0].get("content", {})
        parts: List[Dict[str, Any]] = content.get("parts", [])
        text = "\n".join(part.get("text", "") for part in parts if isinstance(part, dict)).strip()
        if not text:
            raise RuntimeError("Gemini returned empty text")
        return text

    @staticmethod
    def _parse_json_safely(text: str) -> Dict[str, Any]:
        text = text.strip()
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            start = text.find("{")
            end = text.rfind("}")
            if start == -1 or end == -1:
                raise
            return json.loads(text[start : end + 1])

    @staticmethod
    def _clean_text_field(value: Any) -> str:
        if value is None:
            return ""
        return str(value).strip().lower()

    async def extract_query(self, query: str, today: date) -> ParsedQuery:
        prompt = f"""
You are a travel query extraction system for Pakistan bus booking.

Today is {today.isoformat()}.
Extract fields from the user query and return strict JSON only.
Allowed values:
- time_preference: morning | afternoon | evening | night | any
- budget_preference: cheapest | fastest | best | any

Rules:
- origin and destination must be lowercase city names without punctuation
- date must be ISO format YYYY-MM-DD
- infer relative dates like tomorrow based on today's date
- if no time preference, set "any"
- if no budget preference, set "any"

User query:
{query}

Return JSON exactly with keys:
origin, destination, date, time_preference, budget_preference
""".strip()

        text = await self._generate_content(prompt, json_mode=True, temperature=0.0)
        parsed = self._parse_json_safely(text)

        return ParsedQuery(
            origin=self._clean_text_field(parsed.get("origin")),
            destination=self._clean_text_field(parsed.get("destination")),
            date=parsed.get("date") or today,
            time_preference=parsed.get("time_preference") or "any",
            budget_preference=parsed.get("budget_preference") or "any",
        )

    async def generate_recommendation(
        self,
        user_query: str,
        parsed_query: ParsedQuery,
        options: List[Dict[str, Any]],
    ) -> RecommendationResult:
        prompt = f"""
You are an AI bus travel assistant for Pakistan.
Given user intent and bus options, choose:
1) best overall option
2) cheapest option
3) fastest option

Return strict JSON with keys:
summary, best_option_id, cheapest_option_id, fastest_option_id

User query: {user_query}
Parsed query: {parsed_query.model_dump_json()}
Representative options: {json.dumps(options, ensure_ascii=False)}

Summary must be short, helpful, and mention concrete price/time.
Do not say "all options" unless every representative option has the same price and duration.
""".strip()

        try:
            text = await self._generate_content(prompt, json_mode=True, temperature=0.2)
            parsed = self._parse_json_safely(text)
            return RecommendationResult(
                summary=parsed.get("summary") or "Found bus options for your route.",
                best_option_id=parsed.get("best_option_id"),
                cheapest_option_id=parsed.get("cheapest_option_id"),
                fastest_option_id=parsed.get("fastest_option_id"),
            )
        except Exception as exc:
            logger.warning("Gemini recommendation fallback used: %s", exc)
            if not options:
                return RecommendationResult(summary="No bus options were found for this route/date.")

            cheapest = min(options, key=lambda x: x.get("price_pkr", 10**9))
            fastest = min(options, key=lambda x: x.get("duration_minutes", 10**9))
            best = cheapest
            return RecommendationResult(
                summary=(
                    f"Found {len(options)} buses. Cheapest is PKR {cheapest.get('price_pkr')} "
                    f"departing at {cheapest.get('departure_time')}."
                ),
                best_option_id=best.get("option_id"),
                cheapest_option_id=cheapest.get("option_id"),
                fastest_option_id=fastest.get("option_id"),
            )
