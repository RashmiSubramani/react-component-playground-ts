/*
  COUNT-UP TIMER (Stopwatch)
  ---------------------------
  Difficulty: Easy
  Concepts: useRef<ReturnType<typeof setInterval>> for timer ID,
            conditional setInterval (only when isRunning),
            padStart for zero-padded display, disabled button state

  How it works:
  - secondsElapsed increments every 1s when running
  - Start/Pause toggles isRunning → useEffect creates or clears the interval
  - Reset stops the timer and resets to 0
  - Display converts total seconds → HH:MM:SS via math
*/

import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function CountUpTimer() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // useRef to hold the interval ID — typed with ReturnType<typeof setInterval>
  // This avoids the NodeJS.Timeout vs number mismatch between browser and Node
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Convert total seconds → hours, minutes, seconds
  const hours: number = Math.floor(secondsElapsed / 3600);
  const minutes: number = Math.floor((secondsElapsed % 3600) / 60);
  const seconds: number = secondsElapsed % 60;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  return (
    <div className="countupWrapper">
      <h1>Count-Up Timer</h1>

      <div className="countupDisplay">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className="countupControls">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="actionButton"
        >
          Start
        </button>

        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="actionButton"
        >
          Pause
        </button>

        <button onClick={handleReset} className="actionButton">
          Reset
        </button>
      </div>
    </div>
  );
}
