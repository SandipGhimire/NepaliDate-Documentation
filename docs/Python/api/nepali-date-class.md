# `NepaliDate` Class

The `NepaliDate` class is the central part of the library, managing the representation and conversion of Bikram Sambat dates.

## Constructors

### `NepaliDate(year_or_date=None, month=None, day=None)`

Initializes a new `NepaliDate` object.

| Argument | Type | Description |
| --- | --- | --- |
| `year_or_date` | `datetime`, `NepaliDate`, `int`, `str`, `None` | Varies based on input type (see below). |
| `month` | `int` | Optional. Nepali month (1-12). |
| `day` | `int` | Optional. Nepali day (1-32). |

**Initialization Modes:**

- **Current Date:** `NepaliDate()`
- **From `datetime`:** `NepaliDate(datetime.now())`
- **Copy Constructor:** `NepaliDate(another_nepali_date)`
- **From String:** `NepaliDate("2080-01-15")` (Supports `-`, `/`, `.`)
- **From Components:** `NepaliDate(2080, 1, 15)` (Month is 1-indexed here)
- **From Timestamp:** `NepaliDate(1736848800000)` (Unix timestamp in milliseconds)

## Attributes

| Attribute | Type | Description |
| --- | --- | --- |
| `year` | `int` | The Nepali year (BS). |
| `month` | `int` | The Nepali month (0-indexed internally, 0=Baisakh). |
| `day` | `int` | The Nepali day of the month. |
| `timestamp` | `datetime` | The equivalent Gregorian (AD) `datetime` object. |

## Methods

### `format(format_str: str) -> str`
Formats the date using a template string.

**English Tokens:**
- `YYYY`: 4-digit year (e.g., 2080)
- `MM`: 2-digit month (01-12)
- `DD`: 2-digit day (01-32)
- `MMMM`: Full month name (e.g., Baisakh)

**Nepali Tokens:**
- `yyyy`: 4-digit year in Nepali numerals (e.g., २०८०)
- `mmmm`: Full month name in Nepali (e.g., वैशाख)

### `get_english_date() -> datetime`
Returns the corresponding Gregorian `datetime` object.

### `set(year: int, month: int, day: int)`
Updates the instance to the specified Nepali date.
> [!IMPORTANT]
> In the `set()` method, **month is 0-indexed** (0=Baisakh).

### `set_english_date(date: datetime)`
Updates the instance based on a Gregorian `datetime` object.

### `__str__()`
Returns the date string in `YYYY/MM/DD` format (where month is 1-indexed).
