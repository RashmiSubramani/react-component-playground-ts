import React, { useState } from "react";
import "./styles.css";

export default function LeapYear() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function checkLeapYear() {
    // if (!value) {
    //   setError("Please enter a year")
    // }
    // else if (value % 400 === 0 || (value % 4 === 0 && value % 100 !== 0)) {
    //   setError("");
    //   setResult(`${value} is a Leap Year`)
    // } else {
    //   setResult(`${value} is not a Leap Year`)
    // }
    const year = parseInt(value, 10);

    if (!value) {
      setError("Please enter a year");
      setResult("");
      return;
    }

    if (isNaN(year)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    setError(""); // clear previous error

    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      setResult(`${year} is a Leap Year`);
    } else {
      setResult(`${year} is not a Leap Year`);
    }
  }

  return (
    <div className="container">
      <h1>Leap Year Checker</h1>
      <label data-testid="label-date" className="yearLabel">
        Enter a year:
      </label>
      <input
        type="text"
        data-testid="year-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="yearInput"
      />

      <button
        data-testid="check-btn"
        onClick={() => checkLeapYear()}
        className="checkBtn"
      >
        Check
      </button>
      {result && <p data-testid="result">{result}</p>}
      {error && <p data-testid="error-msg">{error}</p>}
    </div>
  );
}
