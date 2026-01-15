# Date Ranges

Working with date ranges is essential for reports, filters, and period-based calculations. The library provides methods to get boundaries for days, weeks, months, and years.

## Day Boundaries

### Start and End of Day

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 15);

const dayStart = date.startOfDay();
console.log(dayStart.getHours()); // 0
console.log(dayStart.getMinutes()); // 0
console.log(dayStart.getSeconds()); // 0

const dayEnd = date.endOfDay();
console.log(dayEnd.getHours()); // 23
console.log(dayEnd.getMinutes()); // 59
console.log(dayEnd.getSeconds()); // 59
```

### Use Case: Filter Records for a Day

```typescript
import { NepaliDate } from "nepali-date-library";

interface Record {
  id: number;
  timestamp: number;
}

function getRecordsForDay(records: Record[], date: NepaliDate): Record[] {
  const start = date.startOfDay().getTime();
  const end = date.endOfDay().getTime();

  return records.filter((r) => r.timestamp >= start && r.timestamp <= end);
}
```

---

## Week Boundaries

### Start and End of Week

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 15); // Wednesday

// Default: Week starts on Sunday (0)
const weekStart = date.startOfWeek();
console.log(weekStart.format("DDDD, MMMM DD")); // Sunday, Magh 12

const weekEnd = date.endOfWeek();
console.log(weekEnd.format("DDDD, MMMM DD")); // Saturday, Magh 18
```

### Custom Week Start (Monday)

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 15); // Wednesday

// Week starts on Monday (1)
const weekStartMon = date.startOfWeek(1);
console.log(weekStartMon.format("DDDD, MMMM DD")); // Monday, Magh 13

const weekEndMon = date.endOfWeek(1);
console.log(weekEndMon.format("DDDD, MMMM DD")); // Sunday, Magh 19
```

### Get Week Range

```typescript
import { NepaliDate } from "nepali-date-library";

interface WeekRange {
  start: NepaliDate;
  end: NepaliDate;
  label: string;
}

function getCurrentWeek(startOfWeek: number = 0): WeekRange {
  const today = new NepaliDate();
  const start = today.startOfWeek(startOfWeek);
  const end = today.endOfWeek(startOfWeek);

  return {
    start,
    end,
    label: `${start.format("MMM DD")} - ${end.format("MMM DD, YYYY")}`,
  };
}

const week = getCurrentWeek();
console.log(week.label); // 'Mag 12 - Mag 18, 2082'
```

---

## Month Boundaries

### Start and End of Month

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 15); // Magh 15

const monthStart = date.startOfMonth();
console.log(monthStart.format("YYYY-MM-DD")); // '2082-10-01'

const monthEnd = date.endOfMonth();
console.log(monthEnd.format("YYYY-MM-DD")); // '2082-10-29'
console.log(monthEnd.getDate()); // 29 (Magh 2082 has 29 days)
```

### Monthly Report Range

```typescript
import { NepaliDate } from "nepali-date-library";

interface MonthRange {
  year: number;
  month: number;
  monthName: string;
  start: NepaliDate;
  end: NepaliDate;
  totalDays: number;
}

function getMonthRange(year: number, month: number): MonthRange {
  const start = new NepaliDate(year, month, 1);
  const end = start.endOfMonth();

  return {
    year,
    month,
    monthName: NepaliDate.getMonthName(month),
    start,
    end,
    totalDays: end.getDate(),
  };
}

const range = getMonthRange(2082, 9);
console.log(`${range.monthName} ${range.year}`); // 'Magh 2082'
console.log(`${range.start.format("DD")} - ${range.end.format("DD")}`); // '01 - 29'
console.log(`Total days: ${range.totalDays}`); // 29
```

---

## Year Boundaries

### Start and End of Year

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 15);

const yearStart = date.startOfYear();
console.log(yearStart.format("MMMM DD, YYYY")); // 'Baisakh 01, 2082'

const yearEnd = date.endOfYear();
console.log(yearEnd.format("MMMM DD, YYYY")); // 'Chaitra 30, 2082' (or 31)
```

### Annual Report Range

```typescript
import { NepaliDate } from "nepali-date-library";

function getYearRange(year: number): { start: NepaliDate; end: NepaliDate } {
  const start = new NepaliDate(year, 0, 1); // Baisakh 1
  const end = start.endOfYear(); // Last day of Chaitra

  return { start, end };
}

const year2082 = getYearRange(2082);
console.log(`Year: ${year2082.start.format("YYYY")}`);
console.log(
  `Range: ${year2082.start.format("MMMM DD")} - ${year2082.end.format("MMMM DD")}`,
);
```

---

## Custom Date Ranges

### Get Last N Days

```typescript
import { NepaliDate } from "nepali-date-library";

interface DateRange {
  start: NepaliDate;
  end: NepaliDate;
}

function getLastNDays(n: number): DateRange {
  const end = new NepaliDate();
  const start = end.addDays(-(n - 1));

  return { start, end };
}

