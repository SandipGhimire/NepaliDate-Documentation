# Code Snippets

A comprehensive collection of copy-paste ready code snippets for common tasks in Python.

## Table of Contents

[[toc]]

---

## Date Creation

### All Ways to Create a NepaliDate

```python
from nepali_date_library import NepaliDate
from datetime import datetime
import time

# 1. Current date and time
now = NepaliDate()

# 2. From year, month (0-indexed), day
specific = NepaliDate(2082, 9, 15)

# 3. From date string
from_string = NepaliDate("2082-10-15")
from_slash = NepaliDate("2082/10/15")
from_dot = NepaliDate("2082.10.15")

# 4. From Python datetime or date
from_py_datetime = NepaliDate(datetime.now())
from_specific_date = NepaliDate(datetime(2026, 1, 14))

# 5. From epoch timestamp
from_timestamp = NepaliDate(time.time() * 1000)
from_past_timestamp = NepaliDate(1736848800000)

# 6. From another NepaliDate (clone parameter passing)
original = NepaliDate()
copy = NepaliDate(original)

# 7. Using clone method
cloned = original.clone()
```

---

## Formatting Examples

### All Format Tokens

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

# === ENGLISH (UPPERCASE) ===

# Year
print(date.format("YYYY")) # '2082'
print(date.format("YY"))   # '82'

# Month
print(date.format("MM"))   # '10'
print(date.format("M"))    # '10'
print(date.format("MMM"))  # 'Mag'
print(date.format("MMMM")) # 'Magh'

# Day
print(date.format("DD"))   # '15'
print(date.format("D"))    # '15'
print(date.format("DDD"))  # 'Wed'
print(date.format("DDDD")) # 'Wednesday'

# === NEPALI (LOWERCASE) ===

# Year
print(date.format("yyyy")) # '२०८२'
print(date.format("yy"))   # '८२'

# Month
print(date.format("mm"))   # '१०'
print(date.format("m"))    # '१०'
print(date.format("mmm"))  # 'मा'
print(date.format("mmmm")) # 'माघ'

# Day
print(date.format("dd"))   # '१५'
print(date.format("d"))    # '१५'
print(date.format("ddd"))  # 'बुध'
print(date.format("dddd")) # 'बुधबार'
```

### Common Format Patterns

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2082, 9, 15)

# ISO style
print(date.format("YYYY-MM-DD"))          # '2082-10-15'

# Formal
print(date.format("MMMM DD, YYYY"))       # 'Magh 15, 2082'

# With day name
print(date.format("DDDD, MMMM DD, YYYY")) # 'Wednesday, Magh 15, 2082'

# Short
print(date.format("MMM DD"))              # 'Mag 15'

# Month and year only
print(date.format("MMMM YYYY"))           # 'Magh 2082'

# Nepali formal
print(date.format("mmmm dd, yyyy"))       # 'माघ १५, २०८२'

# Nepali with day
print(date.format("dddd, mmmm dd yyyy"))  # 'बुधबार, माघ १५ २०८२'
```

---

## Date Conversion Snippets

### Complete Conversion Utility

```python
from nepali_date_library import NepaliDate, ADtoBS, BStoAD
from datetime import datetime

class DateConverter:
    @staticmethod
    def ad_to_bs(ad_date: str) -> str:
        """AD string ('YYYY-MM-DD') to BS string"""
        return ADtoBS(ad_date)

    @staticmethod
    def bs_to_ad(bs_date: str) -> str:
        """BS string ('YYYY-MM-DD') to AD string"""
        return BStoAD(bs_date)

    @staticmethod
    def py_to_nepali(dt: datetime) -> NepaliDate:
        """Python datetime to NepaliDate"""
        return NepaliDate(dt)

    @staticmethod
    def nepali_to_py(nepali_date: NepaliDate) -> datetime:
        """NepaliDate to Python datetime"""
        return nepali_date.get_english_date()

    @staticmethod
    def safe_ad_to_bs(ad_date: str, fallback: str = "") -> str:
        """Safe conversion with fallback on error"""
        try:
            return ADtoBS(ad_date)
        except Exception:
            return fallback

# Usage
print(DateConverter.ad_to_bs("2026-01-14")) # '2082-10-01'
```

