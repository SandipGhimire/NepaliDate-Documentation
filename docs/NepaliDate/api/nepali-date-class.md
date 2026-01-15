# NepaliDate Class

The `NepaliDate` class is the core of the library, providing a complete API for creating, manipulating, and formatting Nepali (Bikram Sambat) dates.

## Import

```typescript
import { NepaliDate } from "nepali-date-library";
```

---

## Constructors

The `NepaliDate` class supports multiple constructor signatures:

### Default Constructor

Creates a `NepaliDate` for the current date and time.

```typescript
new NepaliDate();
```

**Example:**

```typescript
const today = new NepaliDate();
console.log(today.toString()); // '2082/10/01'
```

### From JavaScript Date

Creates a `NepaliDate` from a JavaScript `Date` object.

```typescript
new NepaliDate(date: Date)
```

**Parameters:**

- `date` - JavaScript Date object

**Example:**

```typescript
const jsDate = new Date("2026-01-14");
const nepaliDate = new NepaliDate(jsDate);
console.log(nepaliDate.toString()); // '2082/10/01'
```

### From NepaliDate

Creates a copy of another `NepaliDate` instance.

```typescript
new NepaliDate(date: NepaliDate)
```

**Example:**

```typescript
const original = new NepaliDate();
const copy = new NepaliDate(original);
```

### From Timestamp

Creates a `NepaliDate` from a Unix timestamp in milliseconds.

```typescript
new NepaliDate(timestamp: number)
```

**Example:**

```typescript
const nepaliDate = new NepaliDate(Date.now());
```

### From Date String

Creates a `NepaliDate` from a formatted date string.

```typescript
new NepaliDate(dateString: string)
```

**Supported formats:**

- `YYYY-MM-DD` (e.g., `'2082-10-01'`)
- `YYYY/MM/DD` (e.g., `'2082/10/01'`)
- `YYYY.MM.DD` (e.g., `'2082.10.01'`)

**Example:**

```typescript
const date = new NepaliDate("2082-10-15");
console.log(date.getYear()); // 2082
console.log(date.getMonth()); // 9 (0-indexed)
console.log(date.getDate()); // 15
```

### From Components

Creates a `NepaliDate` with specific year, month, and day values.

```typescript
new NepaliDate(year: number, month: number, day: number)
```

**Parameters:**

- `year` - Nepali year (e.g., 2082)
- `month` - Nepali month (0-11, where 0 = Baisakh)
- `day` - Day of month (1-32)

::: warning Month is 0-indexed
The month parameter is 0-indexed: 0 = Baisakh, 1 = Jestha, ..., 11 = Chaitra
:::

**Example:**

```typescript
// Magh 15, 2082 (month 9 = Magh since 0-indexed)
const date = new NepaliDate(2082, 9, 15);
console.log(date.format("MMMM DD, YYYY")); // 'Magh 15, 2082'
```

---

## Getter Methods

### getYear()

Returns the Nepali year.

```typescript
getYear(): number
```

**Returns:** Nepali year (e.g., 2082)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
console.log(date.getYear()); // 2082
```

---

### getMonth()

Returns the Nepali month (0-indexed).

```typescript
getMonth(): number
```

**Returns:** Nepali month (0-11, where 0 = Baisakh, 11 = Chaitra)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
console.log(date.getMonth()); // 9 (Magh)
```

---

### getDate()

Returns the day of the month.

```typescript
getDate(): number
```

**Returns:** Day of month (1-32)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
console.log(date.getDate()); // 15
```

---

### getDay()

Returns the day of the week.

```typescript
getDay(): number
```

**Returns:** Day of week (0-6, where 0 = Sunday, 6 = Saturday)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
console.log(date.getDay()); // 3 (Wednesday)
```

---

### getHours()

Returns the hour component.

```typescript
getHours(): number
```

**Returns:** Hour (0-23)

---

### getMinutes()

Returns the minutes component.

```typescript
getMinutes(): number
```

**Returns:** Minutes (0-59)

---

### getSeconds()

Returns the seconds component.

```typescript
getSeconds(): number
```

**Returns:** Seconds (0-59)

---

### getMilliseconds()

Returns the milliseconds component.

```typescript
getMilliseconds(): number
```

**Returns:** Milliseconds (0-999)

---

### getTime()

Returns the timestamp in milliseconds since Unix epoch.

