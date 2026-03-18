import { useState, useEffect } from "react";
import "./styles.css";

type Card = {
  id: number;
  value: string;
  revealed: boolean;
  matched: boolean;
};

const initialEmojis = ["❤️", "🍀", "🌎", "🍎", "⚽️", "🚗", "⛵️", "💎"];

export default function MatchPairGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const pairedEmojis = [...initialEmojis, ...initialEmojis];

    const shuffled: Card[] = pairedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        value: emoji,
        revealed: false,
        matched: false,
      }));

    setCards(shuffled);
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setWon(false);
  };

  const handleClick = (card: Card) => {
    if (card.revealed || card.matched || (firstCard && secondCard)) {
      return;
    }

    const updatedCard = cards.map((c) =>
      c.id === card.id ? { ...c, revealed: true } : c
    );
    setCards(updatedCard);

    if (!firstCard) {
      setFirstCard(card);
      return;
    }

    setSecondCard(card);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    if (firstCard.value === secondCard.value) {
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.value === firstCard.value) {
            return { ...card, matched: true };
          }
          return card;
        })
      );

      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, revealed: false };
            }
            return card;
          })
        );

        resetTurn();
      }, 800);
    }
  }, [firstCard, secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="match-pair-container">
      <h1>Match Pair Game</h1>

      <div className="gridMatchPairGame">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`cardMatchPairGame ${
              card.revealed || card.matched ? "revealed" : ""
            }`}
            onClick={() => handleClick(card)}
          >
            {(card.revealed || card.matched) && card.value}
          </div>
        ))}
      </div>

      <p>Moves: {moves}</p>
      {won && <p className="won">You won!</p>}

      <button onClick={resetGame}>Reset</button>
    </div>
  );
}
