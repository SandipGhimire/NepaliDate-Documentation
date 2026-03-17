# Constants

The library exports several constants for month names, weekday names, and the complete date mapping table.

## Import

```python
from nepali_date_library import (
    # Month names
    month_en,
    month_np,
    month_short_en,
    month_short_np,

    # Weekday names
    week_en,
    week_np,
    week_short_en,
    week_short_np,

    # Date map
    nepali_date_map,
)
```

---

## Month Names

### month_en

Full English transliterated month names.

```python
month_en = [
    "Baisakh",
    "Jestha",
    "Asar",
    "Shrawan",
    "Bhadra",
    "Aswin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
]
```

**Example:**

```python
print(month_en[0])  # 'Baisakh'
print(month_en[9])  # 'Magh'
print(month_en[11]) # 'Chaitra'
```

---

### month_short_en

Short English month names (3 characters).

```python
month_short_en = [
    "Bai",
    "Jes",
    "Asa",
    "Shr",
    "Bhd",
    "Asw",
    "Kar",
    "Man",
    "Pou",
    "Mag",
    "Fal",
    "Cha",
]
```

---

### month_np

Full Nepali month names in Devanagari script.

```python
month_np = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुण",
    "चैत्र",
]
```

**Example:**

```python
print(month_np[0]) # 'बैशाख'
print(month_np[9]) # 'माघ'
```

---

### month_short_np

Short Nepali month names.

```python
month_short_np = [
    "बै",
    "जे",
    "अ",
    "श्रा",
    "भा",
    "आ",
    "का",
    "मं",
    "पौ",
    "मा",
    "फा",
    "चै",
]
```

---

### Month Reference Table

| Index | month_en | month_short_en | month_np | month_short_np |
| ----- | -------- | -------------- | -------- | -------------- |
| 0     | Baisakh  | Bai            | बैशाख    | बै             |
| 1     | Jestha   | Jes            | जेठ      | जे             |
| 2     | Asar     | Asa            | असार     | अ              |
| 3     | Shrawan  | Shr            | श्रावण   | श्रा           |
| 4     | Bhadra   | Bhd            | भाद्र    | भा             |
| 5     | Aswin    | Asw            | आश्विन   | आ              |
| 6     | Kartik   | Kar            | कार्तिक  | का             |
| 7     | Mangsir  | Man            | मंसिर    | मं             |
| 8     | Poush    | Pou            | पौष      | पौ             |
| 9     | Magh     | Mag            | माघ      | मा             |
| 10    | Falgun   | Fal            | फाल्गुण  | फा             |
| 11    | Chaitra  | Cha            | चैत्र    | चै             |

---

## Weekday Names

### week_en

Full English day names.

```python
week_en = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]
```

**Example:**

```python
from nepali_date_library import NepaliDate
day_index = NepaliDate().get_day()
print(week_en[day_index]) # e.g. 'Wednesday'
```

---

### week_short_en

Short English day names (3 characters).

```python
week_short_en = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
]
```

---

### week_np

Full Nepali day names in Devanagari script.

```python
week_np = [
    "आइतबार",
    "सोमबार",
    "मंगलबार",
    "बुधबार",
    "बिहिबार",
    "शुक्रबार",
    "शनिबार",
]
```

---

### week_short_np

Short Nepali day names.

```python
week_short_np = [
    "आइत",
    "सोम",
    "मंगल",
    "बुध",
    "बिहि",
    "शुक्र",
    "शनि",
]
```

---

### Weekday Reference Table

| Index | week_en   | week_short_en | week_np  | week_short_np |
| ----- | --------- | ------------- | -------- | ------------- |
| 0     | Sunday    | Sun           | आइतबार   | आइत        |
| 1     | Monday    | Mon           | सोमबार   | सोम        |
| 2     | Tuesday   | Tue           | मंगलबार  | मंगल       |
| 3     | Wednesday | Wed           | बुधबार   | बुध        |
| 4     | Thursday  | Thu           | बिहिबार  | बिहि       |
| 5     | Friday    | Fri           | शुक्रबार | शुक्र      |
| 6     | Saturday  | Sat           | शनिबार   | शनि        |

---

## Date Map {#date-map}

### nepali_date_map

Complete mapping of days in each month for years BS 1976-2100.

```python
# The structure of the date map
nepali_date_map = [
    {
        "year": 1976,
        "days": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        "totalDays": 366,
        "daysTillNow": ... # Total days from epoch
    },
    # ... more years ...
]
```

**Example Usage:**

```python
from nepali_date_library import nepali_date_map

# Get month lengths for a specific year (e.g., 2082)
# The first year in the map is 1976, so year - 1976 gets the index
year_data = nepali_date_map[2082 - 1976]
print(year_data["days"])
# [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]

# Days in Magh 2082 (month index 9)
print(year_data["days"][9]) # 29

# Total days in 2082
print(year_data["totalDays"]) # 365
```

---

### Month Length Variations

Nepali months have varying lengths (29-32 days) depending on the year:

| Month   | Min Days | Max Days | Typical |
| ------- | -------- | -------- | ------- |
| Baisakh | 30       | 31       | 31      |
| Jestha  | 31       | 32       | 31-32   |
| Asar    | 31       | 32       | 31-32   |
| Shrawan | 31       | 32       | 32      |
| Bhadra  | 31       | 32       | 31-32   |
| Aswin   | 30       | 31       | 30-31   |
| Kartik  | 29       | 30       | 29-30   |
| Mangsir | 29       | 30       | 29-30   |
| Poush   | 29       | 30       | 29-30   |
| Magh    | 29       | 30       | 29-30   |
| Falgun  | 29       | 30       | 29-30   |
| Chaitra | 30       | 31       | 30-31   |

::: warning
Never hardcode month lengths! Always use `NepaliDate().days_in_month()` or the date map to get accurate values.
:::

---

## Using Constants for Custom Formatting

```python
from nepali_date_library import NepaliDate, month_en, month_np, week_en, week_np

def format_date_custom(date: NepaliDate, nepali: bool = False) -> str:
    months = month_np if nepali else month_en
    days = week_np if nepali else week_en

    return f"{days[date.get_day()]}, {months[date.get_month()]} {date.get_date()}, {date.get_year()}"

date = NepaliDate(2082, 10, 15)
print(format_date_custom(date)) # 'Wednesday, Magh 15, 2082'
print(format_date_custom(date, True)) # 'बुधबार, माघ 15, 2082'
```
