# Date Conversion

Converting between Anno Domini (AD/Gregorian) and Bikram Sambat (BS/Nepali) dates is a common requirement in Python backends handling both systems.

## Basic Conversion

### AD to BS

```python
from nepali_date_library import ADtoBS

# Simple conversion
bs_date = ADtoBS("2026-01-14")
print(bs_date) # '2082-10-01'
```

### BS to AD

```python
from nepali_date_library import BStoAD

# Simple conversion
ad_date = BStoAD("2082-10-01")
print(ad_date) # '2026-01-14'
```

---

## Form Input & Validation

### Request Handling (e.g., Flask/Django/FastAPI)

```python
from nepali_date_library import ADtoBS, BStoAD, NepaliDate
from typing import Dict, Any

def handle_date_input(value: str, input_type: str) -> Dict[str, Any]:
    """Process user date input securely in both directions."""
    if input_type == "ad":
        bs_date = ADtoBS(value)
        return {
            "ad": value,
            "bs": bs_date,
            "nepali_date": NepaliDate(bs_date)
        }
    else:
        ad_date = BStoAD(value)
        return {
            "ad": ad_date,
            "bs": value,
            "nepali_date": NepaliDate(value)
        }

# Usage
result = handle_date_input("2026-01-14", "ad")
print(result["bs"]) # '2082-10-01'
print(result["nepali_date"].format("MMMM DD, YYYY")) # 'Magh 01, 2082'
```

---

## API Integration

### Storing Dates to Backend Database

Usually, applications store dates in AD internally but present them in BS to users.

```python
from nepali_date_library import BStoAD
import json

# User selects a Nepali date, convert to AD for storage
def create_event(title: str, nepali_date_str: str) -> dict:
    return {
        "title": title,
        "event_date": BStoAD(nepali_date_str), # '2026-01-14'
    }

# Ready to send to DB or external API
event = create_event("New Year Party", "2082-10-01")
print(json.dumps(event))
# {"title": "New Year Party", "event_date": "2026-01-14"}
```

### Displaying Dates from Backend

```python
from nepali_date_library import ADtoBS, NepaliDate

# Display event with Nepali date
def display_event(event_dict: dict) -> str:
    bs_date = ADtoBS(event_dict["event_date"])
    nepali_date = NepaliDate(bs_date)

    return f"""
    Event: {event_dict['title']}
    Date: {nepali_date.format('MMMM DD, YYYY')}
    Nepali: {nepali_date.format('mmmm dd, yyyy')}
    """

event = {"id": 1, "title": "Meeting", "event_date": "2026-01-14"}
print(display_event(event))
```

---

## Batch Conversion

### Converting Multiple Dates

```python
from nepali_date_library import ADtoBS

# Convert a list of AD dates to BS
ad_dates = ["2026-01-14", "2026-02-15", "2026-03-16"]
bs_dates = [ADtoBS(date) for date in ad_dates]
print(bs_dates)
# ['2082-10-01', '2082-11-03', '2082-12-03']
```

### Processing Date Ranges

```python
from nepali_date_library import ADtoBS

def convert_date_range(ad_range: dict) -> dict:
    return {
        "start": ADtoBS(ad_range["start"]),
        "end": ADtoBS(ad_range["end"]),
    }

ad_range = {"start": "2026-01-01", "end": "2026-01-31"}
bs_range = convert_date_range(ad_range)
print(bs_range)
# {'start': '2082-09-17', 'end': '2082-10-17'}
```

---

## Error Handling

### Safe Conversion Functions

```python
from nepali_date_library import ADtoBS
from typing import Optional

# Safe wrapper with default value
def safe_ad_to_bs(ad_date: str, fallback: str = "") -> str:
    try:
        return ADtoBS(ad_date)
    except Exception as e:
        print(f"Warning: Failed to convert {ad_date}: {e}")
        return fallback

print(safe_ad_to_bs("2026-01-14")) # '2082-10-01'
print(safe_ad_to_bs("invalid", "fallback-date")) # 'fallback-date'
```

### Validation Before Conversion

```python
from nepali_date_library import ADtoBS, NepaliDate
from datetime import datetime
import re

def is_valid_ad_date_format(date_string: str) -> bool:
    return bool(re.match(r"^\d{4}-\d{2}-\d{2}$", date_string))

def is_within_supported_range(ad_date_str: str) -> bool:
    try:
        date = datetime.strptime(ad_date_str, "%Y-%m-%d")
        # In Python we assume UTC for epoch boundaries if strict
        # NepaliDate handles boundaries cleanly if passed via BStoAD
        try:
            ADtoBS(ad_date_str)
            return True
        except ValueError:
            return False
    except ValueError:
        return False

def validate_and_convert(ad_date: str) -> str:
    if not is_valid_ad_date_format(ad_date):
        raise ValueError("Invalid format. Use YYYY-MM-DD")
        
    return ADtoBS(ad_date)
```

---

## Real-World Examples

### Date of Birth Handling

```python
from nepali_date_library import ADtoBS, BStoAD, NepaliDate

class Person:
    def __init__(self, name: str, dob_ad: str = None, dob_bs: str = None):
        self.name = name
        if dob_ad:
            self.dob_ad = dob_ad
            self.dob_bs = ADtoBS(dob_ad)
        elif dob_bs:
            self.dob_ad = BStoAD(dob_bs)
            self.dob_bs = dob_bs
            
    def display(self) -> str:
        dob = NepaliDate(self.dob_bs)
        return (f"Name: {self.name}\n"
                f"Date of Birth (BS): {dob.format('MMMM DD, YYYY')}\n"
                f"Date of Birth (AD): {self.dob_ad}")
                
# Create person with AD input
person1 = Person("Ram", dob_ad="1995-08-24")
print(person1.display())

# Create person with BS input
person2 = Person("Sita", dob_bs="2052-05-08")
print(person2.display())
```

### Document Date Formatting

```python
from nepali_date_library import NepaliDate
from typing import Dict

def format_document_date(date: NepaliDate) -> Dict[str, str]:
    return {
        "formal": date.format("YYYY-MM-DD"), # 2082-10-01
        "informal": date.format("MMM D, YYYY"), # Mag 1, 2082
        "nepali": date.format("yyyy mmmm dd"), # २०८२ माघ ०१
        "full": date.format("dddd, mmmm dd, yyyy"), # बुधबार, माघ ०१, २०८२
    }

today = NepaliDate()
formats = format_document_date(today)
print(formats)
```