```typescript
getTime(): number
```

**Returns:** Timestamp in milliseconds

**Example:**

```typescript
const date = new NepaliDate();
console.log(date.getTime()); // 1736848800000
```

---

### getEnglishDate()

Returns the equivalent Gregorian (AD) date as a JavaScript Date object.

```typescript
getEnglishDate(): Date
```

**Returns:** JavaScript Date object

**Example:**

```typescript
const nepaliDate = new NepaliDate(2082, 9, 1);
const englishDate = nepaliDate.getEnglishDate();
console.log(englishDate.toISOString()); // '2026-01-14T...'
```

---

## Setter Methods

### setYear()

Sets the Nepali year.

```typescript
setYear(year: number): void
```

**Parameters:**

- `year` - Nepali year to set

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
date.setYear(2083);
console.log(date.getYear()); // 2083
```

---

### setMonth()

Sets the Nepali month.

```typescript
setMonth(month: number): void
```

**Parameters:**

- `month` - Nepali month (0-11)

---

### setDate()

Sets the day of month.

```typescript
setDate(day: number): void
```

**Parameters:**

- `day` - Day of month (1-32)

---

### set()

Sets year, month, and day at once.

```typescript
set(year: number, month: number, day: number): void
```

**Parameters:**

- `year` - Nepali year
- `month` - Nepali month (0-11)
- `day` - Day of month (1-32)

**Example:**

```typescript
const date = new NepaliDate();
date.set(2082, 9, 15);
console.log(date.toString()); // '2082/10/15'
```

---

## Formatting Methods

### format()

Formats the date according to a format string.

```typescript
format(formatStr: string): string
```

**Parameters:**

- `formatStr` - Format pattern string

**Returns:** Formatted date string

#### English Format Tokens (Uppercase)

| Token  | Description                | Example        |
| ------ | -------------------------- | -------------- |
| `YYYY` | Full year                  | 2082           |
| `YY`   | 2-digit year               | 82             |
| `MM`   | Month with leading zero    | 01-12          |
| `M`    | Month without leading zero | 1-12           |
| `MMM`  | Short month name           | Bai, Jes, Mag  |
| `MMMM` | Full month name            | Baisakh, Magh  |
| `DD`   | Day with leading zero      | 01-32          |
| `D`    | Day without leading zero   | 1-32           |
| `DDD`  | Short day name             | Sun, Mon       |
| `DDDD` | Full day name              | Sunday, Monday |

#### Nepali Format Tokens (Lowercase)

| Token  | Description                | Example        |
| ------ | -------------------------- | -------------- |
| `yyyy` | Full year in Nepali        | २०८२           |
| `yy`   | 2-digit year in Nepali     | ८२             |
| `mm`   | Month with leading zero    | ०१-१२          |
| `m`    | Month without leading zero | १-१२           |
| `mmm`  | Short month name           | बै, जे, मा     |
| `mmmm` | Full month name            | बैशाख, माघ     |
| `dd`   | Day with leading zero      | ०१-३२          |
| `d`    | Day without leading zero   | १-३२           |
| `ddd`  | Short day name             | आइत, सोम       |
| `dddd` | Full day name              | आइतबार, सोमबार |

**Examples:**

```typescript
const date = new NepaliDate(2082, 9, 15);

// English formats
console.log(date.format("YYYY-MM-DD")); // '2082-10-15'
console.log(date.format("MMMM DD, YYYY")); // 'Magh 15, 2082'
console.log(date.format("MMM D, YYYY")); // 'Mag 15, 2082'
console.log(date.format("DDDD, MMMM DD")); // 'Wednesday, Magh 15'

// Nepali formats
console.log(date.format("yyyy-mm-dd")); // '२०८२-१०-१५'
console.log(date.format("mmmm dd, yyyy")); // 'माघ १५, २०८२'
console.log(date.format("dddd, mmmm dd")); // 'बुधबार, माघ १५'

// Mixed format with literal text
console.log(date.format('YYYY"/"MM"/"DD')); // '2082/10/15'
```

---

### toString()

Returns the date as a string in `YYYY/MM/DD` format with 1-indexed month.

```typescript
toString(): string
```

**Returns:** Date string (e.g., `'2082/10/15'`)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
console.log(date.toString()); // '2082/10/15'
```

---

### parse()

Parses a date string and updates the current instance.

```typescript
parse(dateString: string): void
```

