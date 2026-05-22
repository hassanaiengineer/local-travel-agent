from app.services.search_service import SearchService


class TravelAgent:
    def __init__(self) -> None:
        self.search_service = SearchService()

    async def handle_query(self, query: str):
        return await self.search_service.run_search(query)
