# Nepali Date Library

## Overview

The **Nepali Date Library** (`nepali-date-library`) is a comprehensive TypeScript/JavaScript library for working with **Nepali (Bikram Sambat)** dates. It provides a powerful `NepaliDate` class along with utility functions for date conversion, manipulation, formatting, and more.

## What is Bikram Sambat?

**Bikram Sambat (BS)** is the official calendar of Nepal. It is approximately 56 years and 8 months ahead of the Gregorian calendar (Anno Domini/AD). For example:

- **AD 2026-01-14** = **BS 2082-10-01**
- The Nepali calendar has 12 months with varying lengths (29-32 days)
- The Nepali New Year falls in mid-April (Baisakh 1st)

## Key Features

| Feature                 | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| **Date Conversion**     | Convert between AD and BS dates using `ADtoBS()` and `BStoAD()` functions |
| **Date Manipulation**   | Add or subtract days, months, and years                                   |
| **Formatting**          | Format dates in both English and Nepali with customizable patterns        |
| **Date Comparison**     | Compare dates, calculate differences, check equality                      |
| **Date Ranges**         | Get start/end of day, week, month, or year                                |
| **Fiscal Year Support** | Work with Nepali fiscal years and quarters                                |
| **Calendar Generation** | Generate calendar data for datepicker components                          |
| **TypeScript Support**  | Full type definitions included                                            |

## Supported Date Range

The library supports Nepali dates within the following range:

| Calendar           | Start          | End                     |
| ------------------ | -------------- | ----------------------- |
| **Bikram Sambat**  | 1976 Baisakh 1 | 2100 Chaitra (Last day) |
| **Gregorian (AD)** | April 13, 1919 | ~April 2044             |

This covers over **125 years** of dates with accurate month lengths for each year.

## Quick Example

```typescript
import { NepaliDate, ADtoBS, BStoAD } from "nepali-date-library";

// Create a Nepali date from today
const today = new NepaliDate();

// Get date components
console.log(today.getYear()); // 2082
console.log(today.getMonth()); // 9 (0-indexed, so this is Magh)
console.log(today.getDate()); // 1

// Format the date
console.log(today.format("YYYY-MM-DD")); // 2082-10-01
console.log(today.format("MMMM DD, YYYY")); // Magh 01, 2082
console.log(today.format("yyyy mmmm dd")); // २०८२ माघ ०१

// Convert between calendars
const bs = ADtoBS("2026-01-14"); // '2082-10-01'
const ad = BStoAD("2082-10-01"); // '2026-01-14'
```

## Why Use This Library?

1. **Accuracy**: Uses a comprehensive date map covering BS 1976-2100 with correct month lengths
2. **Full Featured**: Not just conversion - includes manipulation, comparison, formatting, and more
3. **Localization**: Native support for Nepali language and numerals
4. **Fiscal Year**: Built-in support for Nepal's fiscal year (starts Shrawan 1st)
5. **Calendar Ready**: Generate complete calendar data for building datepickers
6. **TypeScript**: Written in TypeScript with full type definitions
7. **Updates**: We try to update the library every year to cover the latest date range.