const last7Days = getLastNDays(7);
console.log(
  `Last 7 days: ${last7Days.start.format("MMM DD")} - ${last7Days.end.format("MMM DD")}`,
);

const last30Days = getLastNDays(30);
console.log(
  `Last 30 days: ${last30Days.start.format("MMM DD")} - ${last30Days.end.format("MMM DD")}`,
);
```

### Get Last N Months

```typescript
import { NepaliDate } from "nepali-date-library";

function getLastNMonths(n: number): { start: NepaliDate; end: NepaliDate } {
  const today = new NepaliDate();
  const end = today.endOfMonth();
  const start = today.addMonths(-(n - 1)).startOfMonth();

  return { start, end };
}

const last3Months = getLastNMonths(3);
console.log(
  `Last 3 months: ${last3Months.start.format("MMM YYYY")} - ${last3Months.end.format("MMM YYYY")}`,
);
```

### Get Date Range Between Two Dates

```typescript
import { NepaliDate } from "nepali-date-library";

function getDatesBetween(
  startDate: NepaliDate,
  endDate: NepaliDate,
): NepaliDate[] {
  const dates: NepaliDate[] = [];
  let current = startDate.clone();

  while (!current.isAfter(endDate)) {
    dates.push(current.clone());
    current = current.addDays(1);
  }

  return dates;
}

const start = new NepaliDate(2082, 9, 1);
const end = new NepaliDate(2082, 9, 7);
const dates = getDatesBetween(start, end);

dates.forEach((d) => console.log(d.format("YYYY-MM-DD")));
// 2082-10-01, 2082-10-02, ..., 2082-10-07
```

---

## Period Presets

### Common Report Periods

```typescript
import { NepaliDate } from "nepali-date-library";

type PeriodPreset =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "lastYear";

interface DateRange {
  start: NepaliDate;
  end: NepaliDate;
  label: string;
}

function getDateRangePreset(preset: PeriodPreset): DateRange {
  const today = new NepaliDate();

  switch (preset) {
    case "today":
      return {
        start: today.startOfDay(),
        end: today.endOfDay(),
        label: "Today",
      };

    case "yesterday": {
      const yesterday = today.addDays(-1);
      return {
        start: yesterday.startOfDay(),
        end: yesterday.endOfDay(),
        label: "Yesterday",
      };
    }

    case "thisWeek":
      return {
        start: today.startOfWeek(),
        end: today.endOfWeek(),
        label: "This Week",
      };

    case "lastWeek": {
      const lastWeek = today.addDays(-7);
      return {
        start: lastWeek.startOfWeek(),
        end: lastWeek.endOfWeek(),
        label: "Last Week",
      };
    }

    case "thisMonth":
      return {
        start: today.startOfMonth(),
        end: today.endOfMonth(),
        label: today.format("MMMM YYYY"),
      };

    case "lastMonth": {
      const lastMonth = today.addMonths(-1);
      return {
        start: lastMonth.startOfMonth(),
        end: lastMonth.endOfMonth(),
        label: lastMonth.format("MMMM YYYY"),
      };
    }

    case "thisYear":
      return {
        start: today.startOfYear(),
        end: today.endOfYear(),
        label: `Year ${today.getYear()}`,
      };

    case "lastYear": {
      const lastYear = today.addYears(-1);
      return {
        start: lastYear.startOfYear(),
        end: lastYear.endOfYear(),
        label: `Year ${lastYear.getYear()}`,
      };
    }
  }
}

// Usage
const thisMonth = getDateRangePreset("thisMonth");
console.log(
  `${thisMonth.label}: ${thisMonth.start.format("DD")} - ${thisMonth.end.format("DD")}`,
);
```

---

## Overlapping Ranges

### Check if Date is in Range

```typescript
import { NepaliDate } from "nepali-date-library";

function isDateInRange(
  date: NepaliDate,
  start: NepaliDate,
  end: NepaliDate,
): boolean {
  return !date.isBefore(start) && !date.isAfter(end);
}

const date = new NepaliDate(2082, 9, 15);
const start = new NepaliDate(2082, 9, 1);
const end = new NepaliDate(2082, 9, 30);

console.log(isDateInRange(date, start, end)); // true
```

### Check if Ranges Overlap

```typescript
import { NepaliDate } from "nepali-date-library";

interface Range {
  start: NepaliDate;
  end: NepaliDate;
}

function doRangesOverlap(range1: Range, range2: Range): boolean {
  return (
    !range1.end.isBefore(range2.start) && !range2.end.isBefore(range1.start)
  );
}

const range1 = {
  start: new NepaliDate(2082, 9, 1),
  end: new NepaliDate(2082, 9, 15),
};

const range2 = {
  start: new NepaliDate(2082, 9, 10),
  end: new NepaliDate(2082, 9, 25),
};

console.log(doRangesOverlap(range1, range2)); // true
```
