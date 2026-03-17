# Calendar Generation

Building calendars and datepickers is a common requirement in data visualization or web apps (e.g., using Jinja templates in Django/Flask). The `get_calendar_days()` static method provides the data needed to construct a complete monthly grid.

## Basic Calendar Data

### Get Calendar Days for a Month

```python
from nepali_date_library import NepaliDate

# Call the static method. Note: month is 0-indexed internally
calendar = NepaliDate.get_calendar_days(2082, 9) # 9 = Magh 2082

import pprint
pprint.pprint(calendar)
# {
#   'prev_remaining_days': 3,
#   'prev_month': {'year': 2082, 'month': 8, 'days': [28, 29, 30]},
#   'current_month': {'year': 2082, 'month': 9, 'days': [1, 2, ..., 29]},
#   'next_month': {'year': 2082, 'month': 10, 'days': [1, 2, 3, 4, 5]},
#   'remaining_days': 5
# }
```

### Understanding the Output

| Property | Description |
| --- | --- |
| `prev_remaining_days` | Number of days from previous month to fill the first week |
| `prev_month` | Previous month's trailing days info |
| `current_month` | Current month's complete day array |
| `next_month` | Next month's leading days info |
| `remaining_days` | Number of days from next month needed to complete the grid |

---

## Building a Calendar Structure

### Generate a Flat List for Templates

Many UI frameworks (including Django/Jinja templates) easily render a flat list of items into a CSS grid. Here is how you can flatten the calendar data.

```python
from nepali_date_library import NepaliDate

def generate_calendar_grid(year: int, month: int) -> list:
    """Returns a unified list of day dictionaries for a 6x7 calendar grid."""
    calendar = NepaliDate.get_calendar_days(year, month)
    today = NepaliDate()
    
    days = []
    
    # Prefix with previous month's trailing days
    for day in calendar['prev_month']['days']:
        days.append({
            'day': day,
            'type': 'prev',
            'is_today': False
        })
        
    # Add current month's days
    for day in calendar['current_month']['days']:
        is_today = (
            today.get_year() == year and 
            today.get_month() == month and 
            today.get_date() == day
        )
        days.append({
            'day': day,
            'type': 'current',
            'is_today': is_today
        })
        
    # Suffix with next month's leading days
    for day in calendar['next_month']['days']:
        days.append({
            'day': day,
            'type': 'next',
            'is_today': False
        })
        
    return days

# Usage
grid_days = generate_calendar_grid(2082, 9)
print(len(grid_days)) # 35 or 42 (exactly 5 or 6 weeks)
```

---

## Week Information

### Get Week Number
You can calculate the numerical week of the year using standard date algebra.

```python
import math
from nepali_date_library import NepaliDate

def get_week_number(date: NepaliDate) -> int:
    start_of_year = date.start_of_year()
    days_diff = date.diff(start_of_year, "day")
    start_day_of_week = start_of_year.get_day()
    
    return math.ceil((days_diff + start_day_of_week + 1) / 7)

date = NepaliDate(2082, 10, 15)
print(f"Week {get_week_number(date)}")
```

### Get Weeks in Month

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 10, 1)
weeks = date.get_weeks_in_month()
print(f"This month spans across {weeks} weeks") # 5 or 6
```
