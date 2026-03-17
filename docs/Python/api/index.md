# API Reference

This section provides complete documentation for all classes, functions, and constants exported by the Nepali Date Library for Python.

## Main Exports

### Classes

| Class                                            | Description                              |
| ------------------------------------------------ | ---------------------------------------- |
| [NepaliDate](/docs/Python/api/nepali-date-class) | Main class for working with Nepali dates |

### Functions

| Function                                               | Description                                |
| ------------------------------------------------------ | ------------------------------------------ |
| [ADtoBS](/docs/Python/api/conversion-functions#adtobs) | Convert AD (Gregorian) date to BS (Nepali) |
| [BStoAD](/docs/Python/api/conversion-functions#bstoad) | Convert BS (Nepali) date to AD (Gregorian) |

### Constants

| Constant                                                  | Description                        |
| --------------------------------------------------------- | ---------------------------------- |
| [month_en](/docs/Python/api/constants#month-names)        | English month names                |
| [month_np](/docs/Python/api/constants#month-names)        | Nepali month names                 |
| [month_short_en](/docs/Python/api/constants#month-names)  | Short English month names          |
| [month_short_np](/docs/Python/api/constants#month-names)  | Short Nepali month names           |
| [week_en](/docs/Python/api/constants#weekday-names)       | English weekday names              |
| [week_np](/docs/Python/api/constants#weekday-names)       | Nepali weekday names               |
| [week_short_en](/docs/Python/api/constants#weekday-names) | Short English weekday names        |
| [week_short_np](/docs/Python/api/constants#weekday-names) | Short Nepali weekday names         |
| [nepali_date_map](/docs/Python/api/constants#date-map)    | Complete date map for BS 1976-2100 |

## Quick Import

```python
from nepali_date_library import (
    # Main class
    NepaliDate,

    # Conversion functions
    ADtoBS,
    BStoAD,

    # Month constants
    month_en,
    month_np,
    month_short_en,
    month_short_np,

    # Week constants
    week_en,
    week_np,
    week_short_en,
    week_short_np,

    # Date mapping
    nepali_date_map
)
```

## Detailed Reference

- [NepaliDate Class](/docs/Python/api/nepali-date-class)
- [Static Methods](/docs/Python/api/static-methods)
- [Conversion Functions](/docs/Python/api/conversion-functions)
- [Constants Reference](/docs/Python/api/constants)
