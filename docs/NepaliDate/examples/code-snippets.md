# Code Snippets

A comprehensive collection of copy-paste ready code snippets for common tasks.

## Table of Contents

[[toc]]

---

## Date Creation

### All Ways to Create a NepaliDate

```typescript
import { NepaliDate } from "nepali-date-library";

// 1. Current date and time
const now = new NepaliDate();

// 2. From year, month (0-indexed), day
const specific = new NepaliDate(2082, 9, 15);

// 3. From date string
const fromString = new NepaliDate("2082-10-15");
const fromSlash = new NepaliDate("2082/10/15");
const fromDot = new NepaliDate("2082.10.15");

// 4. From JavaScript Date
const fromJsDate = new NepaliDate(new Date());
const fromSpecificDate = new NepaliDate(new Date("2026-01-14"));

// 5. From timestamp
const fromTimestamp = new NepaliDate(Date.now());
const fromPastTimestamp = new NepaliDate(1736848800000);

// 6. From another NepaliDate (clone)
const original = new NepaliDate();
const copy = new NepaliDate(original);

// 7. Using clone method
const cloned = original.clone();
```

---

## Formatting Examples

### All Format Tokens

```typescript
const date = new NepaliDate(2082, 9, 15);

// === ENGLISH (UPPERCASE) ===

// Year
date.format("YYYY"); // '2082'
date.format("YY"); // '82'

// Month
date.format("MM"); // '10'
date.format("M"); // '10'
date.format("MMM"); // 'Mag'
date.format("MMMM"); // 'Magh'

// Day
date.format("DD"); // '15'
date.format("D"); // '15'
date.format("DDD"); // 'Wed'
date.format("DDDD"); // 'Wednesday'

// === NEPALI (LOWERCASE) ===

// Year
date.format("yyyy"); // '२०८२'
date.format("yy"); // '८२'

// Month
date.format("mm"); // '१०'
date.format("m"); // '१०'
date.format("mmm"); // 'मा'
date.format("mmmm"); // 'माघ'

// Day
date.format("dd"); // '१५'
date.format("d"); // '१५'
date.format("ddd"); // 'बुध'
date.format("dddd"); // 'बुधबार'
```

### Common Format Patterns

```typescript
const date = new NepaliDate(2082, 9, 15);

// ISO style
date.format("YYYY-MM-DD"); // '2082-10-15'

// Formal
date.format("MMMM DD, YYYY"); // 'Magh 15, 2082'

// With day name
date.format("DDDD, MMMM DD, YYYY"); // 'Wednesday, Magh 15, 2082'

// Short
date.format("MMM DD"); // 'Mag 15'

// Month and year only
date.format("MMMM YYYY"); // 'Magh 2082'

// Nepali formal
date.format("mmmm dd, yyyy"); // 'माघ १५, २०८२'

// Nepali with day
date.format("dddd, mmmm dd yyyy"); // 'बुधबार, माघ १५ २०८२'
```

---

## Date Conversion Snippets

### Complete Conversion Utility

```typescript
import { NepaliDate, ADtoBS, BStoAD } from "nepali-date-library";

class DateConverter {
  // AD string to BS string
  static adToBS(adDate: string): string {
    return ADtoBS(adDate);
  }

  // BS string to AD string
  static bsToAD(bsDate: string): string {
    return BStoAD(bsDate);
  }

  // JavaScript Date to NepaliDate
  static jsToNepali(date: Date): NepaliDate {
    return new NepaliDate(date);
  }

  // NepaliDate to JavaScript Date
  static nepaliToJs(nepaliDate: NepaliDate): Date {
    return nepaliDate.getEnglishDate();
  }

  // Timestamp to formatted Nepali date
  static timestampToNepali(
    timestamp: number,
    format: string = "YYYY-MM-DD",
  ): string {
    return new NepaliDate(timestamp).format(format);
  }

  // Safe conversion with fallback
  static safeADtoBS(adDate: string, fallback: string = ""): string {
    try {
      return ADtoBS(adDate);
    } catch {
      return fallback;
    }
  }
}

// Usage
console.log(DateConverter.adToBS("2026-01-14")); // '2082-10-01'
console.log(DateConverter.timestampToNepali(Date.now(), "MMMM DD, YYYY"));
```

---

## Date Manipulation Snippets

### Date Arithmetic Helper

