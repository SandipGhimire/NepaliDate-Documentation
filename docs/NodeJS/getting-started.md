# Getting Started

## Installation

Install the library using your preferred package manager:

::: code-group

```bash [npm]
npm install nepali-date-library
```

```bash [yarn]
yarn add nepali-date-library
```

```bash [pnpm]
pnpm add nepali-date-library
```

:::

## Importing

### ES Modules (Recommended)

```typescript
import { NepaliDate, ADtoBS, BStoAD } from "nepali-date-library";
```

### CommonJS

```javascript
const { NepaliDate, ADtoBS, BStoAD } = require("nepali-date-library");
```

### Import Specific Utilities

You can also import specific constants if needed:

```typescript
import {
  NepaliDate,
  ADtoBS,
  BStoAD,
  // Constants
  MONTH_EN,
  MONTH_NP,
  MONTH_SHORT_EN,
  MONTH_SHORT_NP,
  WEEK_EN,
  WEEK_NP,
  WEEK_SHORT_EN,
  WEEK_SHORT_NP,
  NUMBER_NP,
  NEPALI_DATE_MAP,
} from "nepali-date-library";
```

## Quick Start

### Creating a NepaliDate

There are multiple ways to create a `NepaliDate` instance:

```typescript
// Current date and time
const today = new NepaliDate();

// From JavaScript Date object
const fromDate = new NepaliDate(new Date());

// From year, month (0-indexed), day
const specific = new NepaliDate(2082, 9, 15); // Magh 15, 2082

// From date string (YYYY-MM-DD format)
const fromString = new NepaliDate("2082-10-01");

// From timestamp
const fromTimestamp = new NepaliDate(Date.now());

// Clone another NepaliDate
const clone = new NepaliDate(today);
```

::: warning Month is 0-indexed
When creating a date with year, month, and day, the month is **0-indexed** (0 = Baisakh, 11 = Chaitra), similar to JavaScript's Date object.
:::

### Date Conversion

```typescript
import { ADtoBS, BStoAD } from "nepali-date-library";

// Convert AD (Gregorian) to BS (Nepali)
const bsDate = ADtoBS("2026-01-14");
console.log(bsDate); // '2082-10-01'

// Convert BS (Nepali) to AD (Gregorian)
const adDate = BStoAD("2082-10-01");
console.log(adDate); // '2026-01-14'

// Using NepaliDate class
const nepaliDate = new NepaliDate();
const englishDate = nepaliDate.getEnglishDate(); // Returns JavaScript Date object
```

### Formatting Dates

```typescript
const date = new NepaliDate(2082, 9, 15);

// English format tokens (uppercase)
console.log(date.format("YYYY-MM-DD")); // 2082-10-15
console.log(date.format("MMMM DD, YYYY")); // Magh 15, 2082
console.log(date.format("MMM D, YYYY")); // Mag 15, 2082
console.log(date.format("DDDD")); // Wednesday

// Nepali format tokens (lowercase)
console.log(date.format("yyyy-mm-dd")); // २०८२-१०-१५
console.log(date.format("mmmm dd, yyyy")); // माघ १५, २०८२
console.log(date.format("dddd")); // बुधबार
```

### Date Manipulation

```typescript
const date = new NepaliDate(2082, 9, 15);

// Add days, months, or years (returns new instance)
const tomorrow = date.addDays(1);
const nextMonth = date.addMonths(1);
const nextYear = date.addYears(1);

// Go backwards with negative values
const yesterday = date.addDays(-1);
const lastMonth = date.addMonths(-1);
```

### Date Comparison

```typescript
const date1 = new NepaliDate(2082, 5, 10);
const date2 = new NepaliDate(2082, 5, 20);

// Comparison methods
console.log(date1.isBefore(date2)); // true
console.log(date1.isAfter(date2)); // false
console.log(date1.isEqual(date2)); // false

// Check if same year/month/day
console.log(date1.isSame(date2, "year")); // true
console.log(date1.isSame(date2, "month")); // true
console.log(date1.isSame(date2, "day")); // false

// Calculate difference
console.log(date1.diff(date2, "day")); // -10
console.log(date1.diff(date2, "month")); // 0
```

## TypeScript Support

The library is written in TypeScript and includes full type definitions. You get complete IntelliSense support in VS Code and other TypeScript-aware editors.

```typescript
import { NepaliDate } from "nepali-date-library";

const date: NepaliDate = new NepaliDate();

// All methods are fully typed
const year: number = date.getYear();
const formatted: string = date.format("YYYY-MM-DD");
const isValid: boolean = date.isValid();
```

## Quick Reference

### Most Used Methods

| Method           | Description                  | Example                     |
| ---------------- | ---------------------------- | --------------------------- |
| `getYear()`      | Get Nepali year              | `date.getYear()` → `2082`   |
| `getMonth()`     | Get Nepali month (0-11)      | `date.getMonth()` → `9`     |
| `getDate()`      | Get Nepali day               | `date.getDate()` → `15`     |
| `format(str)`    | Format date as string        | `date.format('YYYY-MM-DD')` |
| `addDays(n)`     | Add n days                   | `date.addDays(7)`           |
| `addMonths(n)`   | Add n months                 | `date.addMonths(1)`         |
| `addYears(n)`    | Add n years                  | `date.addYears(1)`          |
| `isBefore(date)` | Check if before another date | `date1.isBefore(date2)`     |
| `isAfter(date)`  | Check if after another date  | `date1.isAfter(date2)`      |
| `clone()`        | Create a copy                | `date.clone()`              |

### Conversion Functions

| Function      | Description      | Example                                 |
| ------------- | ---------------- | --------------------------------------- |
| `ADtoBS(str)` | Convert AD to BS | `ADtoBS('2026-01-14')` → `'2082-10-01'` |
| `BStoAD(str)` | Convert BS to AD | `BStoAD('2082-10-01')` → `'2026-01-14'` |