**Parameters:**

- `dateString` - Date string in format YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD

**Example:**

```typescript
const date = new NepaliDate();
date.parse("2082-10-15");
console.log(date.getYear()); // 2082
console.log(date.getMonth()); // 9
console.log(date.getDate()); // 15
```

---

## Date Manipulation Methods

### addDays()

Adds the specified number of days and returns a new instance.

```typescript
addDays(days: number): NepaliDate
```

**Parameters:**

- `days` - Number of days to add (can be negative)

**Returns:** New `NepaliDate` instance

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const tomorrow = date.addDays(1);
const lastWeek = date.addDays(-7);
console.log(tomorrow.format("YYYY-MM-DD")); // '2082-10-16'
```

---

### addMonths()

Adds the specified number of months and returns a new instance.

```typescript
addMonths(months: number): NepaliDate
```

**Parameters:**

- `months` - Number of months to add (can be negative)

**Returns:** New `NepaliDate` instance

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const nextMonth = date.addMonths(1);
console.log(nextMonth.format("YYYY-MM-DD")); // '2082-11-15'
```

---

### addYears()

Adds the specified number of years and returns a new instance.

```typescript
addYears(years: number): NepaliDate
```

**Parameters:**

- `years` - Number of years to add (can be negative)

**Returns:** New `NepaliDate` instance

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const nextYear = date.addYears(1);
console.log(nextYear.format("YYYY-MM-DD")); // '2083-10-15'
```

---

## Date Comparison Methods

### diff()

Calculates the difference between two dates.

```typescript
diff(date: NepaliDate, unit: 'year' | 'month' | 'day'): number
```

**Parameters:**

- `date` - NepaliDate to compare with
- `unit` - Unit of difference ('year', 'month', or 'day')

**Returns:** Difference in the specified unit

**Example:**

```typescript
const date1 = new NepaliDate(2082, 5, 10);
const date2 = new NepaliDate(2082, 5, 20);

console.log(date1.diff(date2, "day")); // -10
console.log(date2.diff(date1, "day")); // 10
console.log(date1.diff(date2, "month")); // 0
```

---

### isAfter()

Checks if this date comes after the specified date.

```typescript
isAfter(date: NepaliDate): boolean
```

**Parameters:**

- `date` - Date to compare with

**Returns:** `true` if this date is after the specified date

**Example:**

```typescript
const date1 = new NepaliDate(2082, 9, 20);
const date2 = new NepaliDate(2082, 9, 15);
console.log(date1.isAfter(date2)); // true
```

---

### isBefore()

Checks if this date comes before the specified date.

```typescript
isBefore(date: NepaliDate): boolean
```

**Parameters:**

- `date` - Date to compare with

**Returns:** `true` if this date is before the specified date

**Example:**

```typescript
const date1 = new NepaliDate(2082, 9, 10);
const date2 = new NepaliDate(2082, 9, 15);
console.log(date1.isBefore(date2)); // true
```

---

### isEqual()

Checks if this date is exactly equal to the specified date (year, month, day).

```typescript
isEqual(date: NepaliDate): boolean
```

**Parameters:**

- `date` - Date to compare with

**Returns:** `true` if dates are equal

**Example:**

```typescript
const date1 = new NepaliDate(2082, 9, 15);
const date2 = new NepaliDate(2082, 9, 15);
console.log(date1.isEqual(date2)); // true
```

---

### isSame()

Checks if this date is the same as the specified date for the given unit.

```typescript
isSame(date: NepaliDate, unit: 'year' | 'month' | 'day'): boolean
```

**Parameters:**

- `date` - Date to compare with
- `unit` - Unit to compare ('year', 'month', or 'day')

**Returns:** `true` if dates are the same for the specified unit

**Example:**

```typescript
const date1 = new NepaliDate(2082, 9, 10);
const date2 = new NepaliDate(2082, 9, 20);

