# Use Cases

This section covers common patterns and real-world use cases for the Nepali Date Library in Python.

## Overview

The library is designed to handle various date-related tasks in Python applications contexts:

| Use Case                   | Description                             | Link                                                                |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| **Date Conversion**        | Converting between AD and BS dates      | [→ Date Conversion](/docs/Python/use-cases/date-conversion)         |
| **Calendar Generation**    | Building datepickers and calendars      | [→ Calendar Generation](/docs/Python/use-cases/calendar-generation) |
| **Fiscal Year Operations** | Working with Nepal's fiscal year        | [→ Fiscal Year](/docs/Python/use-cases/fiscal-year)                 |
| **Date Ranges**            | Working with week/month/year boundaries | [→ Date Ranges](/docs/Python/use-cases/date-ranges)                 |

## Common Scenarios

### Web Applications (Django/Flask/FastAPI)

- User registration with Nepali date of birth
- Event scheduling in Nepali calendar
- Report generation by Nepali dates
- Bill and invoice dating

### Data Processing & Scripts

- Batch converting database rows containing Nepali dates
- Formatting dates for data analysis
- Fiscal year aggregations for financial data

### General Business Logic

- Fiscal year financial reports
- Quarterly statements
- Tax period calculations
- Payroll processing

## Quick Examples

### Display Today's Date in Nepali

```python
from nepali_date_library import NepaliDate

today = NepaliDate()

# Full Nepali format
print(today.format("dddd, mmmm dd, yyyy"))
# Output: बुधबार, माघ ०१, २०८२

# Mixed format
print(today.format("MMMM DD, YYYY (dddd)"))
# Output: Magh 01, 2082 (बुधबार)
```

### Convert API Dates

```python
from nepali_date_library import ADtoBS

# Simulated response from an API with Gregorian date
api_response = {"created_at": "2026-01-14T10:30:00Z"}

# Extract the date part and covert to Nepali date for display
nepali_date = ADtoBS(api_response["created_at"].split("T")[0])
print(f"Created on: {nepali_date}") # Created on: 2082-10-01
```

### Age Calculation

```python
from nepali_date_library import NepaliDate

def calculate_age(birth_date: str) -> int:
    dob = NepaliDate(birth_date)
    today = NepaliDate()
    # Calculates full years elapsed
    return today.diff(dob, "year")

print(calculate_age("2050-05-15")) # e.g. 32
```

### Date Validation

```python
from nepali_date_library import NepaliDate

def validate_nepali_date(year: int, month: int, day: int) -> bool:
    # month is 1-indexed here natively for user inputs
    return NepaliDate.is_valid(year, month, day)

# Validate user input
user_year = 2082
user_month = 10 # Magh
user_day = 32

if validate_nepali_date(user_year, user_month, user_day):
    print("Valid date")
else:
    print("Invalid date") # e.g. Day too high for Magh if it only has 29 days
```
