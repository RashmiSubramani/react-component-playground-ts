/*
  STAR RATING (Click to Rate + Hover Preview)
  ----------------------------------------------
  Difficulty: Easy
  Concepts: useState for rating & hover state, Array.from for star generation,
            conditional className via ternary, FaStar / FaRegStar icon toggle,
            mouse enter/leave for hover preview

  How it works:
  1. Hover over a star to preview that rating (stars fill up to hovered index)
  2. Click a star to lock in the rating
  3. Move the mouse away — display reverts to the locked rating
  4. "Reset" clears the rating back to 0
*/

import { useState } from "react";
import { FaStar, FaRegStar, FaUndo } from "react-icons/fa";
import "./styles.css";

// ─── Constants ──────────────────────────────────────────────────────

const TOTAL_STARS = 5;
const STARS = Array.from({ length: TOTAL_STARS }, (_, i) => i + 1);

// ─── Component ──────────────────────────────────────────────────────

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  // The displayed fill level: hover preview takes priority over locked rating
  const activeFill = hovered || rating;

  return (
    <div className="sr-container">
      <h2>Star Rating</h2>

      <div
        className="sr-stars"
        onMouseLeave={() => setHovered(0)}
      >
        {STARS.map((star) => (
          <button
            key={star}
            className={`sr-star ${star <= activeFill ? "sr-star-active" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            aria-label={`Rate ${star} out of ${TOTAL_STARS}`}
          >
            {star <= activeFill ? <FaStar size={28} /> : <FaRegStar size={28} />}
          </button>
        ))}
      </div>

      <p className="sr-label">
        {rating > 0
          ? `Current Rating: ${rating} / ${TOTAL_STARS}`
          : "No rating selected"}
      </p>

      <button className="sr-reset" onClick={() => setRating(0)}>
        <FaUndo size={12} /> Reset Rating
      </button>
    </div>
  );
}

export default StarRating;
