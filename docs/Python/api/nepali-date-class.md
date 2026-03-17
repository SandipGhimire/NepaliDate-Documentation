# NepaliDate Class

The `NepaliDate` class is the core of the library, providing a complete API for creating, manipulating, and formatting Nepali (Bikram Sambat) dates.

## Import

```python
from nepali_date_library import NepaliDate
```

---

## Constructors

The `NepaliDate` class supports multiple variable argument constructor modes:

### Default Constructor

Creates a `NepaliDate` for the current date and time.

```python
NepaliDate()
```

**Example:**

```python
today = NepaliDate()
print(str(today)) # '2082/10/01'
```

### From Python Datetime

Creates a `NepaliDate` from a Python `datetime` object.

```python
from datetime import datetime
NepaliDate(date: datetime)
```

**Example:**

```python
py_date = datetime(2026, 1, 14)
nepali_date = NepaliDate(py_date)
print(str(nepali_date)) # '2082/10/01'
```

### From NepaliDate

Creates a copy of another `NepaliDate` instance.

```python
NepaliDate(date: NepaliDate)
```

**Example:**

```python
original = NepaliDate()
copy = NepaliDate(original)
```

### From Timestamp

Creates a `NepaliDate` from a Unix timestamp in milliseconds.

```python
NepaliDate(timestamp: int)
```

**Example:**

```python
import time
nepali_date = NepaliDate(int(time.time() * 1000))
```

### From Date String

Creates a `NepaliDate` from a formatted date string.

```python
NepaliDate(dateString: str)
```

**Supported formats:**

- `YYYY-MM-DD` (e.g., `'2082-10-01'`)
- `YYYY/MM/DD` (e.g., `'2082/10/01'`)
- `YYYY.MM.DD` (e.g., `'2082.10.01'`)

**Example:**

```python
date = NepaliDate("2082-10-15")
print(date.get_year())  # 2082
print(date.get_month()) # 9 (0-indexed internally)
print(date.get_date())  # 15
```

### From Components

Creates a `NepaliDate` with specific year, month, and day values.

```python
NepaliDate(year: int, month: int, day: int)
```

**Parameters:**

- `year` - Nepali year (e.g., 2082)
- `month` - Nepali month (1-12, where 1 = Baisakh)
- `day` - Day of month (1-32)

::: warning Month Initialization is 1-indexed in Python
In the Python constructor, the `month` parameter is **1-indexed**: 1 = Baisakh, 2 = Jestha, ..., 12 = Chaitra. This differs from the internal representation and getter/setter methods, which are 0-indexed.
:::

**Example:**

```python
# Magh 15, 2082 (month 10 = Magh)
date = NepaliDate(2082, 10, 15)
print(date.format("MMMM DD, YYYY")) # 'Magh 15, 2082'
```

---

## Getter Methods

### get_year()

Returns the Nepali year.

```python
get_year() -> int
```

**Returns:** Nepali year (e.g., 2082)

**Example:**

```python
date = NepaliDate(2082, 10, 15)
print(date.get_year()) # 2082
```

---

### get_month()

Returns the internal Nepali month (0-indexed).

```python
get_month() -> int
```

**Returns:** Nepali month (0-11, where 0 = Baisakh, 11 = Chaitra)

**Example:**

```python
date = NepaliDate(2082, 10, 15)
print(date.get_month()) # 9 (Magh)
```

---

### get_date()

Returns the day of the month.

```python
get_date() -> int
```

**Returns:** Day of month (1-32)

---

### get_day()

Returns the day of the week.

```python
get_day() -> int
```

**Returns:** Day of week (0-6, where 0 = Monday, 6 = Sunday) *(Note: standard Python `.weekday()` convention is used internally).*

---

### get_english_date()

Returns the equivalent Gregorian (AD) date as a Python `datetime` object (UTC timezone).

```python
get_english_date() -> datetime
```

**Returns:** Python `datetime` object

**Example:**

```python
nepali_date = NepaliDate(2082, 10, 1)
english_date = nepali_date.get_english_date()
print(english_date.strftime("%Y-%m-%d")) # '2026-01-14'
```

---

## Setter Methods

### set_year()

Sets the Nepali year.

```python
set_year(year: int) -> None
```

**Parameters:**

- `year` - Nepali year to set

---

### set_month()

Sets the Nepali month.

```python
set_month(month: int) -> None
```

**Parameters:**

- `month` - Nepali month (0-11)

---

### set_date()

Sets the day of month.

```python
set_date(day: int) -> None
```

**Parameters:**

- `day` - Day of month (1-32)

---

### set()

Sets year, month, and day at once in-place.

```python
set(year: int, month: int, day: int) -> None
```

**Parameters:**

- `year` - Nepali year
- `month` - Nepali month (0-11)
- `day` - Day of month (1-32)

---

## Formatting Methods

### format()

Formats the date according to a format string.

```python
format(formatStr: str) -> str
```

**Parameters:**

- `formatStr` - Format pattern string

**Returns:** Formatted date string

#### English Format Tokens (Uppercase)

| Token  | Description                | Example        |
| ------ | -------------------------- | -------------- |
| `YYYY` | Full year                  | 2082           |
| `YY`   | 2-digit year               | 82             |
| `MM`   | Month with leading zero    | 01-12          |
| `M`    | Month without leading zero | 1-12           |
| `MMM`  | Short month name           | Bai, Jes, Mag  |
| `MMMM` | Full month name            | Baisakh, Magh  |
| `DD`   | Day with leading zero      | 01-32          |
| `D`    | Day without leading zero   | 1-32           |
| `DDD`  | Short day name             | Sun, Mon       |
| `DDDD` | Full day name              | Sunday, Monday |

