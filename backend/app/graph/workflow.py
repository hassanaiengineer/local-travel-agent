from app.graph.nodes import parse_query_node, recommend_options_node, resolve_cities_node, search_buses_node


def build_travel_workflow() -> dict[str, object]:
    return {
        "nodes": {
            "parse_query": parse_query_node,
            "resolve_cities": resolve_cities_node,
            "search_buses": search_buses_node,
            "recommend_options": recommend_options_node,
        },
        "edges": [
            ("parse_query", "resolve_cities"),
            ("resolve_cities", "search_buses"),
            ("search_buses", "recommend_options"),
        ],
    }
