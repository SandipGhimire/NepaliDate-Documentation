# Examples

This section provides practical code examples for common tasks with the Nepali Date Library.

## Quick Navigation

| Category                      | Description                    |
| ----------------------------- | ------------------------------ |
| [Basic Usage](#basic-usage)   | Creating dates, getting values |
| [Formatting](#formatting)     | English and Nepali formatting  |
| [Conversion](#conversion)     | AD ↔ BS conversion             |
| [Manipulation](#manipulation) | Adding/subtracting time        |
| [Comparison](#comparison)     | Comparing dates                |
| [Quarters](#quarters)         | Working with quarters          |
| [Fiscal Year](#fiscal-year)   | Fiscal year operations         |
| [Calendar](#calendar)         | Building calendars             |

---

## Basic Usage {#basic-usage}

### Create Dates

```typescript
import { NepaliDate } from "nepali-date-library";

// Current date
const today = new NepaliDate();

// From year, month (0-indexed), day
const date1 = new NepaliDate(2082, 9, 15); // Magh 15, 2082

// From string
const date2 = new NepaliDate("2082-10-15");

// From JavaScript Date
const date3 = new NepaliDate(new Date("2026-01-14"));

// Clone
const date4 = today.clone();
```

### Get Date Components

```typescript
const date = new NepaliDate(2082, 9, 15);

console.log(date.getYear()); // 2082
console.log(date.getMonth()); // 9 (Magh)
console.log(date.getDate()); // 15
console.log(date.getDay()); // 3 (Wednesday)
console.log(date.toString()); // '2082/10/15'
```

---

## Formatting {#formatting}

### English Format

```typescript
const date = new NepaliDate(2082, 9, 15);

console.log(date.format("YYYY-MM-DD")); // '2082-10-15'
console.log(date.format("YYYY/MM/DD")); // '2082/10/15'
console.log(date.format("MMM D, YYYY")); // 'Mag 15, 2082'
console.log(date.format("MMMM DD, YYYY")); // 'Magh 15, 2082'
console.log(date.format("DDDD")); // 'Wednesday'
console.log(date.format("DDDD, MMMM DD")); // 'Wednesday, Magh 15'
```

### Nepali Format

```typescript
const date = new NepaliDate(2082, 9, 15);

console.log(date.format("yyyy-mm-dd")); // '२०८२-१०-१५'
console.log(date.format("mmmm dd, yyyy")); // 'माघ १५, २०८२'
console.log(date.format("dddd")); // 'बुधबार'
console.log(date.format("dddd, mmmm dd")); // 'बुधबार, माघ १५'
```

### Mixed Format

```typescript
const date = new NepaliDate(2082, 9, 15);

// English date, Nepali day name
console.log(date.format("MMMM DD, YYYY (dddd)"));
// 'Magh 15, 2082 (बुधबार)'

// Nepali date, English day name
console.log(date.format("mmmm dd, yyyy (DDDD)"));
// 'माघ १५, २०८२ (Wednesday)'
```

---

## Conversion {#conversion}

### AD to BS

```typescript
import { ADtoBS } from "nepali-date-library";

console.log(ADtoBS("2026-01-14")); // '2082-10-01'
console.log(ADtoBS("2024-04-14")); // '2081-01-01' (New Year)
console.log(ADtoBS("2025-12-25")); // '2082-09-10'
```

### BS to AD

```typescript
import { BStoAD } from "nepali-date-library";

console.log(BStoAD("2082-10-01")); // '2026-01-14'
console.log(BStoAD("2082-01-01")); // '2025-04-14' (New Year)
console.log(BStoAD("2081-12-30")); // '2025-04-13'
```

### Using NepaliDate Class

```typescript
import { NepaliDate } from "nepali-date-library";

// AD to BS
const adDate = new Date("2026-01-14");
const bsDate = new NepaliDate(adDate);
console.log(bsDate.format("YYYY-MM-DD")); // '2082-10-01'

// BS to AD
const nepaliDate = new NepaliDate("2082-10-01");
const englishDate = nepaliDate.getEnglishDate();
console.log(englishDate.toISOString().split("T")[0]); // '2026-01-14'
```

---

## Manipulation {#manipulation}

### Add Days

```typescript
const date = new NepaliDate(2082, 9, 15);

const tomorrow = date.addDays(1);
console.log(tomorrow.format("YYYY-MM-DD")); // '2082-10-16'

const nextWeek = date.addDays(7);
console.log(nextWeek.format("YYYY-MM-DD")); // '2082-10-22'

const yesterday = date.addDays(-1);
console.log(yesterday.format("YYYY-MM-DD")); // '2082-10-14'
```

### Add Months

```typescript
const date = new NepaliDate(2082, 9, 15);

const nextMonth = date.addMonths(1);
console.log(nextMonth.format("MMMM YYYY")); // 'Falgun 2082'

const threeMonthsAgo = date.addMonths(-3);
console.log(threeMonthsAgo.format("MMMM YYYY")); // 'Kartik 2082'
```

### Add Years

```typescript
const date = new NepaliDate(2082, 9, 15);

const nextYear = date.addYears(1);
console.log(nextYear.format("YYYY")); // '2083'

const fiveYearsAgo = date.addYears(-5);
console.log(fiveYearsAgo.format("YYYY")); // '2077'
```

---

## Comparison {#comparison}

### Compare Dates

```typescript
const date1 = new NepaliDate(2082, 9, 10);
const date2 = new NepaliDate(2082, 9, 20);

console.log(date1.isBefore(date2)); // true
console.log(date1.isAfter(date2)); // false
console.log(date1.isEqual(date2)); // false

const date3 = new NepaliDate(2082, 9, 10);
console.log(date1.isEqual(date3)); // true
```

### Compare by Unit

```typescript
const date1 = new NepaliDate(2082, 9, 10);
const date2 = new NepaliDate(2082, 9, 20);

console.log(date1.isSame(date2, "year")); // true
console.log(date1.isSame(date2, "month")); // true
console.log(date1.isSame(date2, "day")); // false
```

### Calculate Difference

```typescript
const date1 = new NepaliDate(2082, 0, 1); // Baisakh 1
const date2 = new NepaliDate(2082, 11, 30); // Chaitra 30

console.log(date1.diff(date2, "day")); // ~365 days
console.log(date1.diff(date2, "month")); // 11
console.log(date1.diff(date2, "year")); // 0
```

---

## Quarters {#quarters}

### Get Current Quarter

```typescript
const date = new NepaliDate(2082, 9, 15);
const quarter = date.getCurrentQuarter();
console.log(`Quarter: Q${quarter}`); // Q4 (Magh is in Q4)
```

### Get Quarter Dates

```typescript
const q1 = NepaliDate.getQuarter(1, 2082);
console.log(`Q1 Start: ${q1.start.format("MMMM DD")}`); // Baisakh 01
console.log(`Q1 End: ${q1.end.format("MMMM DD")}`); // Asar 30/31
```

### Get All Quarters

```typescript
const quarters = NepaliDate.getQuarters(2082);

Object.entries(quarters).forEach(([key, value]) => {
  console.log(
    `${key}: ${value.start.format("MMM")} - ${value.end.format("MMM YYYY")}`,
  );
});
// Q1: Bai - Asa 2082
// Q2: Shr - Asw 2082
// Q3: Kar - Pou 2082
// Q4: Mag - Cha 2082
```

---

## Fiscal Year {#fiscal-year}

### Current Fiscal Year

```typescript
const fy = NepaliDate.getCurrentFiscalYear();
console.log(`Fiscal Year: ${fy}/${fy + 1}`); // 2081/82
```

### Fiscal Quarter

```typescript
const date = new NepaliDate();
const fq = date.getCurrentFiscalYearQuarter();
console.log(`Fiscal Quarter: FQ${fq}`);
```

### Fiscal Year Quarters

```typescript
const fyQuarters = NepaliDate.getFiscalYearQuarters(2081);

console.log("FY 2081/82:");
console.log(
  `  FQ1: ${fyQuarters.Q1.start.format("MMM YYYY")} - ${fyQuarters.Q1.end.format("MMM YYYY")}`,
);
console.log(
  `  FQ2: ${fyQuarters.Q2.start.format("MMM YYYY")} - ${fyQuarters.Q2.end.format("MMM YYYY")}`,
);
console.log(
  `  FQ3: ${fyQuarters.Q3.start.format("MMM YYYY")} - ${fyQuarters.Q3.end.format("MMM YYYY")}`,
);
console.log(
  `  FQ4: ${fyQuarters.Q4.start.format("MMM YYYY")} - ${fyQuarters.Q4.end.format("MMM YYYY")}`,
);
```

---

## Calendar {#calendar}

### Generate Calendar

```typescript
const calendar = NepaliDate.getCalendarDays(2082, 9);

console.log("Previous month days:", calendar.prevMonth.days);
console.log("Current month days:", calendar.currentMonth.days);
console.log("Next month days:", calendar.nextMonth.days);
```

### Simple Calendar Display

```typescript
import { NepaliDate, WEEK_SHORT_EN } from "nepali-date-library";

function printCalendar(year: number, month: number): void {
  const date = new NepaliDate(year, month, 1);
  const calendar = NepaliDate.getCalendarDays(year, month);

  console.log(`\n  ${date.format("MMMM YYYY")}`);
  console.log(" " + WEEK_SHORT_EN.join(" "));

  const allDays = [
    ...calendar.prevMonth.days.map((d) => `(${d})`),
    ...calendar.currentMonth.days.map((d) => d.toString().padStart(3)),
    ...calendar.nextMonth.days.map((d) => `(${d})`),
  ];

  for (let i = 0; i < allDays.length; i += 7) {
    console.log(allDays.slice(i, i + 7).join(" "));
  }
}

printCalendar(2082, 9); // Magh 2082
```
