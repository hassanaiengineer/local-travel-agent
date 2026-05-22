import logging
import re


class SecretFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.msg = re.sub(r"key=([^&\s]+)", "key=[redacted]", str(record.msg))
        if record.args:
            record.args = tuple(re.sub(r"key=([^&\s]+)", "key=[redacted]", str(arg)) for arg in record.args)
        return True


def setup_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )
    root = logging.getLogger()
    root.addFilter(SecretFilter())
    logging.getLogger("httpx").setLevel(logging.WARNING)
