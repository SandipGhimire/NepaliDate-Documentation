# Constants

The library exports several constants for month names, weekday names, Nepali numerals, and the complete date mapping table.

## Import

```typescript
import {
  // Month names
  MONTH_EN,
  MONTH_NP,
  MONTH_SHORT_EN,
  MONTH_SHORT_NP,

  // Weekday names
  WEEK_EN,
  WEEK_NP,
  WEEK_SHORT_EN,
  WEEK_SHORT_NP,

  // Nepali numerals
  NUMBER_NP,

  // Date map
  NEPALI_DATE_MAP,
} from "nepali-date-library";
```

---

## Month Names

### MONTH_EN

Full English month names.

```typescript
const MONTH_EN: string[] = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Aswin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];
```

**Example:**

```typescript
console.log(MONTH_EN[0]); // 'Baisakh'
console.log(MONTH_EN[9]); // 'Magh'
console.log(MONTH_EN[11]); // 'Chaitra'
```

---

### MONTH_SHORT_EN

Short English month names (3 characters).

```typescript
const MONTH_SHORT_EN: string[] = [
  "Bai",
  "Jes",
  "Asa",
  "Shr",
  "Bhd",
  "Asw",
  "Kar",
  "Man",
  "Pou",
  "Mag",
  "Fal",
  "Cha",
];
```

---

### MONTH_NP

Full Nepali month names in Devanagari script.

```typescript
const MONTH_NP: string[] = [
  "बैशाख",
  "जेठ",
  "असार",
  "श्रावण",
  "भाद्र",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पौष",
  "माघ",
  "फाल्गुण",
  "चैत्र",
];
```

**Example:**

```typescript
console.log(MONTH_NP[0]); // 'बैशाख'
console.log(MONTH_NP[9]); // 'माघ'
```

---

### MONTH_SHORT_NP

Short Nepali month names.

```typescript
const MONTH_SHORT_NP: string[] = [
  "बै",
  "जे",
  "अ",
  "श्रा",
  "भा",
  "आ",
  "का",
  "मं",
  "पौ",
  "मा",
  "फा",
  "चै",
];
```

---

### Month Reference Table

| Index | MONTH_EN | MONTH_SHORT_EN | MONTH_NP | MONTH_SHORT_NP |
| ----- | -------- | -------------- | -------- | -------------- |
| 0     | Baisakh  | Bai            | बैशाख    | बै             |
| 1     | Jestha   | Jes            | जेठ      | जे             |
| 2     | Asar     | Asa            | असार     | अ              |
| 3     | Shrawan  | Shr            | श्रावण   | श्रा           |
| 4     | Bhadra   | Bhd            | भाद्र    | भा             |
| 5     | Aswin    | Asw            | आश्विन   | आ              |
| 6     | Kartik   | Kar            | कार्तिक  | का             |
| 7     | Mangsir  | Man            | मंसिर    | मं             |
| 8     | Poush    | Pou            | पौष      | पौ             |
| 9     | Magh     | Mag            | माघ      | मा             |
| 10    | Falgun   | Fal            | फाल्गुण  | फा             |
| 11    | Chaitra  | Cha            | चैत्र    | चै             |

---

## Weekday Names

### WEEK_EN

Full English day names.

```typescript
const WEEK_EN: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
```

**Example:**

```typescript
const dayIndex = new NepaliDate().getDay();
console.log(WEEK_EN[dayIndex]); // 'Wednesday'
```

---

### WEEK_SHORT_EN

Short English day names (3 characters).

```typescript
const WEEK_SHORT_EN: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
```

---

### WEEK_NP

Full Nepali day names in Devanagari script.

```typescript
const WEEK_NP: string[] = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहिबार",
  "शुक्रबार",
  "शनिबार",
];
```

---

### WEEK_SHORT_NP

Short Nepali day names.

```typescript
const WEEK_SHORT_NP: string[] = [
  "आइत",
  "सोम",
  "मंगल",
  "बुध",
  "बिहि",
  "शुक्र",
  "शनि",
];
```

---

### Weekday Reference Table

