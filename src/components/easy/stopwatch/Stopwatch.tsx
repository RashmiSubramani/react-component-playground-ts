/*
  STOPWATCH (Start / Stop / Reset)
  -----------------------------------
  Difficulty: Easy
  Concepts: ReturnType<typeof setInterval> for typed interval ref,
            conditional setInterval (only when running), useEffect cleanup,
            padStart MM:SS formatting

  How it works:
  1. Click "Start" to begin counting seconds
  2. Click "Stop" to pause the timer (resumes from where it left off)
  3. Click "Reset" to stop and return to 00:00
*/

import { useState, useEffect } from "react";
import { FaPlay, FaStop, FaUndo } from "react-icons/fa";
import "./styles.css";

// ─── Helpers ────────────────────────────────────────────────────────

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// ─── Component ──────────────────────────────────────────────────────

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  function startTimer(): void {
    setIsRunning(true);
  }

  function stopTimer(): void {
    setIsRunning(false);
  }

  function resetTimer(): void {
    setIsRunning(false);
    setSeconds(0);
  }

  return (
    <div className="sw-container">
      <h2>Stopwatch</h2>

      <div className="sw-display">{formatTime(seconds)}</div>

      <div className="sw-actions">
        <button
          className="sw-btn sw-start-btn"
          onClick={startTimer}
          disabled={isRunning}
        >
          <FaPlay size={12} /> Start
        </button>
        <button
          className="sw-btn sw-stop-btn"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          <FaStop size={12} /> Stop
        </button>
        <button className="sw-btn sw-reset-btn" onClick={resetTimer}>
          <FaUndo size={12} /> Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
