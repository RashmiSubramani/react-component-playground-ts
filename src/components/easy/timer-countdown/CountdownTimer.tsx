/*
  COUNTDOWN TIMER
  ----------------
  Difficulty: Easy
  Concepts: typed return type (TimeLeft | null), useEffect with setInterval + cleanup,
            conditional rendering on null, Date.getTime() for millisecond math

  How the math works:
  - distance = target timestamp − now timestamp (in ms)
  - days    = floor(distance / ms_per_day)
  - hours   = floor(remaining_after_days / ms_per_hour)
  - minutes = floor(remaining_after_hours / ms_per_minute)
  - seconds = floor(remaining_after_minutes / ms_per_second)
  - If distance < 0, timer is up → return null
*/

import { useEffect, useState } from "react";
import "./styles.css";

// Type for the computed time remaining
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Pure function — computes time left from now until the target date string
// Returns null when the countdown has expired
function getTimeLeft(date: string): TimeLeft | null {
  const now: number = new Date().getTime();
  const distance: number = new Date(date).getTime() - now;

  if (distance < 0) return null;

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export default function CountdownTimer() {
  const targetDate = "2026-12-31T23:59:59";
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = getTimeLeft(targetDate);
      setTimeLeft(updatedTime);

      // Stop ticking once expired
      if (!updatedTime) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Expired state
  if (!timeLeft) return <div>Time's up!</div>;

  return (
    <div className="countdownContainer">
      <button className="timer">{timeLeft.days}d</button>
      <span className="colon">:</span>
      <button className="timer">{timeLeft.hours}h</button>
      <span className="colon">:</span>
      <button className="timer">{timeLeft.minutes}m</button>
      <span className="colon">:</span>
      <button className="timer">{timeLeft.seconds}s</button>
    </div>
  );
}
