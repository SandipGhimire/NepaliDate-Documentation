# Static Methods

The `NepaliDate` class provides several static methods for validation, name lookups, calendar generation, and fiscal year operations.

## Import

```python
from nepali_date_library import NepaliDate
```

---

## Date Range Utilities

### NepaliDate.minimum()

Returns the earliest date supported by the library.

```python
@staticmethod
def minimum() -> datetime
```

**Returns:** Python `datetime` object representing the minimum supported date (April 13, 1919)

### NepaliDate.maximum()

Returns the latest date supported by the library.

```python
@staticmethod
def maximum() -> datetime
```

**Returns:** Python `datetime` object representing the maximum supported date (~2044)

---

## Validation

### NepaliDate.is_valid() {#isvalid-static}

Checks if the specified Nepali date components are valid.

```python
@staticmethod
def is_valid(year: int, month: int, day: int) -> bool
```

**Parameters:**

- `year` - Nepali year (1976-2100)
- `month` - Nepali month (1-12 or 0-11, Python uses internal 0-indexed bounds checking unless transformed)
- `day` - Day of month (1-32)

**Returns:** `True` if the date is valid

**Example:**

```python
# Valid dates (assuming internally 0-11 for month)
print(NepaliDate.is_valid(2082, 9, 15)) # True
```

---

## Name Utilities

### NepaliDate.get_month_name()

Returns the name of a Nepali month.

```python
@staticmethod
def get_month_name(month: int, short: bool = False, nepali: bool = False) -> str
```

**Parameters:**

- `month` - Month index (0-11)
- `short` - Return short form (default: `False`)
- `nepali` - Return Nepali name (default: `False`)

**Returns:** Month name string

**Example:**

```python
# English names
print(NepaliDate.get_month_name(0)) # 'Baisakh'
print(NepaliDate.get_month_name(0, True)) # 'Bai'

# Nepali names
print(NepaliDate.get_month_name(0, False, True)) # 'बैशाख'
print(NepaliDate.get_month_name(0, True, True)) # 'बै'
```

---

### NepaliDate.get_day_name()

Returns the name of a day of the week.

```python
@staticmethod
def get_day_name(day: int, short: bool = False, nepali: bool = False) -> str
```

**Parameters:**

- `day` - Day of week index
- `short` - Return short form (default: `False`)
- `nepali` - Return Nepali name (default: `False`)

**Returns:** Day name string

---

## Calendar Generation

### NepaliDate.get_calendar_days()

Generates calendar data for a given month, including trailing days from adjacent months. Perfect for building datepicker or calendar UI components.

```python
@staticmethod
def get_calendar_days(year: int, month: int) -> dict
```

**Parameters:**

- `year` - Nepali year
- `month` - Nepali month (0-11)

**Returns:** Dictionary containing:

- `prev_remaining_days` - Number of days from previous month to show
- `prev_month` - Previous month info with day array
- `current_month` - Current month info with day array
- `next_month` - Next month info with day array
- `remaining_days` - Number of days from next month to show

---

## Quarter Methods

### NepaliDate.get_quarter()

Returns the start and end dates for a specific quarter.

```python
@staticmethod
def get_quarter(quarter: int, year: int) -> dict
```

**Parameters:**

- `quarter` - Quarter number (1-4)
- `year` - Nepali year

**Returns:** Dictionary with `start` and `end` NepaliDate instances

### NepaliDate.get_quarters()

Returns all quarters for a year.

```python
@staticmethod
def get_quarters(year: int) -> dict
```

**Returns:** Dictionary mapping "Q1", "Q2", "Q3", "Q4" to their respective dates.

---

## Fiscal Year Methods

::: info Nepal's Fiscal Year
Nepal's fiscal year starts on **Shrawan 1st** (mid-July). Fiscal Year 2081/82 runs from Shrawan 1, 2081 to Asar end, 2082.
:::

### NepaliDate.current_fiscal_year()

Returns the current fiscal year.

```python
@staticmethod
def current_fiscal_year() -> int
```

### NepaliDate.get_fiscal_quarter()

Returns the start and end dates for a specific fiscal year quarter.

```python
@staticmethod
def get_fiscal_quarter(quarter: int, fiscal_year: int = None) -> dict
```

**Parameters:**

- `quarter` - Fiscal quarter number (1-4)
- `fiscal_year` - Fiscal year (optional, defaults to current fiscal year)

### NepaliDate.get_fiscal_quarters()

Returns all quarters for a fiscal year.

```python
@staticmethod
def get_fiscal_quarters(fiscal_year: int = None) -> dict
```

**Returns:** Dictionary with all four fiscal quarters mapping "Q1" through "Q4".