---

## Date Manipulation Snippets

### Date Arithmetic Helper

```python
from nepali_date_library import NepaliDate

class DateMath:
    @staticmethod
    def add_days(date: NepaliDate, days: int) -> NepaliDate:
        return date.add_days(days)

    @staticmethod
    def add_weeks(date: NepaliDate, weeks: int) -> NepaliDate:
        return date.add_days(weeks * 7)

    @staticmethod
    def add_months(date: NepaliDate, months: int) -> NepaliDate:
        return date.add_months(months)

    @staticmethod
    def add_years(date: NepaliDate, years: int) -> NepaliDate:
        return date.add_years(years)

    @staticmethod
    def days_ago(n: int) -> NepaliDate:
        return NepaliDate().add_days(-n)

    @staticmethod
    def days_from_now(n: int) -> NepaliDate:
        return NepaliDate().add_days(n)

    @staticmethod
    def months_ago(n: int) -> NepaliDate:
        return NepaliDate().add_months(-n)

# Usage
print(DateMath.days_ago(7).format("YYYY-MM-DD"))
print(DateMath.days_from_now(30).format("MMMM DD"))
```

---

## Date Comparison Snippets

### Complete Comparison Utility

```python
from nepali_date_library import NepaliDate

class DateCompare:
    @staticmethod
    def is_today(date: NepaliDate) -> bool:
        today = NepaliDate()
        return (
            date.is_same(today, "day") and
            date.is_same(today, "month") and
            date.is_same(today, "year")
        )

    @staticmethod
    def is_past(date: NepaliDate) -> bool:
        return date.is_before(NepaliDate())

    @staticmethod
    def is_future(date: NepaliDate) -> bool:
        return date.is_after(NepaliDate())

    @staticmethod
    def is_this_month(date: NepaliDate) -> bool:
        today = NepaliDate()
        return date.is_same(today, "year") and date.is_same(today, "month")

    @staticmethod
    def is_this_year(date: NepaliDate) -> bool:
        return date.is_same(NepaliDate(), "year")

    @staticmethod
    def min_date(date1: NepaliDate, date2: NepaliDate) -> NepaliDate:
        return date1 if date1.is_before(date2) else date2

    @staticmethod
    def max_date(date1: NepaliDate, date2: NepaliDate) -> NepaliDate:
        return date1 if date1.is_after(date2) else date2

    @staticmethod
    def days_between(date1: NepaliDate, date2: NepaliDate) -> int:
        return abs(date1.diff(date2, "day"))

# Usage
date = NepaliDate(2082, 9, 15)
print(DateCompare.is_today(date))    # False
print(DateCompare.is_this_year(date)) # True
```

---

## Date Range Snippets

### Date Range Generator

```python
from nepali_date_library import NepaliDate
from typing import Dict

class DateRanges:
    @staticmethod
    def today() -> Dict:
        today = NepaliDate()
        return {
            "start": today.start_of_day(),
            "end": today.end_of_day(),
            "label": "Today"
        }

    @staticmethod
    def this_week() -> Dict:
        today = NepaliDate()
        return {
            "start": today.start_of_week(),
            "end": today.end_of_week(),
            "label": "This Week"
        }

    @staticmethod
    def this_month() -> Dict:
        today = NepaliDate()
        return {
            "start": today.start_of_month(),
            "end": today.end_of_month(),
            "label": today.format("MMMM YYYY")
        }

    @staticmethod
    def this_year() -> Dict:
        today = NepaliDate()
        return {
            "start": today.start_of_year(),
            "end": today.end_of_year(),
            "label": f"Year {today.get_year()}"
        }

    @staticmethod
    def last_n_days(n: int) -> Dict:
        today = NepaliDate()
        return {
            "start": today.add_days(-(n - 1)),
            "end": today,
            "label": f"Last {n} Days"
        }

    @staticmethod
    def custom(start: NepaliDate, end: NepaliDate) -> Dict:
        return {
            "start": start,
            "end": end,
            "label": f"{start.format('MMM DD')} - {end.format('MMM DD, YYYY')}"
        }

# Usage
this_month = DateRanges.this_month()
print(this_month["label"])
print(this_month["start"].format("YYYY-MM-DD"))
```

