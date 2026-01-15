# Date Conversion

Converting between Anno Domini (AD/Gregorian) and Bikram Sambat (BS/Nepali) dates is one of the most common operations.

## Basic Conversion

### AD to BS

```typescript
import { ADtoBS } from "nepali-date-library";

// Simple conversion
const bsDate = ADtoBS("2026-01-14");
console.log(bsDate); // '2082-10-01'
```

### BS to AD

```typescript
import { BStoAD } from "nepali-date-library";

// Simple conversion
const adDate = BStoAD("2082-10-01");
console.log(adDate); // '2026-01-14'
```

---

## Converting User Input

### Form Input Handling

```typescript
import { ADtoBS, BStoAD, NepaliDate } from "nepali-date-library";

// User enters a date in a form
function handleDateInput(
  value: string,
  inputType: "ad" | "bs",
): {
  ad: string;
  bs: string;
  nepaliDate: NepaliDate;
} {
  if (inputType === "ad") {
    const bsDate = ADtoBS(value);
    return {
      ad: value,
      bs: bsDate,
      nepaliDate: new NepaliDate(bsDate),
    };
  } else {
    const adDate = BStoAD(value);
    return {
      ad: adDate,
      bs: value,
      nepaliDate: new NepaliDate(value),
    };
  }
}

// Usage
const result = handleDateInput("2026-01-14", "ad");
console.log(result.bs); // '2082-10-01'
console.log(result.nepaliDate.format("MMMM DD, YYYY")); // 'Magh 01, 2082'
```

### Date Picker Integration

```typescript
import { NepaliDate, ADtoBS } from "nepali-date-library";

// Convert HTML date input (always AD) to Nepali
function onDateChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const adValue = input.value; // '2026-01-14'

  const bsDate = ADtoBS(adValue);
  const nepaliDate = new NepaliDate(bsDate);

  // Display in Nepali format
  document.getElementById("nepali-display")!.textContent =
    nepaliDate.format("yyyy mmmm dd"); // '२०८२ माघ ०१'
}
```

---

## API Integration

### Storing Dates to Backend

```typescript
import { BStoAD, NepaliDate } from "nepali-date-library";

interface CreateEventRequest {
  title: string;
  eventDate: string; // Store as AD in database
}

// User selects a Nepali date, convert to AD for storage
function createEvent(title: string, nepaliDateStr: string): CreateEventRequest {
  return {
    title,
    eventDate: BStoAD(nepaliDateStr), // '2026-01-14'
  };
}

// Send to API
const event = createEvent("New Year Party", "2082-10-01");
await fetch("/api/events", {
  method: "POST",
  body: JSON.stringify(event),
});
```

### Displaying Dates from Backend

```typescript
import { ADtoBS, NepaliDate } from "nepali-date-library";

interface Event {
  id: number;
  title: string;
  eventDate: string; // Stored as AD
}

// Display event with Nepali date
function displayEvent(event: Event): string {
  const bsDate = ADtoBS(event.eventDate);
  const nepaliDate = new NepaliDate(bsDate);

  return `
    <div class="event">
      <h3>${event.title}</h3>
      <p>${nepaliDate.format("MMMM DD, YYYY")}</p>
      <p class="nepali">${nepaliDate.format("mmmm dd, yyyy")}</p>
    </div>
  `;
}
```

---

## Batch Conversion

### Converting Multiple Dates

```typescript
import { ADtoBS, BStoAD } from "nepali-date-library";

// Convert an array of AD dates to BS
const adDates = ["2026-01-14", "2026-02-15", "2026-03-16"];
const bsDates = adDates.map((date) => ADtoBS(date));
console.log(bsDates);
// ['2082-10-01', '2082-11-03', '2082-12-03']

// Convert with error handling
function batchConvertADtoBS(dates: string[]): (string | null)[] {
  return dates.map((date) => {
    try {
      return ADtoBS(date);
    } catch {
      return null;
    }
  });
}
```

### Processing Date Ranges

```typescript
import { NepaliDate, ADtoBS } from "nepali-date-library";

interface DateRange {
  start: string;
  end: string;
}

function convertDateRange(adRange: DateRange): DateRange {
  return {
    start: ADtoBS(adRange.start),
    end: ADtoBS(adRange.end),
  };
}

const adRange = { start: "2026-01-01", end: "2026-01-31" };
const bsRange = convertDateRange(adRange);
console.log(bsRange);
// { start: '2082-09-17', end: '2082-10-17' }
```

---

## Error Handling

### Safe Conversion Functions

```typescript
import { ADtoBS, BStoAD } from "nepali-date-library";

// Safe wrapper with default value
function safeADtoBS(adDate: string, fallback: string = ""): string {
  try {
    return ADtoBS(adDate);
  } catch (error) {
    console.warn(`Failed to convert ${adDate}:`, error);
    return fallback;
  }
}

// Safe wrapper with Result type
type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

function convertADtoBSSafe(adDate: string): Result<string> {
  try {
    return { success: true, value: ADtoBS(adDate) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Usage
const result = convertADtoBSSafe("invalid-date");
if (result.success) {
  console.log(result.value);
} else {
  console.error(result.error);
}
```

### Validation Before Conversion

```typescript
import { ADtoBS, NepaliDate } from "nepali-date-library";

function isValidAdDateFormat(dateString: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

function isWithinSupportedRange(adDate: string): boolean {
  const date = new Date(adDate);
  const min = NepaliDate.minimum();
  const max = NepaliDate.maximum();
  return date >= min && date <= max;
}

function validateAndConvert(adDate: string): string | null {
  if (!isValidAdDateFormat(adDate)) {
    console.error("Invalid format. Use YYYY-MM-DD");
    return null;
  }

  if (!isWithinSupportedRange(adDate)) {
    console.error("Date out of supported range");
    return null;
  }

  return ADtoBS(adDate);
}
```

---

## Real-World Examples

### Date of Birth Handling

```typescript
import { ADtoBS, BStoAD, NepaliDate } from "nepali-date-library";

interface Person {
  name: string;
  dobAD: string; // Stored in database
  dobBS: string; // For display
}

// Create person with AD date input
function createPersonFromAD(name: string, dobAD: string): Person {
  return {
    name,
    dobAD,
    dobBS: ADtoBS(dobAD),
  };
}

// Create person with BS date input
function createPersonFromBS(name: string, dobBS: string): Person {
  return {
    name,
    dobAD: BStoAD(dobBS),
    dobBS,
  };
}

// Display person with proper formatting
function displayPerson(person: Person): string {
  const dob = new NepaliDate(person.dobBS);
  return `
    Name: ${person.name}
    Date of Birth (BS): ${dob.format("MMMM DD, YYYY")}
    Date of Birth (AD): ${person.dobAD}
  `;
}
```

### Document Date Formatting

```typescript
import { NepaliDate } from "nepali-date-library";

function formatDocumentDate(date: NepaliDate): {
  formal: string;
  informal: string;
  nepali: string;
  full: string;
} {
  return {
    formal: date.format("YYYY-MM-DD"), // 2082-10-01
    informal: date.format("MMM D, YYYY"), // Mag 1, 2082
    nepali: date.format("yyyy mmmm dd"), // २०८२ माघ ०१
    full: date.format("dddd, mmmm dd, yyyy"), // बुधबार, माघ ०१, २०८२
  };
}

const today = new NepaliDate();
const formats = formatDocumentDate(today);
console.log(formats);
```
