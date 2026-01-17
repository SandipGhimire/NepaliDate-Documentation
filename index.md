---
layout: home
title: Nepali Date Library
hero:
  name: Nepali Date Library
  text: Bikram Sambat Date Handling Made Easy
  tagline: A comprehensive TypeScript/JavaScript library for working with Nepali (Bikram Sambat) dates, including conversion, manipulation, formatting, and fiscal year operations.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/NepaliDate/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/SandipGhimire/nepali-date-library
features:
  - icon: 🔄
    title: Date Conversion
    details: Seamlessly convert between Anno Domini (AD) and Bikram Sambat (BS) dates with simple utility functions.
  - icon: 📅
    title: Calendar Generation
    details: Generate complete calendar data including trailing days from adjacent months - perfect for datepicker components.
  - icon: 💼
    title: Fiscal Year Support
    details: Built-in support for Nepali fiscal year calculations, quarters, and financial reporting periods.
  - icon: 🌐
    title: Localization
    details: Full support for both English and Nepali language formatting, including Nepali numerals.
  - icon: ⚡
    title: TypeScript First
    details: Built with TypeScript for excellent type safety and IDE auto-completion support.
  - icon: 📊
    title: 125+ Years Coverage
    details: Supports dates from BS 1976 to BS 2100 (AD 1919 to AD 2044) with accurate month lengths.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}

.VPHero .text {
  font-size: 2rem !important;
}
</style>

## Quick Start

```bash
npm install nepali-date-library
```

```typescript
import { NepaliDate, ADtoBS, BStoAD } from "nepali-date-library";

// Create today's Nepali date
const today = new NepaliDate();
console.log(today.format("YYYY-MM-DD")); // 2082-10-01

// Convert AD to BS
const bsDate = ADtoBS("2026-01-14");
console.log(bsDate); // 2082-10-01

// Convert BS to AD
const adDate = BStoAD("2082-10-01");
console.log(adDate); // 2026-01-14

// Format in Nepali
console.log(today.format("yyyy mmmm dd, dddd")); // २०८२ माघ ०१, बुधबार
```
