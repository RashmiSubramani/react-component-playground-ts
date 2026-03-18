import React, { useState } from "react";
import "./styles.css";

export default function GetWeekday() {
  const [dateValue, setDateValue] = useState("");
  const [weekday, setWeekday] = useState("");

  function getWeekDay(dateInput) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateInput);
    return days[date.getDay()];
  }

  function handleFindDay() {
    if (dateValue) {
      setWeekday(getWeekDay(dateValue));
    } else {
      setWeekday("");
    }
  }

  return (
    <div className="container">
      <h1>Get Weekday</h1>
      <input
        type="date"
        data-testid="date-input"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />
      <button data-testid="find-day-btn" onClick={handleFindDay}>
        Find Day
      </button>
      {weekday && (
        <p className="result" data-testid="result">
          {`That date falls on ${weekday}`}
        </p>
      )}
    </div>
  );
}
