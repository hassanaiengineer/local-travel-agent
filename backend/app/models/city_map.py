from typing import Dict


CITY_IDS: Dict[str, int] = {
    "lahore": 1,
    "islamabad": 2,
    "multan": 3,
    "faisalabad": 4,
    "karachi": 5,
    "rawalpindi": 6,
    "bahawalpur": 7,
    "sahiwal": 8,
    "dg khan": 9,
    "dera ghazi khan": 9,
    "rahim yar khan": 10,
    "sukkur": 11,
    "hyderabad": 12,
    "peshawar": 13,
    "gujranwala": 14,
    "sargodha": 15,
    "quetta": 16,
}

CITY_ALIASES: Dict[str, str] = {
    "isb": "islamabad",
    "rwp": "rawalpindi",
    "lhr": "lahore",
    "khi": "karachi",
    "mul": "multan",
    "fsd": "faisalabad",
    "pindi": "rawalpindi",
    "dera ghazi khan": "dg khan",
}


def normalize_city_name(name: str) -> str:
    value = " ".join(name.lower().strip().split())
    return CITY_ALIASES.get(value, value)


def get_city_id(name: str) -> int | None:
    normalized = normalize_city_name(name)
    return CITY_IDS.get(normalized)
