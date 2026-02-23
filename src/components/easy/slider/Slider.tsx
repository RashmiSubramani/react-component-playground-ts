/*
  SLIDER (Range Input)
  ----------------------
  Difficulty: Easy
  Concepts: typed props with defaults (min, max, step),
            React.ChangeEvent<HTMLInputElement>,
            Number() conversion from string input value

  Simple range slider — value displayed above, min/max labels below.
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
};

// ─── Component ────────────────────────────────────────────────────

function Slider({ min = 0, max = 100, step = 1 }: SliderProps) {
  //step - It controls the increment gap between values.Defines how much the value increases or decreases per movement of the slider.
  const [value, setValue] = useState(50);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  return (
    <div className="sl-container">
      <label className="sl-label">
        Value: <strong>{value}</strong>
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="sl-input"
      />

      <div className="sl-range">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function SliderWrapper() {
  return (
    <div>
      <h2>React Slider</h2>
      <Slider min={0} max={100} step={5} />
    </div>
  );
}