---

## Validation Snippets

### Complete Validation Utility

```python
from nepali_date_library import NepaliDate
from datetime import datetime
import re

class DateValidation:
    @staticmethod
    def is_valid_date(year: int, month: int, day: int) -> bool:
        return NepaliDate.is_valid(year, month, day)

    @staticmethod
    def is_valid_format(date_string: str) -> bool:
        return bool(re.match(r"^\d{4}[-/.]\d{2}[-/.]\d{2}$", date_string))

    @staticmethod
    def parse_or_none(date_string: str) -> NepaliDate | None:
        try:
            if not DateValidation.is_valid_format(date_string):
                return None
            return NepaliDate(date_string)
        except Exception:
            return None

    @staticmethod
    def is_in_supported_range(dt: datetime) -> bool:
        min_dt = NepaliDate.minimum().get_english_date()
        max_dt = NepaliDate.maximum().get_english_date()
        # Ensure timezone-naive comparison for simplicity,
        # or handle tzinfo based on your app's needs
        return min_dt.replace(tzinfo=None) <= dt.replace(tzinfo=None) <= max_dt.replace(tzinfo=None)

    @staticmethod
    def validate_input(user_input: str) -> dict:
        if not user_input:
            return {"valid": False, "error": "Date is required"}

        if not DateValidation.is_valid_format(user_input):
            return {"valid": False, "error": "Invalid format. Use YYYY-MM-DD"}

        date = DateValidation.parse_or_none(user_input)
        if not date:
            return {"valid": False, "error": "Invalid date"}

        return {"valid": True, "date": date}

# Usage
result = DateValidation.validate_input("2082-10-15")
if result["valid"]:
    print(result["date"].format("MMMM DD, YYYY"))
else:
    print(result["error"])
```

---

## Age Calculation

### Calculate Age from DOB

```python
from nepali_date_library import NepaliDate

def calculate_age(dob_string: str) -> dict:
    dob = NepaliDate(dob_string)
    today = NepaliDate()

    years = today.get_year() - dob.get_year()
    months = today.get_month() - dob.get_month()
    days = today.get_date() - dob.get_date()

    if days < 0:
        months -= 1
        prev_month = today.add_months(-1)
        days += prev_month.days_in_month()

    if months < 0:
        years -= 1
        months += 12

    description_parts = []
    if years > 0:
        description_parts.append(f"{years} year{'s' if years > 1 else ''}")
    if months > 0:
        description_parts.append(f"{months} month{'s' if months > 1 else ''}")
    if days > 0:
        description_parts.append(f"{days} day{'s' if days > 1 else ''}")

    description = " ".join(description_parts) if description_parts else "0 days"

    return {
        "years": years,
        "months": months,
        "days": days,
        "description": description
    }

# Usage
age = calculate_age("2050-05-15")
print(age["description"]) # '32 years 4 months 16 days'
```

---

## Calendar Generation

### Full Calendar Component Data

