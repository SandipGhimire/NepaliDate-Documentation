# Conversion Functions

The library provides two utility functions for converting between Anno Domini (AD/Gregorian) and Bikram Sambat (BS/Nepali) dates.

## Import

```typescript
import { ADtoBS, BStoAD } from "nepali-date-library";
```

---

## ADtoBS() {#adtobs}

Converts an Anno Domini (AD) date to a Bikram Sambat (BS) date.

### Signature

```typescript
function ADtoBS(adDate: string): string;
```

### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `adDate`  | `string` | AD date in `YYYY-MM-DD` format |

### Returns

`string` - BS date in `YYYY-MM-DD` format

### Example

```typescript
import { ADtoBS } from "nepali-date-library";

// Convert Gregorian date to Nepali date
const bsDate = ADtoBS("2026-01-14");
console.log(bsDate); // '2082-10-01'

// More examples
console.log(ADtoBS("2024-04-13")); // '2080-12-31' (Last day of 2080)
console.log(ADtoBS("2024-04-14")); // '2081-01-01' (Nepali New Year 2081)
console.log(ADtoBS("2025-04-14")); // '2082-01-01' (Nepali New Year 2082)
```

### Error Handling

The function throws an error in the following cases:

```typescript
// Invalid format
try {
  ADtoBS("2026/01/14"); // Wrong separator
} catch (e) {
  console.error(e.message); // 'Invalid date format. Expected format: YYYY-MM-DD'
}

// Invalid date
try {
  ADtoBS("2026-13-01"); // Invalid month
} catch (e) {
  console.error(e.message); // 'Invalid date input'
}

// Out of range
try {
  ADtoBS("1940-01-01"); // Before supported range
} catch (e) {
  console.error(e.message); // 'Failed to convert AD to BS'
}
```

---

## BStoAD() {#bstoad}

Converts a Bikram Sambat (BS) date to an Anno Domini (AD) date.

### Signature

```typescript
function BStoAD(bsDate: string): string;
```

### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `bsDate`  | `string` | BS date in `YYYY-MM-DD` format |

### Returns

`string` - AD date in `YYYY-MM-DD` format

### Example

```typescript
import { BStoAD } from "nepali-date-library";

// Convert Nepali date to Gregorian date
const adDate = BStoAD("2082-10-01");
console.log(adDate); // '2026-01-14'

// More examples
console.log(BStoAD("2081-01-01")); // '2024-04-13' (Nepali New Year 2081)
console.log(BStoAD("2082-01-01")); // '2025-04-14' (Nepali New Year 2082)
console.log(BStoAD("2080-12-31")); // '2024-04-13'
```

### Error Handling

```typescript
// Invalid format
try {
  BStoAD("2082/10/01"); // Wrong separator
} catch (e) {
  console.error(e.message); // 'Invalid date format. Expected format: YYYY-MM-DD'
}

// Out of range
try {
  BStoAD("1975-01-01"); // Before BS 1976
} catch (e) {
  console.error(e.message); // 'Failed to convert BS to AD'
}
```

---

## Supported Date Range

Both conversion functions work within the following range:

| Calendar               | Start      | End        |
| ---------------------- | ---------- | ---------- |
| **Bikram Sambat (BS)** | 1976-01-01 | 2100-12-30 |
| **Anno Domini (AD)**   | 1919-04-13 | ~2044-04   |

Dates outside this range will throw an error.

---

## Using with NepaliDate Class

You can also perform conversions using the `NepaliDate` class:

```typescript
import { NepaliDate } from "nepali-date-library";

// AD to BS using constructor
const jsDate = new Date("2026-01-14");
const nepaliDate = new NepaliDate(jsDate);
console.log(nepaliDate.format("YYYY-MM-DD")); // '2082-10-01'

// BS to AD using getEnglishDate()
const bsDate = new NepaliDate("2082-10-01");
const adDate = bsDate.getEnglishDate();
console.log(adDate.toISOString().split("T")[0]); // '2026-01-14'
```

---

## Common Patterns

### Batch Conversion

```typescript
import { ADtoBS, BStoAD } from "nepali-date-library";

const adDates = ["2026-01-14", "2026-02-15", "2026-03-16"];
const bsDates = adDates.map((date) => ADtoBS(date));
console.log(bsDates);
// ['2082-10-01', '2082-11-03', '2082-12-03']
```

### Safe Conversion with Error Handling

```typescript
import { ADtoBS } from "nepali-date-library";

function safeADtoBS(adDate: string): string | null {
  try {
    return ADtoBS(adDate);
  } catch {
    return null;
  }
}

console.log(safeADtoBS("2026-01-14")); // '2082-10-01'
console.log(safeADtoBS("invalid")); // null
```

### Validating Input Before Conversion

```typescript
import { ADtoBS } from "nepali-date-library";

function isValidAdDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

const input = "2026-01-14";
if (isValidAdDate(input)) {
  console.log(ADtoBS(input));
}
```
