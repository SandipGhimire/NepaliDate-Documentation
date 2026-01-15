# Fiscal Year Operations

Nepal's fiscal year starts on **Shrawan 1st** (mid-July) and ends on **Asar end** (mid-July of the next year). The library provides comprehensive support for fiscal year calculations.

## Understanding Nepal's Fiscal Year

| Fiscal Year | Start Date (BS) | End Date (BS) | Approximate AD Range |
| ----------- | --------------- | ------------- | -------------------- |
| FY 2080/81  | 2080 Shrawan 1  | 2081 Asar 31  | Jul 2023 - Jul 2024  |
| FY 2081/82  | 2081 Shrawan 1  | 2082 Asar 30  | Jul 2024 - Jul 2025  |
| FY 2082/83  | 2082 Shrawan 1  | 2083 Asar 30  | Jul 2025 - Jul 2026  |

### Fiscal Quarters

| Quarter | Months          | Month Indices            |
| ------- | --------------- | ------------------------ |
| FQ1     | Shrawan - Aswin | 3-5                      |
| FQ2     | Kartik - Poush  | 6-8                      |
| FQ3     | Magh - Chaitra  | 9-11                     |
| FQ4     | Baisakh - Asar  | 0-2 (next calendar year) |

---

## Getting Current Fiscal Year

```typescript
import { NepaliDate } from "nepali-date-library";

// Get current fiscal year
const currentFY = NepaliDate.getCurrentFiscalYear();
console.log(`Current Fiscal Year: ${currentFY}/${currentFY + 1}`);
// Output: Current Fiscal Year: 2081/82

// Check fiscal year for a specific date
const date = new NepaliDate(2082, 9, 15); // Magh 2082
// This is still in FY 2081/82 (since FY runs Shrawan to Asar)
```

---

## Fiscal Year Quarters

### Get Current Quarter

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 15); // Magh 15, 2082

// Get fiscal quarter (1-4)
const quarter = date.getCurrentFiscalYearQuarter();
console.log(`Fiscal Quarter: Q${quarter}`); // Q3 (Magh is in Q3)
```

### Get Quarter Date Range

```typescript
import { NepaliDate } from "nepali-date-library";

// Get dates for a specific fiscal quarter
const q1 = NepaliDate.getFiscalYearQuarter(1, 2081);
console.log("FQ1 2081/82:");
console.log(`  Start: ${q1.start.format("MMMM DD, YYYY")}`); // Shrawan 01, 2081
console.log(`  End: ${q1.end.format("MMMM DD, YYYY")}`); // Aswin end, 2081

const q4 = NepaliDate.getFiscalYearQuarter(4, 2081);
console.log("FQ4 2081/82:");
console.log(`  Start: ${q4.start.format("MMMM DD, YYYY")}`); // Baisakh 01, 2082
console.log(`  End: ${q4.end.format("MMMM DD, YYYY")}`); // Asar end, 2082
```

### Get All Quarters for a Fiscal Year

```typescript
import { NepaliDate } from "nepali-date-library";

const fyQuarters = NepaliDate.getFiscalYearQuarters(2081);

console.log("Fiscal Year 2081/82 Quarters:");
console.log(
  `Q1: ${fyQuarters.Q1.start.format("MMM YYYY")} - ${fyQuarters.Q1.end.format("MMM YYYY")}`,
);
console.log(
  `Q2: ${fyQuarters.Q2.start.format("MMM YYYY")} - ${fyQuarters.Q2.end.format("MMM YYYY")}`,
);
console.log(
  `Q3: ${fyQuarters.Q3.start.format("MMM YYYY")} - ${fyQuarters.Q3.end.format("MMM YYYY")}`,
);
console.log(
  `Q4: ${fyQuarters.Q4.start.format("MMM YYYY")} - ${fyQuarters.Q4.end.format("MMM YYYY")}`,
);
```

---

## Financial Reporting

### Generate Fiscal Year Report Header

```typescript
import { NepaliDate } from "nepali-date-library";

interface FiscalYearInfo {
  fiscalYear: string;
  startDate: NepaliDate;
  endDate: NepaliDate;
  currentQuarter: number;
  quarterProgress: string;
}