```python
from nepali_date_library import NepaliDate, week_en, month_en

def generate_calendar_data(year: int, month: int) -> dict:
    calendar = NepaliDate.get_calendar_days(year, month)
    today = NepaliDate()

    all_days = []

    # Previous month
    for day in calendar["prev_month"]["days"]:
        full_date = NepaliDate(calendar["prev_month"]["year"], calendar["prev_month"]["month"], day)
        all_days.append({
            "date": day,
            "month": "prev",
            "is_today": False,
            "is_weekend": full_date.get_day() in [0, 6],
            "full_date": full_date
        })

    # Current month
    for day in calendar["current_month"]["days"]:
        full_date = NepaliDate(year, month, day)
        is_today = (
            today.get_year() == year and
            today.get_month() == month and
            today.get_date() == day
        )
        all_days.append({
            "date": day,
            "month": "current",
            "is_today": is_today,
            "is_weekend": full_date.get_day() in [0, 6],
            "full_date": full_date
        })

    # Next month
    for day in calendar["next_month"]["days"]:
        full_date = NepaliDate(calendar["next_month"]["year"], calendar["next_month"]["month"], day)
        all_days.append({
            "date": day,
            "month": "next",
            "is_today": False,
            "is_weekend": full_date.get_day() in [0, 6],
            "full_date": full_date
        })

    # Group into weeks
    weeks = [{"days": all_days[i:i+7]} for i in range(0, len(all_days), 7)]

    return {
        "year": year,
        "month": month,
        "month_name": month_en[month],
        "month_name_np": NepaliDate.get_month_name(month, False, True),
        "weekdays": week_en,
        "weeks": weeks,
        "total_days": len(calendar["current_month"]["days"])
    }

# Usage
cal_data = generate_calendar_data(2082, 9)
print(f"{cal_data['month_name']} {cal_data['year']}")
print(f"Total days: {cal_data['total_days']}")
print(f"Weeks to display: {len(cal_data['weeks'])}")
```

---

## Fiscal Year Snippets

### Complete Fiscal Year Utility

```python
from nepali_date_library import NepaliDate
from typing import Dict

class FiscalYearHelper:
    @staticmethod
    def get_current_fy_data() -> Dict:
        fy = NepaliDate.current_fiscal_year()
        quarters = NepaliDate.get_fiscal_quarters(fy)
        today = NepaliDate()

        fy_start = quarters["Q1"]["start"]
        fy_end = quarters["Q4"]["end"]

        total_days = abs(fy_start.diff(fy_end, "day"))
        days_elapsed = abs(fy_start.diff(today, "day"))
        days_remaining = abs(today.diff(fy_end, "day"))

        # Avoid division by zero if dates are corrupted somehow
        percent_complete = round((days_elapsed / total_days) * 100) if total_days > 0 else 0

        return {
            "fiscal_year": f"{fy}/{str(fy + 1)[-2:]}",
            "start_date": fy_start.format("YYYY-MM-DD"),
            "end_date": fy_end.format("YYYY-MM-DD"),
            "current_quarter": today.fiscal_quarter(),
            "days_remaining": days_remaining,
            "percent_complete": percent_complete
        }

    @staticmethod
    def get_quarter_dates(quarter: int, fy: int = None) -> Dict:
        fiscal_year = fy if fy else NepaliDate.current_fiscal_year()
        q = NepaliDate.get_fiscal_quarter(quarter, fiscal_year)

        return {
            "start": q["start"].format("YYYY-MM-DD"),
            "end": q["end"].format("YYYY-MM-DD"),
            "label": f"FQ{quarter} {fiscal_year}/{fiscal_year + 1}"
        }

# Usage
fy_data = FiscalYearHelper.get_current_fy_data()
print(f"Fiscal Year: {fy_data['fiscal_year']}")
print(f"{fy_data['percent_complete']}% complete")
print(f"{fy_data['days_remaining']} days remaining")
```

---

## Nepali Number Conversion

### Number to Nepali Digits

```python
from nepali_date_library import number_np

def to_nepali_digits(num) -> str:
    """Convert a number or string containing digits to Nepali digits"""
    result = []
    for char in str(num):
        if char.isdigit():
            result.append(number_np[int(char)])
        else:
            result.append(char)
    return "".join(result)

def from_nepali_digits(nepali_num: str) -> int:
    """Convert Nepali digits back to English (integer value)"""
    result = []
    for char in nepali_num:
        try:
            index = number_np.index(char)
            result.append(str(index))
        except ValueError:
            result.append(char)
    return int("".join(result))

# Usage
print(to_nepali_digits(2082))      # '२०८२'
print(to_nepali_digits("15"))      # '१५'
print(from_nepali_digits("२०८२"))   # 2082
```
