# Calendar Generation

Building calendars and datepickers is a common requirement. The `getCalendarDays()` static method provides all the data you need to render a complete monthly calendar.

## Basic Calendar Data

### Get Calendar Days for a Month

```typescript
import { NepaliDate } from "nepali-date-library";

const calendar = NepaliDate.getCalendarDays(2082, 9); // Magh 2082

console.log(calendar);
// {
//   prevRemainingDays: 3,
//   prevMonth: { year: 2082, month: 8, days: [28, 29, 30] },
//   currentMonth: { year: 2082, month: 9, days: [1, 2, 3, ..., 29] },
//   nextMonth: { year: 2082, month: 10, days: [1, 2, 3, 4, 5] },
//   remainingDays: 5
// }
```

### Understanding the Output

| Property            | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `prevRemainingDays` | Number of days from previous month to fill the first week  |
| `prevMonth`         | Previous month's trailing days                             |
| `currentMonth`      | Current month's complete day array                         |
| `nextMonth`         | Next month's leading days                                  |
| `remainingDays`     | Number of days from next month needed to complete the grid |

---

## Building a Calendar Grid

### Simple Calendar Component

```typescript
import { NepaliDate } from "nepali-date-library";

interface CalendarDay {
  day: number;
  month: "prev" | "current" | "next";
  year: number;
  monthIndex: number;
  isToday: boolean;
}

function generateCalendarGrid(year: number, month: number): CalendarDay[] {
  const calendar = NepaliDate.getCalendarDays(year, month);
  const today = new NepaliDate();

  const days: CalendarDay[] = [];

  // Previous month days
  calendar.prevMonth.days.forEach((day) => {
    days.push({
      day,
      month: "prev",
      year: calendar.prevMonth.year,
      monthIndex: calendar.prevMonth.month,
      isToday: false,
    });
  });

  // Current month days
  calendar.currentMonth.days.forEach((day) => {
    days.push({
      day,
      month: "current",
      year: calendar.currentMonth.year,
      monthIndex: calendar.currentMonth.month,
      isToday:
        today.getYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day,
    });
  });

  // Next month days
  calendar.nextMonth.days.forEach((day) => {
    days.push({
      day,
      month: "next",
      year: calendar.nextMonth.year,
      monthIndex: calendar.nextMonth.month,
      isToday: false,
    });
  });

  return days;
}

// Usage
const days = generateCalendarGrid(2082, 9);
console.log(days.length); // 35 or 42 (5 or 6 weeks)
```

### React Calendar Component

```tsx
import { NepaliDate } from "nepali-date-library";
import { useState, useMemo } from "react";

interface CalendarProps {
  onDateSelect?: (date: NepaliDate) => void;
}

export function NepaliCalendar({ onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new NepaliDate());

  const calendarDays = useMemo(() => {
    return NepaliDate.getCalendarDays(
      currentMonth.getYear(),
      currentMonth.getMonth(),
    );
  }, [currentMonth]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => prev.addMonths(-1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => prev.addMonths(1));
  };

  const handleDayClick = (
    day: number,
    monthType: "prev" | "current" | "next",
  ) => {
    let date: NepaliDate;

    if (monthType === "prev") {
      date = new NepaliDate(
        calendarDays.prevMonth.year,
        calendarDays.prevMonth.month,
        day,
      );
    } else if (monthType === "next") {
      date = new NepaliDate(
        calendarDays.nextMonth.year,
        calendarDays.nextMonth.month,
        day,
      );
    } else {
      date = new NepaliDate(
        calendarDays.currentMonth.year,
        calendarDays.currentMonth.month,
        day,
      );
    }

    onDateSelect?.(date);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={goToPrevMonth}>←</button>
        <span>{currentMonth.format("MMMM YYYY")}</span>
        <button onClick={goToNextMonth}>→</button>
      </div>

      <div className="weekdays">
        {weekdays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="days">
        {calendarDays.prevMonth.days.map((day) => (
          <button
            key={`prev-${day}`}
            className="day prev-month"
            onClick={() => handleDayClick(day, "prev")}
          >
            {day}
          </button>
        ))}

        {calendarDays.currentMonth.days.map((day) => (
          <button
            key={`current-${day}`}
            className="day current-month"
            onClick={() => handleDayClick(day, "current")}
          >
            {day}
          </button>
        ))}

        {calendarDays.nextMonth.days.map((day) => (
          <button
            key={`next-${day}`}
            className="day next-month"
            onClick={() => handleDayClick(day, "next")}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Vue Calendar Component

```vue
<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">←</button>
      <span>{{ currentMonth.format("MMMM YYYY") }}</span>
      <button @click="nextMonth">→</button>
    </div>

    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <div class="days">
      <button
        v-for="day in calendarDays.prevMonth.days"
        :key="`prev-${day}`"
        class="day prev-month"
        @click="selectDate(day, 'prev')"
      >
        {{ day }}
      </button>

      <button
        v-for="day in calendarDays.currentMonth.days"
        :key="`current-${day}`"
        class="day current-month"
        :class="{ today: isToday(day) }"
        @click="selectDate(day, 'current')"
      >
        {{ day }}
      </button>

      <button
        v-for="day in calendarDays.nextMonth.days"
        :key="`next-${day}`"
        class="day next-month"
        @click="selectDate(day, 'next')"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { NepaliDate } from "nepali-date-library";

