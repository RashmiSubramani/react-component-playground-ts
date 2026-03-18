import { useEffect, useState } from "react";
import "./styles.css";

const CARD_VALUES = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝"];

const shuffleArray = (array: string[]): string[] => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);

  useEffect(() => {
    const doubled = [...CARD_VALUES, ...CARD_VALUES];
    setCards(shuffleArray(doubled));
  }, []);

  const handleCardClick = (index: number) => {
    if (
      disableAll ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisableAll(true);
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
        setDisableAll(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setDisableAll(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const doubled = [...CARD_VALUES, ...CARD_VALUES];
    setCards(shuffleArray(doubled));
    setFlippedCards([]);
    setMatchedCards([]);
    setDisableAll(false);
  };

  return (
    <div className="memory-game">
      <h2>Memory Matching Game</h2>

      <div className="boardMemory">
        {cards.map((card, index) => {
          const isFlipped =
            flippedCards.includes(index) || matchedCards.includes(index);
          return (
            <div
              key={index}
              className={`cardMemory ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card}</div>
              </div>
            </div>
          );
        })}
      </div>

      {matchedCards.length === cards.length && cards.length > 0 && (
        <div className="winner">
          <h3>You Won!</h3>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
}