function getFiscalYearInfo(): FiscalYearInfo {
  const fy = NepaliDate.getCurrentFiscalYear();
  const quarters = NepaliDate.getFiscalYearQuarters(fy);
  const today = new NepaliDate();
  const currentQuarter = today.getCurrentFiscalYearQuarter();

  // Calculate quarter progress
  const qDates = today.getCurrentFiscalYearQuarterDates();
  const totalDays = qDates.start.diff(qDates.end, "day") * -1;
  const daysElapsed = qDates.start.diff(today, "day") * -1;
  const progress = Math.round((daysElapsed / totalDays) * 100);

  return {
    fiscalYear: `${fy}/${String(fy + 1).slice(-2)}`,
    startDate: quarters.Q1.start,
    endDate: quarters.Q4.end,
    currentQuarter,
    quarterProgress: `${progress}%`,
  };
}

const info = getFiscalYearInfo();
console.log(`Fiscal Year: ${info.fiscalYear}`);
console.log(
  `Current Quarter: Q${info.currentQuarter} (${info.quarterProgress} complete)`,
);
```

### Quarterly Report Dates

```typescript
import { NepaliDate } from "nepali-date-library";

interface QuarterlyReport {
  quarter: string;
  reportingPeriod: string;
  startDate: string;
  endDate: string;
  dueDate: string;
}

function getQuarterlyReportDates(fiscalYear: number): QuarterlyReport[] {
  const quarters = NepaliDate.getFiscalYearQuarters(fiscalYear);

  return [
    {
      quarter: "Q1",
      reportingPeriod: "Shrawan - Aswin",
      startDate: quarters.Q1.start.format("YYYY-MM-DD"),
      endDate: quarters.Q1.end.format("YYYY-MM-DD"),
      dueDate: quarters.Q1.end.addDays(25).format("YYYY-MM-DD"), // 25 days after quarter end
    },
    {
      quarter: "Q2",
      reportingPeriod: "Kartik - Poush",
      startDate: quarters.Q2.start.format("YYYY-MM-DD"),
      endDate: quarters.Q2.end.format("YYYY-MM-DD"),
      dueDate: quarters.Q2.end.addDays(25).format("YYYY-MM-DD"),
    },
    {
      quarter: "Q3",
      reportingPeriod: "Magh - Chaitra",
      startDate: quarters.Q3.start.format("YYYY-MM-DD"),
      endDate: quarters.Q3.end.format("YYYY-MM-DD"),
      dueDate: quarters.Q3.end.addDays(25).format("YYYY-MM-DD"),
    },
    {
      quarter: "Q4",
      reportingPeriod: "Baisakh - Asar",
      startDate: quarters.Q4.start.format("YYYY-MM-DD"),
      endDate: quarters.Q4.end.format("YYYY-MM-DD"),
      dueDate: quarters.Q4.end.addDays(25).format("YYYY-MM-DD"),
    },
  ];
}

const reports = getQuarterlyReportDates(2081);
console.table(reports);
```

---

## Tax Period Calculations

### Check if Date is in Fiscal Year

```typescript
import { NepaliDate } from "nepali-date-library";

function isInFiscalYear(date: NepaliDate, fiscalYear: number): boolean {
  const quarters = NepaliDate.getFiscalYearQuarters(fiscalYear);
  const fyStart = quarters.Q1.start;
  const fyEnd = quarters.Q4.end;

  return !date.isBefore(fyStart) && !date.isAfter(fyEnd);
}

const date = new NepaliDate(2082, 3, 15); // Shrawan 15, 2082
console.log(isInFiscalYear(date, 2081)); // false (this is FY 2082/83)
console.log(isInFiscalYear(date, 2082)); // true
```

### Get Fiscal Year for Any Date

```typescript
import { NepaliDate } from "nepali-date-library";

function getFiscalYearForDate(date: NepaliDate): number {
  const month = date.getMonth();
  const year = date.getYear();

  // If month is Shrawan (3) or later, FY starts in current calendar year
  // If month is before Shrawan (0-2), FY started in previous calendar year
  if (month >= 3) {
    return year;
  } else {
    return year - 1;
  }
}

