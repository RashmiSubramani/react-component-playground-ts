/*
  CINEMA HALL BOOKING (Seat Selection Grid)
  -------------------------------------------
  Difficulty: Easy
  Concepts: typed seat ID (string), Array.from grid generation,
            includes-based state toggle, spread merge on book,
            String.fromCharCode for row letters

  How it works:
  1. 10×10 grid of seats labelled A0–J9
  2. Click a seat to select/unselect (toggle)
  3. "Book Seats" moves selected → booked (greyed out, unclickable)
  4. "Clear" unselects without booking
  5. "Reset" clears everything
*/

import { useState } from "react";
import "./styles.css";

// ─── Constants ──────────────────────────────────────────────────────

const ROW = 10;
const COL = 10;

// ─── Helpers ────────────────────────────────────────────────────────

/** Converts row/col indices to a seat label like "A0", "B3", etc. */
function getSeatNumber(rowIdx: number, colIdx: number): string {
  return `${String.fromCharCode(65 + rowIdx)}${colIdx}`;
}

// ─── Component ──────────────────────────────────────────────────────

function CinemaHallBooking() {
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  function selectSeat(seatNumber: string): void {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber],
    );
  }

  function bookSeats(): void {
    if (selectedSeats.length === 0) {
      window.alert("Please select at least one seat");
      return;
    }

    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
  }

  function clearSeats(): void {
    setSelectedSeats([]);
  }

  function reset(): void {
    setBookedSeats([]);
    setSelectedSeats([]);
  }

  function getSeatClassName(seatNumber: string): string {
    if (bookedSeats.includes(seatNumber)) return "ch-disabled";
    if (selectedSeats.includes(seatNumber)) return "ch-selected";
    return "ch-seat";
  }

  return (
    <div className="ch-container">
      <h2>Cinema Hall</h2>

      <div className="ch-actions">
        <button className="ch-btn ch-book" onClick={bookSeats}>
          Book Seats
        </button>
        <button className="ch-btn" onClick={clearSeats}>
          Clear
        </button>
        <button className="ch-btn ch-reset" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="ch-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="ch-row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              const seatNumber = getSeatNumber(rowIdx, colIdx);

              return (
                <div
                  key={colIdx}
                  className={`ch-col ${getSeatClassName(seatNumber)}`}
                  onClick={() => selectSeat(seatNumber)}
                >
                  {seatNumber}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="ch-screen">SCREEN</div>
    </div>
  );
}

export default CinemaHallBooking;