console.log(date1.isSame(date2, "year")); // true
console.log(date1.isSame(date2, "month")); // true
console.log(date1.isSame(date2, "day")); // false
```

---

## Date Range Methods

### startOfDay()

Returns a new NepaliDate set to the start of the current day (00:00:00).

```typescript
startOfDay(): NepaliDate
```

**Returns:** New NepaliDate at start of day

---

### endOfDay()

Returns a new NepaliDate set to the end of the current day (23:59:59.999).

```typescript
endOfDay(): NepaliDate
```

**Returns:** New NepaliDate at end of day

---

### startOfWeek()

Returns a new NepaliDate representing the start of the week.

```typescript
startOfWeek(startOfWeek: number = 0): NepaliDate
```

**Parameters:**

- `startOfWeek` - Day to consider as start of week (0-6, 0 = Sunday). Default: 0

**Returns:** New NepaliDate at start of week

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15); // Wednesday
const weekStart = date.startOfWeek(); // Previous Sunday
const weekStartMon = date.startOfWeek(1); // Previous Monday
```

---

### endOfWeek()

Returns a new NepaliDate representing the end of the week.

```typescript
endOfWeek(startOfWeek: number = 0): NepaliDate
```

**Parameters:**

- `startOfWeek` - Day to consider as start of week (0-6, 0 = Sunday). Default: 0

**Returns:** New NepaliDate at end of week

---

### startOfMonth()

Returns a new NepaliDate representing the first day of the month.

```typescript
startOfMonth(): NepaliDate
```

**Returns:** New NepaliDate at first day of month

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const monthStart = date.startOfMonth();
console.log(monthStart.format("YYYY-MM-DD")); // '2082-10-01'
```

---

### endOfMonth()

Returns a new NepaliDate representing the last day of the month.

```typescript
endOfMonth(): NepaliDate
```

**Returns:** New NepaliDate at last day of month

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const monthEnd = date.endOfMonth();
console.log(monthEnd.format("YYYY-MM-DD")); // '2082-10-29'
```

---

### startOfYear()

Returns a new NepaliDate representing the first day of the year (1st Baisakh).

```typescript
startOfYear(): NepaliDate
```

**Returns:** New NepaliDate at first day of year

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const yearStart = date.startOfYear();
console.log(yearStart.format("YYYY-MM-DD")); // '2082-01-01'
```

---

### endOfYear()

Returns a new NepaliDate representing the last day of the year (last day of Chaitra).

```typescript
endOfYear(): NepaliDate
```

**Returns:** New NepaliDate at last day of year

---

## Date Information Methods

### daysInMonth()

Returns the number of days in the current month.

```typescript
daysInMonth(): number
```

**Returns:** Number of days (29-32)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15); // Magh 2082
console.log(date.daysInMonth()); // 29
```

---

### isLeapYear()

Checks if the current year is a leap year in the Nepali calendar.

```typescript
isLeapYear(): boolean
```

**Returns:** `true` if leap year

---

### getWeeksInMonth()

Calculates the number of weeks in the current month.

```typescript
getWeeksInMonth(): number
```

**Returns:** Number of weeks

---

## Quarter Methods

### getCurrentQuarter()

Returns the quarter number (1-4) for the current date.

```typescript
getCurrentQuarter(): number
```

**Returns:** Quarter number (1-4)

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15); // Magh = Q4
console.log(date.getCurrentQuarter()); // 4
```

---

### getCurrentFiscalYearQuarter()

Returns the current fiscal year quarter number (1-4).

```typescript
getCurrentFiscalYearQuarter(): number
```

**Returns:** Fiscal year quarter number (1-4)

::: info Fiscal Year
Nepal's fiscal year starts from Shrawan 1st (month index 3). So:

- Q1: Shrawan - Ashwin (months 3-5)
- Q2: Kartik - Poush (months 6-8)
- Q3: Magh - Chaitra (months 9-11)
- Q4: Baisakh - Asar (months 0-2)
  :::

---

### getCurrentFiscalYearQuarterDates()

Returns the start and end dates of the current fiscal year quarter.

```typescript
getCurrentFiscalYearQuarterDates(): { start: NepaliDate; end: NepaliDate }
```

**Returns:** Object with `start` and `end` NepaliDate instances

---

## Utility Methods

### clone()

Creates a copy of the current NepaliDate instance.

```typescript
clone(): NepaliDate
```

**Returns:** New NepaliDate with same date and time

**Example:**

```typescript
const date = new NepaliDate(2082, 9, 15);
const copy = date.clone();
copy.setDate(20);
console.log(date.getDate()); // 15 (unchanged)
console.log(copy.getDate()); // 20
```

---

### isValid() (Instance)

Checks if the current NepaliDate instance contains a valid date.

```typescript
isValid(): boolean
```

**Returns:** `true` if valid
