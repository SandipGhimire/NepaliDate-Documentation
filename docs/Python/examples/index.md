# Examples

This section provides practical code examples for common tasks with the Nepali Date Library in Python.

## Quick Navigation

| Category                      | Description                    |
| ----------------------------- | ------------------------------ |
| [Basic Usage](#basic-usage)   | Creating dates, getting values |
| [Formatting](#formatting)     | English and Nepali formatting  |
| [Conversion](#conversion)     | AD ↔ BS conversion             |
| [Manipulation](#manipulation) | Adding/subtracting time        |
| [Comparison](#comparison)     | Comparing dates                |
| [Quarters](#quarters)         | Working with quarters          |
| [Fiscal Year](#fiscal-year)   | Fiscal year operations         |
| [Calendar](#calendar)         | Building calendars             |

---

## Basic Usage {#basic-usage}

### Create Dates

```python
from nepali_date_library import NepaliDate
from datetime import datetime

# Current date
today = NepaliDate()

# From year, month (0-indexed), day
date1 = NepaliDate(2082, 9, 15) # Magh 15, 2082

# From string
date2 = NepaliDate("2082-10-15")

# From Python datetime
date3 = NepaliDate(datetime.strptime("2026-01-14", "%Y-%m-%d"))

# Clone
date4 = today.clone()
```

### Get Date Components

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

print(date.get_year())  # 2082
print(date.get_month()) # 9 (Magh)
print(date.get_date())  # 15
print(date.get_day())   # 3 (Wednesday)
print(str(date))        # '2082/10/15'
```

---

## Formatting {#formatting}

### English Format

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

print(date.format("YYYY-MM-DD"))          # '2082-10-15'
print(date.format("YYYY/MM/DD"))          # '2082/10/15'
print(date.format("MMM D, YYYY"))         # 'Mag 15, 2082'
print(date.format("MMMM DD, YYYY"))       # 'Magh 15, 2082'
print(date.format("DDDD"))                # 'Wednesday'
print(date.format("DDDD, MMMM DD"))       # 'Wednesday, Magh 15'
```

### Nepali Format

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

print(date.format("yyyy-mm-dd"))          # '२०८२-१०-१५'
print(date.format("mmmm dd, yyyy"))       # 'माघ १५, २०८२'
print(date.format("dddd"))                # 'बुधबार'
print(date.format("dddd, mmmm dd"))       # 'बुधबार, माघ १५'
```

### Mixed Format

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

# English date, Nepali day name
print(date.format("MMMM DD, YYYY (dddd)"))
# 'Magh 15, 2082 (बुधबार)'

# Nepali date, English day name
print(date.format("mmmm dd, yyyy (DDDD)"))
# 'माघ १५, २०८२ (Wednesday)'
```

---

## Conversion {#conversion}

### AD to BS

```python
from nepali_date_library import ADtoBS

print(ADtoBS("2026-01-14")) # '2082-10-01'
print(ADtoBS("2024-04-13")) # '2081-01-01' (New Year)
print(ADtoBS("2025-12-25")) # '2082-09-10'
```

### BS to AD

```python
from nepali_date_library import BStoAD

print(BStoAD("2082-10-01")) # '2026-01-14'
print(BStoAD("2082-01-01")) # '2025-04-14' (New Year)
print(BStoAD("2081-12-30")) # '2025-04-13'
```

### Using NepaliDate Class

```python
from nepali_date_library import NepaliDate
from datetime import datetime

# AD to BS
ad_date = datetime.strptime("2026-01-14", "%Y-%m-%d")
bs_date = NepaliDate(ad_date)
print(bs_date.format("YYYY-MM-DD")) # '2082-10-01'

# BS to AD
nepali_date = NepaliDate("2082-10-01")
english_date = nepali_date.get_english_date()
print(english_date.strftime("%Y-%m-%d")) # '2026-01-14'
```

---

## Manipulation {#manipulation}

### Add Days

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

tomorrow = date.add_days(1)
print(tomorrow.format("YYYY-MM-DD")) # '2082-10-16'

next_week = date.add_days(7)
print(next_week.format("YYYY-MM-DD")) # '2082-10-22'

yesterday = date.add_days(-1)
print(yesterday.format("YYYY-MM-DD")) # '2082-10-14'
```

### Add Months

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

next_month = date.add_months(1)
print(next_month.format("MMMM YYYY")) # 'Falgun 2082'

three_months_ago = date.add_months(-3)
print(three_months_ago.format("MMMM YYYY")) # 'Kartik 2082'
```

### Add Years

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

next_year = date.add_years(1)
print(next_year.format("YYYY")) # '2083'

five_years_ago = date.add_years(-5)
print(five_years_ago.format("YYYY")) # '2077'
```

---

## Comparison {#comparison}

### Compare Dates

```python
from nepali_date_library import NepaliDate

date1 = NepaliDate(2082, 9, 10)
date2 = NepaliDate(2082, 9, 20)

print(date1.is_before(date2)) # True
print(date1.is_after(date2))  # False
print(date1.is_equal(date2))  # False

date3 = NepaliDate(2082, 9, 10)
print(date1.is_equal(date3))  # True
```

### Compare by Unit

```python
from nepali_date_library import NepaliDate

date1 = NepaliDate(2082, 9, 10)
date2 = NepaliDate(2082, 9, 20)

print(date1.is_same(date2, "year"))  # True
print(date1.is_same(date2, "month")) # True
print(date1.is_same(date2, "day"))   # False
```

### Calculate Difference

```python
from nepali_date_library import NepaliDate

date1 = NepaliDate(2082, 0, 1)   # Baisakh 1
date2 = NepaliDate(2082, 11, 30) # Chaitra 30

print(date1.diff(date2, "day"))   # ~365 days
print(date1.diff(date2, "month")) # 11
print(date1.diff(date2, "year"))  # 0
```

---

## Quarters {#quarters}

### Get Current Quarter

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)
quarter = date.current_quarter()
print(f"Quarter: Q{quarter}") # Q4 (Magh is in Q4)
```

### Get Quarter Dates

```python
from nepali_date_library import NepaliDate

q1 = NepaliDate.get_quarter(1, 2082)
print(f"Q1 Start: {q1['start'].format('MMMM DD')}") # Baisakh 01
print(f"Q1 End: {q1['end'].format('MMMM DD')}")     # Asar 30/31
```

### Get All Quarters

```python
from nepali_date_library import NepaliDate

quarters = NepaliDate.get_quarters(2082)

for key, value in quarters.items():
    print(f"{key}: {value['start'].format('MMM')} - {value['end'].format('MMM YYYY')}")

# Q1: Bai - Asa 2082
# Q2: Shr - Asw 2082
# ...
```

---

## Fiscal Year {#fiscal-year}

### Current Fiscal Year

```python
from nepali_date_library import NepaliDate

fy = NepaliDate.current_fiscal_year()
print(f"Fiscal Year: {fy}/{fy + 1}") # 2081/82
```

### Fiscal Quarter

```python
from nepali_date_library import NepaliDate

date = NepaliDate()
fq = date.fiscal_quarter()
print(f"Fiscal Quarter: FQ{fq}")
```

### Fiscal Year Quarters

```python
from nepali_date_library import NepaliDate

fy_quarters = NepaliDate.get_fiscal_quarters(2081)

print("FY 2081/82:")
print(f"  FQ1: {fy_quarters['Q1']['start'].format('MMM YYYY')} - {fy_quarters['Q1']['end'].format('MMM YYYY')}")
print(f"  FQ2: {fy_quarters['Q2']['start'].format('MMM YYYY')} - {fy_quarters['Q2']['end'].format('MMM YYYY')}")
print(f"  FQ3: {fy_quarters['Q3']['start'].format('MMM YYYY')} - {fy_quarters['Q3']['end'].format('MMM YYYY')}")
print(f"  FQ4: {fy_quarters['Q4']['start'].format('MMM YYYY')} - {fy_quarters['Q4']['end'].format('MMM YYYY')}")
```

---

## Calendar {#calendar}

### Generate Calendar

```python
from nepali_date_library import NepaliDate

calendar = NepaliDate.get_calendar_days(2082, 9)

print("Previous month days:", calendar["prev_month"]["days"])
print("Current month days:", calendar["current_month"]["days"])
print("Next month days:", calendar["next_month"]["days"])
```

### Simple Calendar Display

```python
from nepali_date_library import NepaliDate, week_short_en

def print_calendar(year: int, month: int):
    date = NepaliDate(year, month, 1)
    calendar = NepaliDate.get_calendar_days(year, month)

    print(f"\n  {date.format('MMMM YYYY')}")
    print(" " + " ".join(week_short_en))

    all_days = (
        [f"({d})" for d in calendar["prev_month"]["days"]] +
        [str(d).rjust(3) for d in calendar["current_month"]["days"]] +
        [f"({d})" for d in calendar["next_month"]["days"]]
    )

    for i in range(0, len(all_days), 7):
        print(" ".join(all_days[i:i+7]))

print_calendar(2082, 9) # Magh 2082
```
