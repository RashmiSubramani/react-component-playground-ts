import React, { useState } from "react";
import "./styles.css";

function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [ageResult, setAgeResult] = useState(null);

  function calculateAge() {
    if (!birthdate) {
      setError("Please select a date");
      setAgeResult(null);
      return;
    }

    const today = new Date();
    const birth = new Date(birthdate);

    if (birth > today) {
      setError("Birthdate cannot be in the future");
      setAgeResult(null);
      return;
    }

    setError(null);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    //   🔴 Problem Case
    // Example:
    // Birthdate: 20 Jan 2000
    // Today: 10 Feb 2024

    // Initial calculation
    // years  = 2024 - 2000 = 24
    // months = 1 - 0 = 1
    // days   = 10 - 20 = -10 ❌

    // 👉 Negative days means:
    // You haven’t completed the full month yet
    // So you must borrow days from the previous month.

    // ✅ if (days < 0) explained
    // Step 1: Reduce one month
    // months--;

    // Why?
    // Because the current month isn’t fully completed yet.

    // So:
    // months = 1 - 1 = 0

    // Step 2: Find how many days are in the previous month
    // const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    // 🧠 Trick:
    // new Date(year, month, 0) → last day of previous month

    // Example:
    // new Date(2024, 1, 0) → Jan 31, 2024

    // So:
    // prevMonth.getDate() = 31

    // Step 3: Add borrowed days
    // days += prevMonth.getDate();
    // days = -10 + 31 = 21

    // ✅ Now days are positive and correct.
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const result = `${years} years, ${months} months, ${days} days`;
    setAgeResult(result);
  }

  return (
    <div className="conatiner">
      <h2 className="title"></h2>

      <label for="birthdate" data-testid="label-birthdate" className="label">
        Enter/Select a birthdate:
      </label>
      <input
        id="birthdate"
        type="date"
        className="input-date"
        data-testid="input-birthdate"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <button
        className="btn-calc"
        data-testid="btn-calculate"
        onClick={calculateAge}
      >
        Calculate Age
      </button>
      {error ? (
        <p className="error-msg" data-testid="error-msg">
          {error}
        </p>
      ) : (
        <></>
      )}
      {ageResult ? (
        <p className="age-result" data-testid="age-result">
          {ageResult}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AgeCalculator;