const emit = defineEmits<{
  (e: "select", date: NepaliDate): void;
}>();

const currentMonth = ref(new NepaliDate());
const today = new NepaliDate();

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarDays = computed(() => {
  return NepaliDate.getCalendarDays(
    currentMonth.value.getYear(),
    currentMonth.value.getMonth(),
  );
});

const prevMonth = () => {
  currentMonth.value = currentMonth.value.addMonths(-1);
};

const nextMonth = () => {
  currentMonth.value = currentMonth.value.addMonths(1);
};

const isToday = (day: number) => {
  return (
    today.getYear() === currentMonth.value.getYear() &&
    today.getMonth() === currentMonth.value.getMonth() &&
    today.getDate() === day
  );
};

const selectDate = (day: number, type: "prev" | "current" | "next") => {
  const data = calendarDays.value;
  const monthData =
    type === "prev"
      ? data.prevMonth
      : type === "next"
        ? data.nextMonth
        : data.currentMonth;

  const date = new NepaliDate(monthData.year, monthData.month, day);
  emit("select", date);
};
</script>
```

---

## Nepali Numerals in Calendar

### Calendar with Nepali Display

```typescript
import { NepaliDate, NUMBER_NP, WEEK_SHORT_NP } from "nepali-date-library";

function toNepaliNumber(num: number): string {
  return String(num)
    .split("")
    .map((digit) => NUMBER_NP[parseInt(digit)])
    .join("");
}

function renderNepaliCalendar(year: number, month: number): string {
  const calendar = NepaliDate.getCalendarDays(year, month);
  const currentDate = new NepaliDate(year, month, 1);

  let html = `<div class="nepali-calendar">`;

  // Header
  html += `<div class="header">${currentDate.format("mmmm yyyy")}</div>`;

  // Weekday headers
  html += `<div class="weekdays">`;
  WEEK_SHORT_NP.forEach((day) => {
    html += `<span>${day}</span>`;
  });
  html += `</div>`;

  // Days
  html += `<div class="days">`;

  calendar.prevMonth.days.forEach((day) => {
    html += `<span class="prev">${toNepaliNumber(day)}</span>`;
  });

  calendar.currentMonth.days.forEach((day) => {
    html += `<span class="current">${toNepaliNumber(day)}</span>`;
  });

  calendar.nextMonth.days.forEach((day) => {
    html += `<span class="next">${toNepaliNumber(day)}</span>`;
  });

  html += `</div></div>`;

  return html;
}
```

---

## Week Information

### Get Week Number

```typescript
import { NepaliDate } from "nepali-date-library";

function getWeekNumber(date: NepaliDate): number {
  const startOfYear = date.startOfYear();
  const daysDiff = date.diff(startOfYear, "day");
  const startDayOfWeek = startOfYear.getDay();

  return Math.ceil((daysDiff + startDayOfWeek + 1) / 7);
}

const date = new NepaliDate(2082, 9, 15);
console.log(`Week ${getWeekNumber(date)}`); // Week 42
```

### Get Weeks in Month

```typescript
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate(2082, 9, 1);
const weeks = date.getWeeksInMonth();
console.log(`This month has ${weeks} weeks`); // 5 or 6
```

---

## Calendar Styling Tips

```css
.calendar {
  --day-size: 40px;
  --gap: 4px;
  width: calc(var(--day-size) * 7 + var(--gap) * 6);
}

.days {
  display: grid;
  grid-template-columns: repeat(7, var(--day-size));
  gap: var(--gap);
}

.day {
  width: var(--day-size);
  height: var(--day-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.day.prev-month,
.day.next-month {
  opacity: 0.4;
}

.day.today {
  background: #3b82f6;
  color: white;
}

.day:hover {
  background: #e5e7eb;
}
```