#### Nepali Format Tokens (Lowercase)

| Token  | Description                | Example        |
| ------ | -------------------------- | -------------- |
| `yyyy` | Full year in Nepali        | २०८२           |
| `yy`   | 2-digit year in Nepali     | ८२             |
| `mm`   | Month with leading zero    | ०१-१२          |
| `m`    | Month without leading zero | १-१२           |
| `mmm`  | Short month name           | बै, जे, मा     |
| `mmmm` | Full month name            | बैशाख, माघ     |
| `dd`   | Day with leading zero      | ०१-३२          |
| `d`    | Day without leading zero   | १-३२           |
| `ddd`  | Short day name             | आइत, सोम       |
| `dddd` | Full day name              | आइतबार, सोमबार |

**Examples:**

```python
date = NepaliDate(2082, 10, 15)

# English formats
print(date.format("YYYY-MM-DD")) # '2082-10-15'
print(date.format("MMMM DD, YYYY")) # 'Magh 15, 2082'

# Nepali formats
print(date.format("yyyy-mm-dd")) # '२०८२-१०-१५'
print(date.format("dddd, mmmm dd")) # 'बुधबार, माघ १५'
```

---

### parse()

Parses a date string and updates the current instance in-place.

```python
parse(dateString: str) -> None
```

**Parameters:**

- `dateString` - Date string in format YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD

---

## Date Manipulation Methods

### add_days()

Adds the specified number of days and returns a new instance.

```python
add_days(days: int) -> NepaliDate
```

**Parameters:**

- `days` - Number of days to add (can be negative)

**Returns:** New `NepaliDate` instance

---

### add_months()

Adds the specified number of months and returns a new instance.

```python
add_months(months: int) -> NepaliDate
```

**Parameters:**

- `months` - Number of months to add (can be negative)

**Returns:** New `NepaliDate` instance

---

### add_years()

Adds the specified number of years and returns a new instance.

```python
add_years(years: int) -> NepaliDate
```

**Parameters:**

- `years` - Number of years to add (can be negative)

**Returns:** New `NepaliDate` instance

---

## Date Comparison Methods

### diff()

Calculates the difference between two dates.

```python
diff(date: NepaliDate, unit: str) -> int
```

**Parameters:**

- `date` - NepaliDate to compare with
- `unit` - Unit of difference (`'year'`, `'month'`, or `'day'`)

**Returns:** Difference in the specified unit

---

### is_after()

Checks if this date comes after the specified date.

```python
is_after(date: NepaliDate) -> bool
```

---

### is_before()

Checks if this date comes before the specified date.

```python
is_before(date: NepaliDate) -> bool
```

---

### is_equal()

Checks if this date is exactly equal to the specified date (year, month, day).

```python
is_equal(date: NepaliDate) -> bool
```

---

### is_same()

Checks if this date is the same as the specified date for the given unit.

```python
is_same(date: NepaliDate, unit: str) -> bool
```

**Parameters:**

- `date` - Date to compare with
- `unit` - Unit to compare (`'year'`, `'month'`, or `'day'`)

---

## Pythonic Comparison Operators

The Python implementation natively supports Python's comparison operators thanks to `__eq__`, `__lt__`, `__gt__`.

```python
date1 = NepaliDate(2082, 10, 15)
date2 = NepaliDate(2082, 10, 16)

print(date1 == date2) # False
print(date1 < date2)  # True
print(date2 > date1)  # True
```

---

## Instance Quarter & Utility Methods

### current_quarter()

```python
current_quarter() -> int
```
Returns the quarter number (1-4) for the current date's active year.

### current_quarter_dates()

```python
current_quarter_dates() -> dict
```
Returns the start and end dates of the current quarter. E.g., `{'start': NepaliDate, 'end': NepaliDate}`.

### fiscal_quarter()

```python
fiscal_quarter() -> int
```
Returns the fiscal year quarter number (1-4) for the current date.

### fiscal_quarter_dates()

```python
fiscal_quarter_dates() -> dict
```
Returns the start and end dates of the current fiscal year quarter.

### is_valid_instance()

```python
is_valid_instance() -> bool
```
Checks if the instance contains a valid date combination.

### days_in_month()

```python
days_in_month() -> int
```
Returns the total number of days in the instance's current month.

### is_leap_year()

```python
is_leap_year() -> bool
```
Returns `True` if the instance's year spans 366 or more days.

### get_weeks_in_month()

```python
get_weeks_in_month() -> int
```
Returns the number of weeks in the instance's month.

---

## Date Range Boundary Methods

All of these methods return a **new `NepaliDate`** instance set to the specific boundary.

- `start_of_day()` -> 00:00:00
- `end_of_day()` -> 23:59:59.999
- `start_of_week(start_of_week: int = 0)` -> start of week (default index 0 is Monday)
- `end_of_week(start_of_week: int = 0)` -> end of week
- `start_of_month()` -> Day 1 of the month
- `end_of_month()` -> Last day of the month
- `start_of_year()` -> Baisakh 1 of the year
- `end_of_year()` -> Last day of Chaitra of the year
