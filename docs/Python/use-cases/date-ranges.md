# Date Ranges

Working with date ranges is essential for reports, filters, and period-based data aggregation in Python (e.g., Pandas, Django ORM, SQLAlchemy). The library provides methods to easily get boundaries for days, weeks, months, and years.

## Day Boundaries

### Start and End of Day

Depending on your Python backend, generating exact UTC boundaries is vital to database filtering.

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

day_start = date.start_of_day()
day_end = date.end_of_day()

# The internal Python datetime object allows access to hour/min/sec
start_dt = day_start.get_english_date()
end_dt = day_end.get_english_date()

print(f"Start: {start_dt.strftime('%H:%M:%S')}") # 00:00:00
print(f"End: {end_dt.strftime('%H:%M:%S.%f')}") # 23:59:59.999000
```

### Use Case: Filter Records for a Day

```python
from nepali_date_library import NepaliDate
from typing import List, Dict

def get_records_for_day(records: List[Dict], date: NepaliDate) -> List[Dict]:
    start = date.start_of_day().get_english_date()
    end = date.end_of_day().get_english_date()
    
    # Example local filter, but usually passed to ORM .filter(timestamp__gte=start, timestamp__lte=end)
    return [
        r for r in records 
        if start <= r['timestamp'] <= end
    ]
```

---

## Week Boundaries

### Start and End of Week

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15) # Wednesday

# Default: Week starts on Monday (0) - This is standard Python behavior.
week_start = date.start_of_week() 
print(week_start.format("DDDD, MMMM DD")) # Monday, Magh 13

week_end = date.end_of_week()
print(week_end.format("DDDD, MMMM DD")) # Sunday, Magh 19
```

### Custom Week Start (Sunday)

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15) # Wednesday

# Week starts on Sunday (6 in standard Python weekday indexing)
week_start_sun = date.start_of_week(start_of_week=6)
print(week_start_sun.format("DDDD, MMMM DD")) # Sunday, Magh 12

week_end_sun = date.end_of_week(start_of_week=6)
print(week_end_sun.format("DDDD, MMMM DD")) # Saturday, Magh 18
```

### Get Week Range

```python
from nepali_date_library import NepaliDate
from typing import Dict

def get_current_week(start_of_week: int = 0) -> Dict:
    today = NepaliDate()
    start = today.start_of_week(start_of_week)
    end = today.end_of_week(start_of_week)

    return {
        "start": start,
        "end": end,
        "label": f"{start.format('MMM DD')} - {end.format('MMM DD, YYYY')}",
    }

week = get_current_week()
print(week["label"]) # e.g. 'Mag 13 - Mag 19, 2082'
```

---

## Month Boundaries

### Start and End of Month

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15) # Magh 15

month_start = date.start_of_month()
print(month_start.format("YYYY-MM-DD")) # '2082-10-01'

month_end = date.end_of_month()
print(month_end.format("YYYY-MM-DD")) # '2082-10-29'
print(month_end.get_date()) # 29 (Magh 2082 has 29 days)
```

### Monthly Report Range

```python
from nepali_date_library import NepaliDate
from typing import Dict

def get_month_range(year: int, month: int) -> Dict:
    start = NepaliDate(year, month + 1, 1) # Constructor takes 1-indexed month
    end = start.end_of_month()

    return {
        "year": year,
        "month": month,
        "month_name": NepaliDate.get_month_name(month),
        "start": start,
        "end": end,
        "total_days": end.get_date(),
    }

range_data = get_month_range(2082, 9)
print(f"{range_data['month_name']} {range_data['year']}") # 'Magh 2082'
print(f"{range_data['start'].format('DD')} - {range_data['end'].format('DD')}") # '01 - 29'
print(f"Total days: {range_data['total_days']}") # 29
```

---

## Year Boundaries

### Start and End of Year

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

year_start = date.start_of_year()
print(year_start.format("MMMM DD, YYYY")) # 'Baisakh 01, 2082'

year_end = date.end_of_year()
print(year_end.format("MMMM DD, YYYY")) # 'Chaitra 30, 2082'
```

### Annual Report Range

```python
from nepali_date_library import NepaliDate