| Index | WEEK_EN   | WEEK_SHORT_EN | WEEK_NP  | WEEK_SHORT_NP |
| ----- | --------- | ------------- | -------- | ------------- |
| 0     | Sunday    | Sun           | आइतबार   | आइत           |
| 1     | Monday    | Mon           | सोमबार   | सोम           |
| 2     | Tuesday   | Tue           | मंगलबार  | मंगल          |
| 3     | Wednesday | Wed           | बुधबार   | बुध           |
| 4     | Thursday  | Thu           | बिहिबार  | बिहि          |
| 5     | Friday    | Fri           | शुक्रबार | शुक्र         |
| 6     | Saturday  | Sat           | शनिबार   | शनि           |

---

## Nepali Numbers {#nepali-numbers}

### NUMBER_NP

Array of Nepali numerals (०-९).

```typescript
const NUMBER_NP: string[] = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
```

**Example:**

```typescript
// Convert English number to Nepali
function toNepaliNumber(num: number): string {
  return String(num)
    .split("")
    .map((digit) => NUMBER_NP[parseInt(digit)])
    .join("");
}

console.log(toNepaliNumber(2082)); // '२०८२'
console.log(toNepaliNumber(15)); // '१५'
```

::: tip
The `format()` method with lowercase tokens automatically uses Nepali numerals:

```typescript
const date = new NepaliDate(2082, 9, 15);
console.log(date.format("yyyy-mm-dd")); // '२०८२-१०-१५'
```

:::

---

## Date Map {#date-map}

### NEPALI_DATE_MAP

Complete mapping of days in each month for years BS 1976-2100.

```typescript
interface DateMapEntry {
  year: number;
  days: number[]; // Array of 12 month lengths
  totalDays: number; // Total days in the year
  daysTillNow: number; // Cumulative days from BS 2000
}

const NEPALI_DATE_MAP: DateMapEntry[];
```

**Structure:**

```typescript
// Example entries
[
  {
    year: 2000,
    days: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    totalDays: 365,
    daysTillNow: 365,
  },
  {
    year: 2001,
    days: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    totalDays: 365,
    daysTillNow: 730,
  },
  // ... continues to 2100
  {
    year: 2100,
    days: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    totalDays: 366,
    daysTillNow: 36889,
  },
];
```

**Example Usage:**

```typescript
import { NEPALI_DATE_MAP } from "nepali-date-library";

// Get month lengths for a specific year
const year2082 = NEPALI_DATE_MAP.find((entry) => entry.year === 2082);
console.log(year2082?.days);
// [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]

// Days in Magh 2082 (month index 9)
console.log(year2082?.days[9]); // 30

// Total days in 2082
console.log(year2082?.totalDays); // 366
```

---

### Month Length Variations

Nepali months have varying lengths (29-32 days) depending on the year:

| Month   | Min Days | Max Days | Typical |
| ------- | -------- | -------- | ------- |
| Baisakh | 30       | 31       | 31      |
| Jestha  | 31       | 32       | 31-32   |
| Asar    | 31       | 32       | 31-32   |
| Shrawan | 31       | 32       | 32      |
| Bhadra  | 31       | 32       | 31-32   |
| Aswin   | 30       | 31       | 30-31   |
| Kartik  | 29       | 30       | 29-30   |
| Mangsir | 29       | 30       | 29-30   |
| Poush   | 29       | 30       | 29-30   |
| Magh    | 29       | 30       | 29-30   |
| Falgun  | 29       | 30       | 29-30   |
| Chaitra | 30       | 31       | 30-31   |

::: warning
Never hardcode month lengths! Always use `daysInMonth()` or the date map to get accurate values.
:::

---

## Using Constants for Custom Formatting

```typescript
import { MONTH_EN, MONTH_NP, WEEK_EN, WEEK_NP } from "nepali-date-library";

function formatDateCustom(date: NepaliDate, nepali: boolean = false): string {
  const months = nepali ? MONTH_NP : MONTH_EN;
  const days = nepali ? WEEK_NP : WEEK_EN;

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getYear()}`;
}

const date = new NepaliDate(2082, 9, 15);
console.log(formatDateCustom(date)); // 'Wednesday, Magh 15, 2082'
console.log(formatDateCustom(date, true)); // 'बुधबार, माघ 15, 2082'
```
