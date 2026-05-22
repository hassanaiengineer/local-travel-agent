from datetime import date, timedelta
import re


MONTH_FORMAT = "%d %b %Y"


def to_faisal_movers_date(value: date) -> str:
    return value.strftime(MONTH_FORMAT)


def duration_to_minutes(duration: str) -> int:
    if not duration:
        return 0

    value = duration.strip().lower()

    # Supports "05:00:00", "05:00", and mixed text like "05:00 hours".
    match = re.search(r"(\d{1,2}):(\d{2})(?::\d{2})?", value)
    if match:
        return int(match.group(1)) * 60 + int(match.group(2))

    # Supports phrases like "5 hours" or "40 minutes".
    hours = re.search(r"(\d+)\s*hour", value)
    minutes = re.search(r"(\d+)\s*min", value)
    if hours or minutes:
        return int(hours.group(1)) * 60 + int(minutes.group(1)) if hours and minutes else (
            int(hours.group(1)) * 60 if hours else int(minutes.group(1))
        )

    return 0


def fallback_date_from_preference(base: date, hint: str | None) -> date:
    if not hint:
        return base
    lowered = hint.lower()
    if "tomorrow" in lowered:
        return base + timedelta(days=1)
    if "day after" in lowered:
        return base + timedelta(days=2)
    return base