```typescript
import { NepaliDate } from "nepali-date-library";

class DateMath {
  static addDays(date: NepaliDate, days: number): NepaliDate {
    return date.addDays(days);
  }

  static addWeeks(date: NepaliDate, weeks: number): NepaliDate {
    return date.addDays(weeks * 7);
  }

  static addMonths(date: NepaliDate, months: number): NepaliDate {
    return date.addMonths(months);
  }

  static addYears(date: NepaliDate, years: number): NepaliDate {
    return date.addYears(years);
  }

  // Get date N days ago
  static daysAgo(n: number): NepaliDate {
    return new NepaliDate().addDays(-n);
  }

  // Get date N days from now
  static daysFromNow(n: number): NepaliDate {
    return new NepaliDate().addDays(n);
  }

  // Get date N months ago
  static monthsAgo(n: number): NepaliDate {
    return new NepaliDate().addMonths(-n);
  }
}

// Usage
console.log(DateMath.daysAgo(7).format("YYYY-MM-DD"));
console.log(DateMath.daysFromNow(30).format("MMMM DD"));
```

---

## Date Comparison Snippets

### Complete Comparison Utility

```typescript
import { NepaliDate } from "nepali-date-library";

class DateCompare {
  // Check if date is today
  static isToday(date: NepaliDate): boolean {
    const today = new NepaliDate();
    return (
      date.isSame(today, "day") &&
      date.isSame(today, "month") &&
      date.isSame(today, "year")
    );
  }

  // Check if date is in the past
  static isPast(date: NepaliDate): boolean {
    return date.isBefore(new NepaliDate());
  }

  // Check if date is in the future
  static isFuture(date: NepaliDate): boolean {
    return date.isAfter(new NepaliDate());
  }

  // Check if date is in current month
  static isThisMonth(date: NepaliDate): boolean {
    const today = new NepaliDate();
    return date.isSame(today, "year") && date.isSame(today, "month");
  }

  // Check if date is in current year
  static isThisYear(date: NepaliDate): boolean {
    return date.isSame(new NepaliDate(), "year");
  }

  // Get the earlier of two dates
  static min(date1: NepaliDate, date2: NepaliDate): NepaliDate {
    return date1.isBefore(date2) ? date1 : date2;
  }

  // Get the later of two dates
  static max(date1: NepaliDate, date2: NepaliDate): NepaliDate {
    return date1.isAfter(date2) ? date1 : date2;
  }

  // Days between two dates
  static daysBetween(date1: NepaliDate, date2: NepaliDate): number {
    return Math.abs(date1.diff(date2, "day"));
  }
}

// Usage
const date = new NepaliDate(2082, 9, 15);
console.log(DateCompare.isToday(date)); // false
console.log(DateCompare.isThisYear(date)); // true
```

---

## Date Range Snippets

### Date Range Generator

```typescript
import { NepaliDate } from "nepali-date-library";

interface DateRange {
  start: NepaliDate;
  end: NepaliDate;
  label: string;
}

class DateRanges {
  static today(): DateRange {
    const today = new NepaliDate();
    return {
      start: today.startOfDay(),
      end: today.endOfDay(),
      label: "Today",
    };
  }

  static thisWeek(): DateRange {
    const today = new NepaliDate();
    return {
      start: today.startOfWeek(),
      end: today.endOfWeek(),
      label: "This Week",
    };
  }

  static thisMonth(): DateRange {
    const today = new NepaliDate();
    return {
      start: today.startOfMonth(),
      end: today.endOfMonth(),
      label: today.format("MMMM YYYY"),
    };
  }

  static thisYear(): DateRange {
    const today = new NepaliDate();
    return {
      start: today.startOfYear(),
      end: today.endOfYear(),
      label: `Year ${today.getYear()}`,
    };
  }

  static lastNDays(n: number): DateRange {
    const today = new NepaliDate();
    return {
      start: today.addDays(-(n - 1)),
      end: today,
      label: `Last ${n} Days`,
    };
  }

  static custom(start: NepaliDate, end: NepaliDate): DateRange {
    return {
      start,
      end,
      label: `${start.format("MMM DD")} - ${end.format("MMM DD, YYYY")}`,
    };
  }
}

// Usage
const thisMonth = DateRanges.thisMonth();
console.log(thisMonth.label);
console.log(thisMonth.start.format("YYYY-MM-DD"));
```

---

## Validation Snippets

### Complete Validation Utility

