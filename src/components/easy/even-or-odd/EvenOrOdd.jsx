import React, { useState } from "react";
import "./styles.css";

function EvenOrOddChecker() {
  const [value, setValue] = useState();
  const [loading, setloading] = useState(false);
  const [evenOrOdd, setEvenOrOdd] = useState("");

  function onButtonClick() {
    const num = Number(value);
    if (isNaN(num)) {
      setEvenOrOdd("Please enter a valid number.");
      return;
    }
    setloading(true);
    setTimeout(() => {
      if (value.trim() % 2 === 0) {
        setEvenOrOdd(`The number ${value} is even.`);
      } else {
        setEvenOrOdd(`The number ${value} is odd.`);
      }
      setloading(false);
    }, 500);
  }
  return (
    <div className="even-odd-container">
      <h1 className="title">Even or Odd Checker</h1>

      <input
        className="number-input"
        type="text"
        placeholder="Enter a number"
        data-testid="number-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value.trim());
        }}
      />

      <button
        className="check-button"
        data-testid="check-button"
        onClick={onButtonClick}
      >
        Check
      </button>

      {loading && <div data-testid="loading">Checking...</div>}
      {!loading && evenOrOdd && (
        <div className="result-area">
          <div className="result" data-testid="result">
            {evenOrOdd}
          </div>
        </div>
      )}
    </div>
  );
}

export default EvenOrOddChecker;
