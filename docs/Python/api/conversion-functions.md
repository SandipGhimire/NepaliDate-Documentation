# Conversion Functions

The library provides two utility functions for converting between Anno Domini (AD/Gregorian) and Bikram Sambat (BS/Nepali) dates.

## Import

```python
from nepali_date_library import ADtoBS, BStoAD
```

---

## ADtoBS() {#adtobs}

Converts an Anno Domini (AD) date to a Bikram Sambat (BS) date.

### Signature

```python
def ADtoBS(adDate: str) -> str:
```

### Parameters

| Parameter | Type | Description |
| --------- | -------- | ------------------------------ |
| `adDate`  | `str`    | AD date in `YYYY-MM-DD` format |

### Returns

`str` - BS date in `YYYY-MM-DD` format

### Example

```python
from nepali_date_library import ADtoBS

# Convert Gregorian date to Nepali date
bs_date = ADtoBS("2026-01-14")
print(bs_date) # '2082-10-01'

# More examples
print(ADtoBS("2024-04-13")) # '2080-12-31' (Last day of 2080)
print(ADtoBS("2024-04-14")) # '2081-01-01' (Nepali New Year 2081)
print(ADtoBS("2025-04-14")) # '2082-01-01' (Nepali New Year 2082)
```

### Error Handling

The function raises an error in the following cases:

```python
# Invalid format
try:
    ADtoBS("2026/01/14") # Wrong separator
except ValueError as e:
    print(e) # Invalid date format. Expected format: YYYY-MM-DD

# Invalid date
try:
    ADtoBS("2026-13-01") # Invalid month
except ValueError as e:
    print(e) # Invalid date provided

# Out of range
try:
    ADtoBS("1940-01-01") # Before supported range
except ValueError as e:
    print(e) # Failed to convert AD to BS
```

---

## BStoAD() {#bstoad}

Converts a Bikram Sambat (BS) date to an Anno Domini (AD) date.

### Signature

```python
def BStoAD(bsDate: str) -> str:
```

### Parameters

| Parameter | Type | Description |
| --------- | -------- | ------------------------------ |
| `bsDate`  | `str`    | BS date in `YYYY-MM-DD` format |

### Returns

`str` - AD date in `YYYY-MM-DD` format

### Example

```python
from nepali_date_library import BStoAD

# Convert Nepali date to Gregorian date
ad_date = BStoAD("2082-10-01")
print(ad_date) # '2026-01-14'

# More examples
print(BStoAD("2081-01-01")) # '2024-04-14' (Nepali New Year 2081)
print(BStoAD("2082-01-01")) # '2025-04-14' (Nepali New Year 2082)
print(BStoAD("2080-12-31")) # '2024-04-13'
```

### Error Handling

```python
# Invalid format
try:
    BStoAD("2082/10/01") # Wrong separator
except ValueError as e:
    print(e) # Invalid date format. Expected format: YYYY-MM-DD

# Out of range
try:
    BStoAD("1975-01-01") # Before BS 1976
except ValueError as e:
    print(e) # Invalid date provided or out of range
```

---

## Supported Date Range

Both conversion functions work within the following range:

| Calendar               | Start      | End        |
| ---------------------- | ---------- | ---------- |
| **Bikram Sambat (BS)** | 1976-01-01 | 2100-12-30 |
| **Anno Domini (AD)**   | 1919-04-13 | ~2044-04   |

Dates outside this range may raise a `ValueError`.

---

## Using with NepaliDate Class

You can also perform conversions using the `NepaliDate` class:

```python
from datetime import datetime
from nepali_date_library import NepaliDate

# AD to BS using constructor
ad_datetime = datetime(2026, 1, 14)
nepali_date = NepaliDate(ad_datetime)
print(nepali_date.format("YYYY-MM-DD")) # 2082-10-01

# BS to AD using get_english_date()
bs_date = NepaliDate("2082-10-01")
ad_datetime = bs_date.get_english_date()
print(ad_datetime.strftime("%Y-%m-%d")) # 2026-01-14
```

---

## Common Patterns

### Batch Conversion

```python
from nepali_date_library import ADtoBS

ad_dates = ["2026-01-14", "2026-02-15", "2026-03-16"]
bs_dates = [ADtoBS(date) for date in ad_dates]
print(bs_dates)
# ['2082-10-01', '2082-11-03', '2082-12-03']
```

### Safe Conversion with Error Handling

```python
from nepali_date_library import ADtoBS

def safe_ad_to_bs(ad_date: str) -> str:
    try:
        return ADtoBS(ad_date)
    except ValueError:
        return None

print(safe_ad_to_bs("2026-01-14")) # '2082-10-01'
print(safe_ad_to_bs("invalid"))    # None
```
