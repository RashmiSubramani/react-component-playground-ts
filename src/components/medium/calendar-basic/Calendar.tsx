/*
  CALENDAR
  ---------
  Difficulty: Medium
  Concepts: useState<Date>, useState<Date | null> for selected date,
            Date API methods, isSameDate helper with null guards,
            ReactNode[] for building JSX arrays, computed grid layout

  Date API cheatsheet:
  - month:  January = 0, December = 11
  - getDay():  0 = Sunday, 6 = Saturday
  - getDate(): returns day of month (1–31)
  - new Date(year, month, 0) → last day of previous month
    (day=0 means "go 1 step back from day 1 of that month")

  How the grid works:
  1. firstDayOfMonth tells us how many empty slots before day 1
  2. daysInMonth tells us how many day cells to render
  3. Both are pushed into a ReactNode[] and rendered in a 7-column CSS grid
*/

import { useState } from "react";
import "./styles.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();

  // What weekday does the 1st fall on? (0=Sun … 6=Sat)
  const firstDayOfMonth: number = new Date(year, month, 1).getDay();
  // How many days in this month? (day=0 trick → last day of prev month)
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();

  const today: Date = new Date();

  /* ---------- Navigation ---------- */

  function goToPrevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function goToToday() {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  }

  /* ---------- Helpers ---------- */

  // Compare two Date objects by day/month/year only (ignoring time)
  // Both params can be null — returns false if either is null
  function isSameDate(d1: Date | null, d2: Date | null): boolean {
    return (
      d1 !== null &&
      d2 !== null &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  /* ---------- Build Calendar Grid ---------- */

  // ReactNode[] — mix of empty div slots and day div cells
  const days: React.ReactNode[] = [];

  // Empty slots before month starts (align day 1 to correct weekday column)
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty" />);
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);

    const isToday: boolean = isSameDate(dateObj, today);
    const isSelected: boolean = isSameDate(dateObj, selectedDate);

    days.push(
      <div
        key={day}
        className={`day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
        onClick={() => setSelectedDate(dateObj)}
      >
        {day}
      </div>,
    );
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        {/* Header — month/year + navigation */}
        <div className="calendar-header">
          <button className="calendarBtn" onClick={goToPrevMonth}>
            &#9664;
          </button>
          <h2>
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button className="calendarBtn" onClick={goToNextMonth}>
            &#9654;
          </button>
        </div>

        {/* Weekday labels */}
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div className="days-grid">{days}</div>
      </div>

      {/* Today button */}
      <button className="today-btn" onClick={goToToday}>
        Today
      </button>

      {/* Selected date display */}
      {selectedDate && (
        <div className="selected-date">
          Selected Date: <strong>{selectedDate.toDateString()}</strong>
        </div>
      )}
    </div>
  );
}

/*
  ── ALTERNATIVE: Simpler Calendar (no selection) ─────────────────

  A minimal version that only highlights today, no selection state.
  Uses null-padded number array instead of ReactNode[].

  function Calendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay: number = new Date(year, month, 1).getDay();
    const daysInMonth: number = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // null = empty slot, number = day
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    const isToday = (day: number | null): boolean =>
      day !== null &&
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀</button>
          <h3>{currentDate.toLocaleString("default", { month: "long" })} {year}</h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>▶</button>
        </div>

        <div className="weekdays">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="days-grid">
          {days.map((day, index) => (
            <div key={index} className={`day ${isToday(day) ? "today" : ""}`}>
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  }
*/
