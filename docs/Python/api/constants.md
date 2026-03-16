# Constants

The library exports several constants that can be useful for localization or custom date handling.

## Weekdays

| Constant | Description | Example |
| --- | --- | --- |
| `week_en` | Full English weekday names | `["Sunday", ...]` |
| `week_short_en` | Short English weekday names | `["Sun", ...]` |
| `week_np` | Full Nepali weekday names | `["आइतबार", ...]` |
| `week_short_np` | Short Nepali weekday names | `["आइत", ...]` |

## Months

| Constant | Description | Example |
| --- | --- | --- |
| `month_en` | Full English names of Nepali months | `["Baisakh", ...]` |
| `month_short_en` | Short English names of Nepali months | `["Bai", ...]` |
| `month_np` | Full Nepali names of Nepali months | `["वैशाख", ...]` |
| `month_short_np` | Short Nepali names of Nepali months | `["बैशाख", ...]` |

## Numerals

| Constant | Description |
| --- | --- |
| `nepali_numerals` | List of Nepali numerals `०-९` |

---

## Usage Example

```python
from nepali_date_library.helper.constants import month_np

print(month_np[0]) # 'वैशाख'
```
