# Getting Started

## Installation

Install the library using pip:

```bash
pip install nepali-date-library
```

## Importing

You can import the classes, conversion functions, and constants directly from the library:

```python
from nepali_date_library import (
    # Main class
    NepaliDate,

    # Conversion functions
    ADtoBS, 
    BStoAD,

    # Month constants
    month_en,
    month_np,
    month_short_en,
    month_short_np,

    # Week constants
    week_en,
    week_np,
    week_short_en,
    week_short_np,

    # Date Map
    nepali_date_map
)
```

## Quick Start

### Creating a NepaliDate

There are multiple ways to create a `NepaliDate` instance:

```python
from datetime import datetime
from nepali_date_library import NepaliDate

# Current date and time
today = NepaliDate()

# From Python datetime object
from_date = NepaliDate(datetime.now())

# From year, month (1-indexed for initialization), day
# Note: This is a key difference from JavaScript. The month argument is 1-12 here.
specific = NepaliDate(2082, 10, 15) # Magh 15, 2082

# From date string (YYYY-MM-DD format)
# Supports '-', '/' and '.' as separators
from_string = NepaliDate("2082-10-01")

# From timestamp
# Note: Epoch in ms as returned by standard ms timestamps.
from_timestamp = NepaliDate(int(datetime.now().timestamp() * 1000))

# Clone another NepaliDate
clone = NepaliDate(today)
```

::: warning Month Initialization is 1-indexed in Python
When creating a date by explicitly passing year, month, and day to `NepaliDate(year, month, day)`, the passed `month` is **1-indexed** (1 = Baisakh, 12 = Chaitra) in Python to match standard user input intuitively. However, internal tracking and getters/setters (`get_month()`, `set_month()`) remain **0-indexed**.
:::

### Date Conversion

```python
from nepali_date_library import ADtoBS, BStoAD

# Convert AD (Gregorian) to BS (Nepali)
bs_date = ADtoBS("2026-01-14")
print(bs_date) # '2082-10-01'

# Convert BS (Nepali) to AD (Gregorian)
ad_date = BStoAD("2082-10-01")
print(ad_date) # '2026-01-14'

# Using NepaliDate class
nepali_date = NepaliDate()
english_date = nepali_date.get_english_date() # Returns Python datetime object
```

### Formatting Dates

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 10, 15)

# English format tokens (uppercase)
print(date.format("YYYY-MM-DD")) # 2082-10-15
print(date.format("MMMM DD, YYYY")) # Magh 15, 2082
print(date.format("MMM D, YYYY")) # Mag 15, 2082
print(date.format("DDDD")) # Wednesday

# Nepali format tokens (lowercase)
print(date.format("yyyy-mm-dd")) # २०८२-१०-१५
print(date.format("mmmm dd, yyyy")) # माघ १५, २०८२
print(date.format("dddd")) # बुधबार
```

### Date Manipulation

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 10, 15)

# Add days, months, or years (returns a new instance)
tomorrow = date.add_days(1)
next_month = date.add_months(1)
next_year = date.add_years(1)

# Go backwards with negative values
yesterday = date.add_days(-1)
last_month = date.add_months(-1)
```

### Date Comparison

```python
from nepali_date_library import NepaliDate

date1 = NepaliDate(2082, 6, 10)
date2 = NepaliDate(2082, 6, 20)

# Comparison methods
print(date1.is_before(date2)) # True
print(date1.is_after(date2)) # False
print(date1.is_equal(date2)) # False

# Check if it's the same year/month/day
print(date1.is_same(date2, "year")) # True
print(date1.is_same(date2, "month")) # True
print(date1.is_same(date2, "day")) # False

# Calculate difference
print(date1.diff(date2, "day")) # -10
print(date1.diff(date2, "month")) # 0
```

## Quick Reference

### Most Used Methods

| Method | Description | Example |
| --- | --- | --- |
| `get_year()` | Get Nepali year | `date.get_year()` → `2082` |
| `get_month()` | Get Nepali month (0-11) | `date.get_month()` → `9` |
| `get_date()` | Get Nepali day | `date.get_date()` → `15` |
| `format(str)` | Format date as string | `date.format('YYYY-MM-DD')` |
| `add_days(n)` | Add n days | `date.add_days(7)` |
| `add_months(n)` | Add n months | `date.add_months(1)` |
| `add_years(n)` | Add n years | `date.add_years(1)` |
| `is_before(date)` | Check if before another date | `date1.is_before(date2)` |
| `is_after(date)` | Check if after another date | `date1.is_after(date2)` |
| `clone()` | Create a copy | `date.clone()` |

### Conversion Functions

| Function | Description | Example |
| --- | --- | --- |
| `ADtoBS(str)` | Convert AD to BS | `ADtoBS('2026-01-14')` → `'2082-10-01'` |
| `BStoAD(str)` | Convert BS to AD | `BStoAD('2082-10-01')` → `'2026-01-14'` |
