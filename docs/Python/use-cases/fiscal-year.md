# Fiscal Year Operations

Nepal's fiscal year starts on **Shrawan 1st** (mid-July) and ends on **Asar end** (mid-July of the next year). The `NepaliDate` Python library provides built-in support for fiscal year aggregation and logic.

## Understanding Nepal's Fiscal Year

| Fiscal Year | Start Date (BS) | End Date (BS) | Approximate AD Range |
| ----------- | --------------- | ------------- | -------------------- |
| FY 2080/81  | 2080 Shrawan 1  | 2081 Asar 31  | Jul 2023 - Jul 2024  |
| FY 2081/82  | 2081 Shrawan 1  | 2082 Asar 30  | Jul 2024 - Jul 2025  |
| FY 2082/83  | 2082 Shrawan 1  | 2083 Asar 30  | Jul 2025 - Jul 2026  |

### Fiscal Quarters

| Quarter | Months          | Month Indices            |
| ------- | --------------- | ------------------------ |
| FQ1     | Shrawan - Aswin | 3-5                      |
| FQ2     | Kartik - Poush  | 6-8                      |
| FQ3     | Magh - Chaitra  | 9-11                     |
| FQ4     | Baisakh - Asar  | 0-2 (next calendar year) |

---

## Getting Current Fiscal Year

```python
from nepali_date_library import NepaliDate

# Get current fiscal year via static method
current_fy = NepaliDate.current_fiscal_year()
print(f"Current Fiscal Year: {current_fy}/{current_fy + 1}")
# Output: Current Fiscal Year: 2081/82

# The Fiscal Year does not flip until Shrawan
date = NepaliDate(2082, 3, 15) # Asar 15, 2082
# This is still in FY 2081/82 since Shrawan hasn't started
```

---

## Fiscal Year Quarters

### Get Current Quarter

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 10, 15) # Magh 15, 2082

# Get fiscal quarter (1-4) tied to a specific instance
quarter = date.fiscal_quarter()
print(f"Fiscal Quarter: Q{quarter}") # Q3 (Magh belongs to FQ3)
```

### Get Quarter Date Range

```python
from nepali_date_library import NepaliDate

# Get dates for a specific fiscal quarter statically
q1 = NepaliDate.get_fiscal_quarter(1, 2081)
print("FQ1 2081/82:")
print(f"  Start: {q1['start'].format('MMMM DD, YYYY')}") # Shrawan 01, 2081
print(f"  End: {q1['end'].format('MMMM DD, YYYY')}")   # Aswin end, 2081

q4 = NepaliDate.get_fiscal_quarter(4, 2081)
print("FQ4 2081/82:")
print(f"  Start: {q4['start'].format('MMMM DD, YYYY')}") # Baisakh 01, 2082
print(f"  End: {q4['end'].format('MMMM DD, YYYY')}")   # Asar end, 2082
```

### Get All Quarters for a Fiscal Year

```python
from nepali_date_library import NepaliDate

fy_quarters = NepaliDate.get_fiscal_quarters(2081)

print("Fiscal Year 2081/82 Quarters:")
for q in ["Q1", "Q2", "Q3", "Q4"]:
    print(f"{q}: {fy_quarters[q]['start'].format('MMM YYYY')} - {fy_quarters[q]['end'].format('MMM YYYY')}")
```

---

## Financial Reporting

### Generate Fiscal Year Report Header

```python
from nepali_date_library import NepaliDate
from typing import Dict

def get_fiscal_year_info() -> Dict:
    fy = NepaliDate.current_fiscal_year()
    quarters = NepaliDate.get_fiscal_quarters(fy)
    today = NepaliDate()
    current_quarter = today.fiscal_quarter()

    # Calculate quarter progress using instance dates
    q_dates = today.fiscal_quarter_dates()
    total_days = q_dates["start"].diff(q_dates["end"], "day") * -1
    days_elapsed = q_dates["start"].diff(today, "day") * -1
    progress = round((days_elapsed / total_days) * 100)

    return {
        "fiscal_year": f"{fy}/{str(fy + 1)[-2:]}",
        "start_date": quarters["Q1"]["start"],
        "end_date": quarters["Q4"]["end"],
        "current_quarter": current_quarter,
        "quarter_progress": f"{progress}%",
    }

info = get_fiscal_year_info()
print(f"Fiscal Year: {info['fiscal_year']}")
print(f"Current Quarter: Q{info['current_quarter']} ({info['quarter_progress']} complete)")
```

---

## Tax Period Calculations

### Check if Date is in Fiscal Year

```python
from nepali_date_library import NepaliDate

def is_in_fiscal_year(date: NepaliDate, fiscal_year: int) -> bool:
    quarters = NepaliDate.get_fiscal_quarters(fiscal_year)
    fy_start = quarters["Q1"]["start"]
    fy_end = quarters["Q4"]["end"]

    return not date.is_before(fy_start) and not date.is_after(fy_end)

date = NepaliDate(2082, 4, 15) # Shrawan 15, 2082 (1-indexed month 4 = Shrawan internally 3)
print(is_in_fiscal_year(date, 2081)) # False (FY 2081/82 ended on Asar)
print(is_in_fiscal_year(date, 2082)) # True  (This is FY 2082/83)
```

### Get Fiscal Year for Any Date

```python
from nepali_date_library import NepaliDate

def get_fiscal_year_for_date(date: NepaliDate) -> int:
    month = date.get_month() # 0-indexed
    year = date.get_year()

    # If month is Shrawan (3) or later, FY starts in current calendar year
    if month >= 3:
        return year
    else:
        return year - 1

print(get_fiscal_year_for_date(NepaliDate(2082, 10, 15))) # 2081 (Magh is FQ3 of 2081/82)
print(get_fiscal_year_for_date(NepaliDate(2082, 2, 15)))  # 2081 (Jestha is FQ4 of 2081/82)
print(get_fiscal_year_for_date(NepaliDate(2082, 5, 15)))  # 2082 (Bhadra is FQ1 of 2082/83)
```

---

## Period Selector Generator

### UI Options Context (Django/Flask Forms)

If you are rendering a dropdown form in your backend, generating these periods is highly useful.

```python
from nepali_date_library import NepaliDate
from typing import List, Dict

def get_fiscal_period_options(fiscal_year: int) -> List[Dict]:
    quarters = NepaliDate.get_fiscal_quarters(fiscal_year)

    return [
        {
            "value": "full",
            "label": f"Full Year {fiscal_year}/{fiscal_year + 1}",
            "start": quarters["Q1"]["start"],
            "end": quarters["Q4"]["end"],
        },
        {
            "value": "q1",
            "label": "Q1 (Shrawan - Aswin)",
            "start": quarters["Q1"]["start"],
            "end": quarters["Q1"]["end"],
        },
        # ... Other Quarters ...
        {
            "value": "h1",
            "label": "First Half (Q1 + Q2)",
            "start": quarters["Q1"]["start"],
            "end": quarters["Q2"]["end"],
        },
        {
            "value": "h2",
            "label": "Second Half (Q3 + Q4)",
            "start": quarters["Q3"]["start"],
            "end": quarters["Q4"]["end"],
        },
    ]

options = get_fiscal_period_options(2081)
for opt in options:
    print(f"{opt['label']}: {opt['start'].format('MMM DD')} - {opt['end'].format('MMM DD')}")
```