```typescript
import { NepaliDate } from "nepali-date-library";

class DateValidation {
  // Validate date components
  static isValidDate(year: number, month: number, day: number): boolean {
    return NepaliDate.isValid(year, month, day);
  }

  // Validate date string format
  static isValidFormat(dateString: string): boolean {
    return /^\d{4}[-/.]\d{2}[-/.]\d{2}$/.test(dateString);
  }

  // Validate and parse date string
  static parseOrNull(dateString: string): NepaliDate | null {
    try {
      if (!this.isValidFormat(dateString)) return null;
      return new NepaliDate(dateString);
    } catch {
      return null;
    }
  }

  // Check if date is within supported range
  static isInSupportedRange(date: Date): boolean {
    const min = NepaliDate.minimum();
    const max = NepaliDate.maximum();
    return date >= min && date <= max;
  }

  // Validate user input
  static validateInput(input: string): {
    valid: boolean;
    error?: string;
    date?: NepaliDate;
  } {
    if (!input) {
      return { valid: false, error: "Date is required" };
    }

    if (!this.isValidFormat(input)) {
      return { valid: false, error: "Invalid format. Use YYYY-MM-DD" };
    }

    const date = this.parseOrNull(input);
    if (!date) {
      return { valid: false, error: "Invalid date" };
    }

    return { valid: true, date };
  }
}

// Usage
const result = DateValidation.validateInput("2082-10-15");
if (result.valid) {
  console.log(result.date!.format("MMMM DD, YYYY"));
} else {
  console.error(result.error);
}
```

---

## Age Calculation

### Calculate Age from DOB

```typescript
import { NepaliDate } from "nepali-date-library";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  description: string;
}

function calculateAge(dobString: string): AgeResult {
  const dob = new NepaliDate(dobString);
  const today = new NepaliDate();

  let years = today.getYear() - dob.getYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = today.addMonths(-1);
    days += prevMonth.daysInMonth();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let description = "";
  if (years > 0) description += `${years} year${years > 1 ? "s" : ""}`;
  if (months > 0) description += ` ${months} month${months > 1 ? "s" : ""}`;
  if (days > 0) description += ` ${days} day${days > 1 ? "s" : ""}`;

  return {
    years,
    months,
    days,
    description: description.trim() || "0 days",
  };
}

// Usage
const age = calculateAge("2050-05-15");
console.log(age.description); // '32 years 4 months 16 days'
```

---

## Calendar Generation

### Full Calendar Component Data

```typescript
import { NepaliDate, WEEK_EN, MONTH_EN } from "nepali-date-library";

interface CalendarData {
  year: number;
  month: number;
  monthName: string;
  monthNameNp: string;
  weekdays: string[];
  weeks: CalendarWeek[];
  totalDays: number;
}

interface CalendarWeek {
  days: CalendarDay[];
}

interface CalendarDay {
  date: number;
  month: "prev" | "current" | "next";
  isToday: boolean;
  isWeekend: boolean;
  fullDate: NepaliDate;
}

function generateCalendarData(year: number, month: number): CalendarData {
  const calendar = NepaliDate.getCalendarDays(year, month);
  const today = new NepaliDate();

  const allDays: CalendarDay[] = [];

  // Previous month
  calendar.prevMonth.days.forEach((day) => {
    const fullDate = new NepaliDate(
      calendar.prevMonth.year,
      calendar.prevMonth.month,
      day,
    );
    allDays.push({
      date: day,
      month: "prev",
      isToday: false,
      isWeekend: fullDate.getDay() === 0 || fullDate.getDay() === 6,
      fullDate,
    });
  });

  // Current month
  calendar.currentMonth.days.forEach((day) => {
    const fullDate = new NepaliDate(year, month, day);
    const isToday =
      today.getYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day;
    allDays.push({
      date: day,
      month: "current",
      isToday,
      isWeekend: fullDate.getDay() === 0 || fullDate.getDay() === 6,
      fullDate,
    });
  });

  // Next month
  calendar.nextMonth.days.forEach((day) => {
    const fullDate = new NepaliDate(
      calendar.nextMonth.year,
      calendar.nextMonth.month,
      day,
    );
    allDays.push({
      date: day,
      month: "next",
      isToday: false,
      isWeekend: fullDate.getDay() === 0 || fullDate.getDay() === 6,
      fullDate,
    });
  });

  // Group into weeks
  const weeks: CalendarWeek[] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push({ days: allDays.slice(i, i + 7) });
  }

  return {
    year,
    month,
    monthName: MONTH_EN[month],
    monthNameNp: NepaliDate.getMonthName(month, false, true),
    weekdays: WEEK_EN,
    weeks,
    totalDays: calendar.currentMonth.days.length,
  };
}

// Usage
const calData = generateCalendarData(2082, 9);
console.log(`${calData.monthName} ${calData.year}`);
console.log(`Total days: ${calData.totalDays}`);
console.log(`Weeks to display: ${calData.weeks.length}`);
```

---

## Fiscal Year Snippets

### Complete Fiscal Year Utility

