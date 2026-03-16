# Conversion Functions

The library provides simple utility functions for one-off date conversions.

## `ADtoBS(ad_date_string: str) -> str`

Converts a Gregorian (AD) date string to a Nepali (BS) date string.

- **Input Format:** `YYYY-MM-DD`
- **Output Format:** `YYYY-MM-DD`
- **Example:**
  ```python
  from nepali_date_library import ADtoBS
  bs = ADtoBS("2026-01-14") 
  print(bs) # '2082-10-01'
  ```

## `BStoAD(bs_date_string: str) -> str`

Converts a Nepali (BS) date string to a Gregorian (AD) date string.

- **Input Format:** `YYYY-MM-DD`
- **Output Format:** `YYYY-MM-DD`
- **Example:**
  ```python
  from nepali_date_library import BStoAD
  ad = BStoAD("2082-10-01")
  print(ad) # '2026-01-14'
  ```