def get_year_range(year: int):
    start = NepaliDate(year, 1, 1) # Baisakh 1
    end = start.end_of_year() # Last day of Chaitra
    
    return {"start": start, "end": end}

year_2082 = get_year_range(2082)
print(f"Year: {year_2082['start'].format('YYYY')}")
print(f"Range: {year_2082['start'].format('MMMM DD')} - {year_2082['end'].format('MMMM DD')}")
```

---

## Custom Date Ranges

### Get Last N Days

```python
from nepali_date_library import NepaliDate

def get_last_n_days(n: int) -> dict:
    end = NepaliDate()
    start = end.add_days(-(n - 1))
    
    return {"start": start, "end": end}

last_7_days = get_last_n_days(7)
print(f"Last 7 days: {last_7_days['start'].format('MMM DD')} - {last_7_days['end'].format('MMM DD')}")
```

### Get Last N Months

```python
from nepali_date_library import NepaliDate

def get_last_n_months(n: int) -> dict:
    today = NepaliDate()
    end = today.end_of_month()
    start = today.add_months(-(n - 1)).start_of_month()

    return {"start": start, "end": end}

last_3_months = get_last_n_months(3)
print(f"Last 3 months: {last_3_months['start'].format('MMM YYYY')} - {last_3_months['end'].format('MMM YYYY')}")
```

### Get Date Range Between Two Dates

```python
from nepali_date_library import NepaliDate
from typing import List

def get_dates_between(start_date: NepaliDate, end_date: NepaliDate) -> List[NepaliDate]:
    dates = []
    current = start_date.clone()

    while not current.is_after(end_date):
        dates.append(current.clone())
        current = current.add_days(1)

    return dates

start = NepaliDate(2082, 10, 1) # Magh 1
end = NepaliDate(2082, 10, 7) # Magh 7
dates = get_dates_between(start, end)

for d in dates:
    print(d.format("YYYY-MM-DD"))
# 2082-10-01, 2082-10-02, ..., 2082-10-07
```

---

## Period Presets

### Common Report Periods

```python
from nepali_date_library import NepaliDate
from typing import Dict

def get_date_range_preset(preset: str) -> Dict:
    today = NepaliDate()

    if preset == "today":
        return {
            "start": today.start_of_day(),
            "end": today.end_of_day(),
            "label": "Today",
        }

    elif preset == "yesterday":
        yesterday = today.add_days(-1)
        return {
            "start": yesterday.start_of_day(),
            "end": yesterday.end_of_day(),
            "label": "Yesterday",
        }

    elif preset == "this_week":
        return {
            "start": today.start_of_week(),
            "end": today.end_of_week(),
            "label": "This Week",
        }

    elif preset == "this_month":
        return {
            "start": today.start_of_month(),
            "end": today.end_of_month(),
            "label": today.format("MMMM YYYY"),
        }

    elif preset == "this_year":
        return {
            "start": today.start_of_year(),
            "end": today.end_of_year(),
            "label": f"Year {today.get_year()}",
        }
        
    raise ValueError("Unknown preset")

this_month = get_date_range_preset("this_month")
print(f"{this_month['label']}: {this_month['start'].format('DD')} - {this_month['end'].format('DD')}")
```

---

## Overlapping Ranges

### Check if Date is in Range

```python
from nepali_date_library import NepaliDate

def is_date_in_range(date: NepaliDate, start: NepaliDate, end: NepaliDate) -> bool:
    return not date.is_before(start) and not date.is_after(end)

date = NepaliDate(2082, 10, 15)
start = NepaliDate(2082, 10, 1)
end = NepaliDate(2082, 10, 30)

print(is_date_in_range(date, start, end)) # True
```

### Check if Ranges Overlap

```python
from nepali_date_library import NepaliDate
from typing import Dict

def do_ranges_overlap(range1: Dict[str, NepaliDate], range2: Dict[str, NepaliDate]) -> bool:
    return (
        not range1["end"].is_before(range2["start"]) and 
        not range2["end"].is_before(range1["start"])
    )

range1 = {
    "start": NepaliDate(2082, 10, 1),
    "end": NepaliDate(2082, 10, 15),
}

range2 = {
    "start": NepaliDate(2082, 10, 10),
    "end": NepaliDate(2082, 10, 25),
}

print(do_ranges_overlap(range1, range2)) # True
```