```typescript
import { NepaliDate } from "nepali-date-library";

interface FiscalYearData {
  fiscalYear: string;
  startDate: string;
  endDate: string;
  currentQuarter: number;
  daysRemaining: number;
  percentComplete: number;
}

class FiscalYearHelper {
  static getCurrentFYData(): FiscalYearData {
    const fy = NepaliDate.getCurrentFiscalYear();
    const quarters = NepaliDate.getFiscalYearQuarters(fy);
    const today = new NepaliDate();

    const fyStart = quarters.Q1.start;
    const fyEnd = quarters.Q4.end;

    const totalDays = Math.abs(fyStart.diff(fyEnd, "day"));
    const daysElapsed = Math.abs(fyStart.diff(today, "day"));
    const daysRemaining = Math.abs(today.diff(fyEnd, "day"));

    return {
      fiscalYear: `${fy}/${String(fy + 1).slice(-2)}`,
      startDate: fyStart.format("YYYY-MM-DD"),
      endDate: fyEnd.format("YYYY-MM-DD"),
      currentQuarter: today.getCurrentFiscalYearQuarter(),
      daysRemaining,
      percentComplete: Math.round((daysElapsed / totalDays) * 100),
    };
  }

  static getQuarterDates(quarter: 1 | 2 | 3 | 4, fy?: number) {
    const fiscalYear = fy ?? NepaliDate.getCurrentFiscalYear();
    const q = NepaliDate.getFiscalYearQuarter(quarter, fiscalYear);

    return {
      start: q.start.format("YYYY-MM-DD"),
      end: q.end.format("YYYY-MM-DD"),
      label: `FQ${quarter} ${fiscalYear}/${fiscalYear + 1}`,
    };
  }
}

// Usage
const fyData = FiscalYearHelper.getCurrentFYData();
console.log(`Fiscal Year: ${fyData.fiscalYear}`);
console.log(`${fyData.percentComplete}% complete`);
console.log(`${fyData.daysRemaining} days remaining`);
```

---

## Nepali Number Conversion

### Number to Nepali Digits

```typescript
import { NUMBER_NP } from "nepali-date-library";

function toNepaliDigits(num: number | string): string {
  return String(num)
    .split("")
    .map((char) => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : NUMBER_NP[digit];
    })
    .join("");
}

function fromNepaliDigits(nepaliNum: string): number {
  const englishStr = nepaliNum
    .split("")
    .map((char) => {
      const index = NUMBER_NP.indexOf(char);
      return index >= 0 ? String(index) : char;
    })
    .join("");
  return parseInt(englishStr);
}

// Usage
console.log(toNepaliDigits(2082)); // '२०८२'
console.log(toNepaliDigits("15")); // '१५'
console.log(fromNepaliDigits("२०८२")); // 2082
```

---

## Integration Examples

### React Hook

```typescript
import { useState, useCallback, useMemo } from "react";
import { NepaliDate } from "nepali-date-library";

function useNepaliDate(initialDate?: string | NepaliDate) {
  const [date, setDate] = useState<NepaliDate>(() => {
    if (initialDate instanceof NepaliDate) return initialDate;
    if (typeof initialDate === "string") return new NepaliDate(initialDate);
    return new NepaliDate();
  });

  const formatted = useMemo(
    () => ({
      iso: date.format("YYYY-MM-DD"),
      long: date.format("MMMM DD, YYYY"),
      nepali: date.format("mmmm dd, yyyy"),
      short: date.format("MMM DD"),
    }),
    [date],
  );

  const navigate = useCallback(
    {
      nextDay: () => setDate((d) => d.addDays(1)),
      prevDay: () => setDate((d) => d.addDays(-1)),
      nextMonth: () => setDate((d) => d.addMonths(1)),
      prevMonth: () => setDate((d) => d.addMonths(-1)),
      today: () => setDate(new NepaliDate()),
    },
    [],
  );

  return {
    date,
    setDate,
    formatted,
    navigate,
    year: date.getYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
}

// Usage in component
// const { date, formatted, navigate } = useNepaliDate();
// console.log(formatted.long); // 'Magh 15, 2082'
```

### Vue Composable

```typescript
import { ref, computed } from "vue";
import { NepaliDate } from "nepali-date-library";

export function useNepaliDate(initial?: string) {
  const date = ref(initial ? new NepaliDate(initial) : new NepaliDate());

  const formatted = computed(() => ({
    iso: date.value.format("YYYY-MM-DD"),
    long: date.value.format("MMMM DD, YYYY"),
    nepali: date.value.format("mmmm dd, yyyy"),
  }));

  const addDays = (n: number) => {
    date.value = date.value.addDays(n);
  };

  const addMonths = (n: number) => {
    date.value = date.value.addMonths(n);
  };

  const setToday = () => {
    date.value = new NepaliDate();
  };

  return {
    date,
    formatted,
    addDays,
    addMonths,
    setToday,
  };
}
```
