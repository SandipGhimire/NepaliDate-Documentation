# Use Cases (Python)

Here are some common scenarios and how to handle them using the `nepali_date_library`.

## 1. Displaying Today's Date in Nepali

```python
from nepali_date_library import NepaliDate

today = NepaliDate()
# Outputs: २०८२ माघ ०१
print(today.format("yyyy mmmm dd"))
```

## 2. Formatting a Specific Date

```python
from nepali_date_library import NepaliDate

date = NepaliDate(2080, 5, 10)
print(date.format("MMMM DD, YYYY")) # Bhadra 10, 2080
```

## 3. Working with Gregorian Dates

If you have a Python `datetime` object and want to know its Nepali equivalent:

```python
from datetime import datetime
from nepali_date_library import NepaliDate

birth_date_ad = datetime(1995, 8, 24)
birth_date_bs = NepaliDate(birth_date_ad)

print(birth_date_bs.format("YYYY-MM-DD")) # 2052-05-08
```

## 4. Converting Date Strings from an API

```python
from nepali_date_library import ADtoBS, BStoAD

# API gives you BS date, you need AD for your database
api_bs_date = "2080-01-15"
ad_date = BStoAD(api_bs_date)
# Use ad_date in your database query
```