console.log(getFiscalYearForDate(new NepaliDate(2082, 9, 15))); // 2081 (Magh is FQ3 of 2081/82)
console.log(getFiscalYearForDate(new NepaliDate(2082, 1, 15))); // 2081 (Jestha is FQ4 of 2081/82)
console.log(getFiscalYearForDate(new NepaliDate(2082, 4, 15))); // 2082 (Bhadra is FQ1 of 2082/83)
```

---

## Remaining Days Calculations

### Days Remaining in Fiscal Year

```typescript
import { NepaliDate } from "nepali-date-library";

function daysRemainingInFiscalYear(): number {
  const today = new NepaliDate();
  const fy = NepaliDate.getCurrentFiscalYear();
  const quarters = NepaliDate.getFiscalYearQuarters(fy);
  const fyEnd = quarters.Q4.end;

  return today.diff(fyEnd, "day") * -1;
}

console.log(`Days remaining in FY: ${daysRemainingInFiscalYear()}`);
```

### Days Remaining in Quarter

```typescript
import { NepaliDate } from "nepali-date-library";

function daysRemainingInQuarter(): number {
  const today = new NepaliDate();
  const qDates = today.getCurrentFiscalYearQuarterDates();

  return today.diff(qDates.end, "day") * -1;
}

console.log(`Days remaining in quarter: ${daysRemainingInQuarter()}`);
```

---

## Fiscal Year Comparison

### Compare Period Across Fiscal Years

```typescript
import { NepaliDate } from "nepali-date-library";

interface PeriodComparison {
  currentFY: { start: string; end: string };
  previousFY: { start: string; end: string };
}

function getComparablePeriods(quarter: 1 | 2 | 3 | 4): PeriodComparison {
  const currentFY = NepaliDate.getCurrentFiscalYear();
  const previousFY = currentFY - 1;

  const currentQ = NepaliDate.getFiscalYearQuarter(quarter, currentFY);
  const previousQ = NepaliDate.getFiscalYearQuarter(quarter, previousFY);

  return {
    currentFY: {
      start: currentQ.start.format("YYYY-MM-DD"),
      end: currentQ.end.format("YYYY-MM-DD"),
    },
    previousFY: {
      start: previousQ.start.format("YYYY-MM-DD"),
      end: previousQ.end.format("YYYY-MM-DD"),
    },
  };
}

const q2Comparison = getComparablePeriods(2);
console.log("Q2 This Year:", q2Comparison.currentFY);
console.log("Q2 Last Year:", q2Comparison.previousFY);
```

---

## UI Component Example

### Fiscal Year Period Selector

```typescript
import { NepaliDate } from "nepali-date-library";

interface FiscalPeriod {
  value: string;
  label: string;
  start: NepaliDate;
  end: NepaliDate;
}

function getFiscalPeriodOptions(fiscalYear: number): FiscalPeriod[] {
  const quarters = NepaliDate.getFiscalYearQuarters(fiscalYear);

  return [
    {
      value: "full",
      label: `Full Year ${fiscalYear}/${fiscalYear + 1}`,
      start: quarters.Q1.start,
      end: quarters.Q4.end,
    },
    {
      value: "q1",
      label: "Q1 (Shrawan - Aswin)",
      start: quarters.Q1.start,
      end: quarters.Q1.end,
    },
    {
      value: "q2",
      label: "Q2 (Kartik - Poush)",
      start: quarters.Q2.start,
      end: quarters.Q2.end,
    },
    {
      value: "q3",
      label: "Q3 (Magh - Chaitra)",
      start: quarters.Q3.start,
      end: quarters.Q3.end,
    },
    {
      value: "q4",
      label: "Q4 (Baisakh - Asar)",
      start: quarters.Q4.start,
      end: quarters.Q4.end,
    },
    {
      value: "h1",
      label: "First Half (Q1 + Q2)",
      start: quarters.Q1.start,
      end: quarters.Q2.end,
    },
    {
      value: "h2",
      label: "Second Half (Q3 + Q4)",
      start: quarters.Q3.start,
      end: quarters.Q4.end,
    },
  ];
}

const options = getFiscalPeriodOptions(2081);
options.forEach((opt) => {
  console.log(
    `${opt.label}: ${opt.start.format("MMM DD")} - ${opt.end.format("MMM DD")}`,
  );
});
```
