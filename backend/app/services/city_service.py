from app.models.city_map import CITY_IDS, get_city_id, normalize_city_name


class CityService:
    def resolve_city(self, name: str) -> tuple[str, int | None]:
        normalized = normalize_city_name(name)
        return normalized, get_city_id(normalized)

    def supported_cities(self) -> list[str]:
        return sorted(CITY_IDS.keys())
