# Getting Started (Python)

## Installation

You can install the `nepali-date-library` using pip:

```bash
pip install nepali-date-library
```

## Basic Usage

### Import the Library

```python
from nepali_date_library import NepaliDate, ADtoBS, BStoAD
```

### Initializing `NepaliDate`

#### Current Date
```python
today = NepaliDate()
print(today) # Outputs something like: 2082/10/1
```

#### From Gregorian Date
```python
from datetime import datetime
ad_date = datetime(2026, 1, 14)
bs_date = NepaliDate(ad_date)
print(bs_date) # Outputs: 2082/10/1
```

#### From Nepali Date String
```python
# Supports -, / and . as separators
specific_date = NepaliDate("2080-01-15")
print(specific_date) # 2080/1/15
```

#### From Specific Year, Month, Day
```python
# Note: In the constructor, month is 1-indexed (1-12)
date = NepaliDate(2080, 1, 15)
print(date) # 2080/1/15
```

### Date Conversion Utilities

If you only need to convert date strings without creating a `NepaliDate` object:

```python
# AD to BS
bs = ADtoBS("2026-01-14") # '2082-10-01'

# BS to AD
ad = BStoAD("2082-10-01") # '2026-01-14'
```
