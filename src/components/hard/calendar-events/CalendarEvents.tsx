/*
  CALENDAR EVENT MANAGEMENT (CRUD + Grid)
  ------------------------------------------
  Difficulty: Hard
  Concepts: CalendarEvent type, EventsMap = Record<string, CalendarEvent[]>,
            date-keyed storage (YYYY-MM-DD string keys),
            calendar grid rendering (empty cells + day cells),
            modal add form with validation,
            delete with cleanup (remove key when no events left),
            month navigation, today highlighting

  vs medium/calendar: that one is date selection only.
  This one adds full event CRUD with a modal dialog.
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type CalendarEvent = {
  id: number;
  title: string;
};

// Date string keys like "2026-02-22" → array of events
type EventsMap = Record<string, CalendarEvent[]>;

// ─── Constants ────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Component ────────────────────────────────────────────────────

function CalendarEvents() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventsMap>({});
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [validationError, setValidationError] = useState("");

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  // Number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Day index (0–6) of the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // ─── Month navigation ──────────────────────────────────────────

  function goToPreviousMonth() {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  }

  // ─── Modal handlers ────────────────────────────────────────────

  // ChangeEvent<HTMLInputElement> — typed event from the title input
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEventTitle(e.target.value);
  }

  // ChangeEvent<HTMLInputElement> — typed event from the date input
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEventDate(e.target.value);
  }

  function openAddEventModal() {
    setValidationError("");
    setEventTitle("");
    setEventDate("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setValidationError("");
  }

  // ─── Event CRUD ─────────────────────────────────────────────────

  function saveEvent() {
    if (!eventTitle.trim()) {
      setValidationError("Please enter event title");
      return;
    }
    if (!eventDate) {
      setValidationError("Please select event date");
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: eventTitle,
    };

    setEvents((prev) => ({
      ...prev,
      [eventDate]: prev[eventDate]
        ? [...prev[eventDate], newEvent]
        : [newEvent],
    }));

    closeModal();
  }

  function deleteEvent(eventId: number, date: string) {
    setEvents((prev) => {
      const updatedEvents = prev[date].filter((e) => e.id !== eventId);

      // Remove key entirely if no events left for that date
      if (updatedEvents.length === 0) {
        const copy = { ...prev };
        delete copy[date];
        return copy;
      }

      return { ...prev, [date]: updatedEvents };
    });
  }

  // ─── Helpers ────────────────────────────────────────────────────

  function isToday(day: number): boolean {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  }

  // Build date key string: "YYYY-MM-DD"
  function getDateKey(day: number): string {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function getEventsForDay(day: number): CalendarEvent[] {
    return events[getDateKey(day)] || [];
  }

  // ─── Render calendar grid ──────────────────────────────────────

  function renderCalendarDays(): React.ReactNode[] {
    const days: React.ReactNode[] = [];

    // Empty cells before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="ce-day ce-day-empty" />);
    }

    // Actual day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const dateKey = getDateKey(day);

      days.push(
        <div
          key={day}
          className={`ce-day ${isToday(day) ? "ce-today" : ""}`}
        >
          <span className="ce-day-number">{day}</span>
          <div className="ce-events">
            {dayEvents.map((event) => (
              <div key={event.id} className="ce-event-item">
                <span>{event.title}</span>
                <button
                  className="ce-delete-btn"
                  onClick={() => deleteEvent(event.id, dateKey)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>,
      );
    }

    return days;
  }

  // ─── JSX ────────────────────────────────────────────────────────

  return (
    <div className="ce-app">
      {/* Header: month navigation */}
      <div className="ce-header">
        <button className="ce-nav-btn" onClick={goToPreviousMonth}>
          &#8249;
        </button>
        <span>
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <button className="ce-nav-btn" onClick={goToNextMonth}>
          &#8250;
        </button>
      </div>

      <button className="ce-add-btn" onClick={openAddEventModal}>
        + Add Event
      </button>

      {/* Calendar grid */}
      <div className="ce-grid">
        <div className="ce-weekdays">
          {WEEKDAYS.map((d) => (
            <div key={d} className="ce-weekday">
              {d}
            </div>
          ))}
        </div>
        <div className="ce-days-grid">{renderCalendarDays()}</div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="ce-modal-overlay">
          <div className="ce-modal">
            <div className="ce-modal-header">
              <h3>Add Event</h3>
              <button className="ce-close-btn" onClick={closeModal}>
                x
              </button>
            </div>

            <div className="ce-modal-body">
              {validationError && (
                <div className="ce-error">{validationError}</div>
              )}

              <div className="ce-form-group">
                <label>Event Title:</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter event title"
                />
              </div>

              <div className="ce-form-group">
                <label>Event Date:</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="ce-modal-footer">
              <button className="ce-save-btn" onClick={saveEvent}>
                Save Event
              </button>
              <button className="ce-cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarEvents;
