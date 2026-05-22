def user_friendly_error(message: str) -> str:
    lowered = message.lower()

    if "origin=''" in lowered and "destination=''" in lowered:
        return "Tell me your starting city and destination, for example: Lahore to Multan tomorrow morning."

    if "origin=''" in lowered:
        return "Please include your starting city too, for example: Lahore to Islamabad tomorrow morning."

    if "destination=''" in lowered:
        return "Please include where you want to go, for example: Lahore to Multan tomorrow."

    if "unsupported city" in lowered:
        return "I do not support that city yet. Try Lahore, Multan, Islamabad, Rawalpindi, Karachi, Faisalabad, or Bahawalpur."

    if "rate limit" in lowered:
        return "Too many searches at once. Please wait a moment and try again."

    return "I could not complete this search. Please try another route or date."
