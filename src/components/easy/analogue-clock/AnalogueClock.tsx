/*
  ANALOGUE CLOCK
  ---------------
  Difficulty: Easy
  Concepts: useState<Date>, useEffect with setInterval + cleanup,
            trigonometry for number positions (Math.sin/cos),
            inline styles with computed rotation degrees

  How the rotation math works:
  - Hour hand:   (hours % 12) * 30° + minutes * 0.5° − 90°
  - Minute hand: minutes * 6° + seconds * 0.1° − 90°
  - Second hand: seconds * 6° − 90°
  - Subtract 90° because CSS rotate(0deg) points right (→) but 12 o'clock is up (↑)

  Number positions use polar → cartesian conversion:
    x = center + radius * sin(angle)
    y = center − radius * cos(angle)
*/

import { useEffect, useState } from "react";
import "./styles.css";

// Type for the computed position of each clock number (1–12)
type ClockNumber = {
  num: number;
  x: number;
  y: number;
};

export default function AnalogueClock() {
  const [time, setTime] = useState<Date>(new Date());

  // Tick every second, cleanup interval on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours: number = time.getHours();
  const minutes: number = time.getMinutes();
  const seconds: number = time.getSeconds();

  // Calculate degrees (subtract 90 to make 0° point to 12 o'clock)
  const hourDeg: number = (hours % 12) * 30 + minutes * 0.5 - 90;
  const minuteDeg: number = minutes * 6 + seconds * 0.1 - 90;
  const secondDeg: number = seconds * 6 - 90;

  // Generate number positions using polar → cartesian conversion
  const numbers: ClockNumber[] = [];
  const radius = 120;
  const center = 140;
  for (let i = 1; i <= 12; i++) {
    const angle: number = (i * 30 * Math.PI) / 180;
    const x: number = center + radius * Math.sin(angle);
    const y: number = center - radius * Math.cos(angle);
    numbers.push({ num: i, x, y });
  }

  return (
    <div className="clock">
      <div
        className="hand hour"
        style={{ transform: `rotate(${hourDeg}deg)` }}
      />
      <div
        className="hand minute"
        style={{ transform: `rotate(${minuteDeg}deg)` }}
      />
      <div
        className="hand second"
        style={{ transform: `rotate(${secondDeg}deg)` }}
      />

      <div className="center-dot" />

      {numbers.map(({ num, x, y }) => (
        <div
          key={num}
          className="number"
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
