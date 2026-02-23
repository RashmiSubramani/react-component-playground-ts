/*
  HALF STAR RATING (0.5 Increment Rating)
  -------------------------------------------
  Difficulty: Easy
  Concepts: getBoundingClientRect for left/right half detection,
            onMouseMove per-star hover, FaStar / FaStarHalfAlt / FaRegStar
            icon selection, e.currentTarget vs e.target for reliable bounds

  How it works:
  1. Mouse moves over a star — getBoundingClientRect determines left vs right half
  2. Left half → half star (star - 0.5), right half → full star
  3. Click locks the hovered value as the rating
  4. Icons: FaStar (full), FaStarHalfAlt (half), FaRegStar (empty)
*/

import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUndo } from "react-icons/fa";
import "./styles.css";

// ─── Constants ──────────────────────────────────────────────────────

const TOTAL_STARS = 5;
const STARS = Array.from({ length: TOTAL_STARS }, (_, i) => i + 1);

// ─── Component ──────────────────────────────────────────────────────

function StarRatingHalf() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // The displayed fill: hover preview takes priority over locked rating
  const fill = hoverRating || rating;

  function handleMouseMove(
    e: React.MouseEvent<HTMLSpanElement>,
    starValue: number,
  ): void {
    // currentTarget = the span the handler is on (not the SVG child)
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    setHoverRating(percent <= 0.5 ? starValue - 0.5 : starValue);
  }

  function handleMouseLeave(): void {
    setHoverRating(0);
  }

  function handleClick(starValue: number): void {
    // If hovering on the left half → half star, otherwise full star
    const value =
      fill >= starValue - 0.5 && fill < starValue
        ? starValue - 0.5
        : starValue;
    setRating(value);
  }

  function renderIcon(star: number): React.ReactNode {
    if (fill >= star) return <FaStar size={32} />;
    if (fill >= star - 0.5) return <FaStarHalfAlt size={32} />;
    return <FaRegStar size={32} />;
  }

  return (
    <div className="srh-container">
      <h2>Half Star Rating</h2>

      <div className="srh-stars" onMouseLeave={handleMouseLeave}>
        {STARS.map((star) => (
          <span
            key={star}
            className={`srh-star ${fill >= star - 0.5 ? "srh-star-active" : ""}`}
            onClick={() => handleClick(star)}
            onMouseMove={(e) => handleMouseMove(e, star)}
          >
            {renderIcon(star)}
          </span>
        ))}
      </div>

      <p className="srh-label">
        {rating > 0
          ? `Rating: ${rating} / ${TOTAL_STARS}`
          : "No rating selected"}
      </p>

      <button className="srh-reset" onClick={() => setRating(0)}>
        <FaUndo size={12} /> Reset
      </button>
    </div>
  );
}

export default StarRatingHalf;
