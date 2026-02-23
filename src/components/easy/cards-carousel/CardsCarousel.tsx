/*
  CARDS CAROUSEL (Index-based Navigation)
  ------------------------------------------
  Difficulty: Easy
  Concepts: typed Card object, index-based navigation with boundary guards,
            disabled buttons at start/end, simple prev/next pattern

  Minimal carousel — shows one card at a time with Previous/Next controls.
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type Card = {
  title: string;
  description: string;
};

// ─── Data ─────────────────────────────────────────────────────────

const cards: Card[] = [
  { title: "Card 1", description: "Description for Card 1" },
  { title: "Card 2", description: "Description for Card 2" },
  { title: "Card 3", description: "Description for Card 3" },
];

// ─── Component ────────────────────────────────────────────────────

function CardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!cards || cards.length === 0) {
    return <div>No cards available</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="cc-carousel">
      <div className="cc-card">
        <h2>{currentCard.title}</h2>
        <p>{currentCard.description}</p>
      </div>

      <div className="cc-controls">
        <button
          className="cc-btn"
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <span className="cc-counter">
          {currentIndex + 1} of {cards.length}
        </span>

        <button
          className="cc-btn"
          onClick={() => setCurrentIndex((i) => i + 1)}
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CardsCarousel;
