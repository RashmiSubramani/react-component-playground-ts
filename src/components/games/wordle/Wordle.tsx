import { useState, useEffect } from "react";
import "./styles.css";

const WORD_LIST = ["apple", "grape", "melon", "berry", "peach", "mango"];

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

type Guess = {
  word: string;
  colors: string[];
};

function getLetterColors(guess: string, targetWord: string): string[] {
  const colors = Array(WORD_LENGTH).fill("grey");
  const targetLetters = targetWord.split("");

  guess.split("").forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      colors[i] = "green";
      targetLetters[i] = "";
    }
  });

  guess.split("").forEach((letter, i) => {
    if (colors[i] === "grey") {
      const idx = targetLetters.indexOf(letter);
      if (idx !== -1) {
        colors[i] = "yellow";
        targetLetters[idx] = "";
      }
    }
  });

  return colors;
}

function Grid({ guesses, currentGuess }: { guesses: Guess[]; currentGuess: string }) {
  const emptyRows = MAX_GUESSES - guesses.length - 1;

  return (
    <div className="gridWordle">
      {guesses.map((g, i) => (
        <div key={i} className="rowWordle">
          {g.word.split("").map((letter, j) => (
            <div key={j} className={`cellWordle ${g.colors[j]}`}>
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
      ))}

      {!guesses.length || emptyRows >= 0 ? (
        <div className="rowWordle">
          {Array.from({ length: WORD_LENGTH }).map((_, i) => (
            <div key={i} className="cellWordle">
              {currentGuess[i]?.toUpperCase() || ""}
            </div>
          ))}
        </div>
      ) : null}

      {Array.from({ length: emptyRows >= 0 ? emptyRows : 0 }).map((_, i) => (
        <div key={i} className="rowWordle">
          {Array.from({ length: WORD_LENGTH }).map((_, j) => (
            <div key={j} className="cellWordle"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Keyboard({ handleKeyPress }: { handleKeyPress: (key: string) => void }) {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {i === 2 && (
            <button
              className="key wide"
              onClick={() => handleKeyPress("Enter")}
            >
              Enter
            </button>
          )}
          {row.split("").map((key) => (
            <button
              key={key}
              className="key"
              onClick={() => handleKeyPress(key)}
            >
              {key.toUpperCase()}
            </button>
          ))}
          {i === 2 && (
            <button
              className="key wide"
              onClick={() => handleKeyPress("Backspace")}
            >
              Del
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Wordle() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === "Enter") {
      if (currentGuess.length !== WORD_LENGTH) return alert("Word too short");

      const colors = getLetterColors(currentGuess, TARGET_WORD);

      const newGuesses = [...guesses, { word: currentGuess, colors }];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === TARGET_WORD || newGuesses.length === MAX_GUESSES) {
        setGameOver(true);
      }
    } else if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }
  };

  useEffect(() => {
    const handlePhysicalKey = (e: KeyboardEvent) => handleKeyPress(e.key);
    window.addEventListener("keydown", handlePhysicalKey);
    return () => window.removeEventListener("keydown", handlePhysicalKey);
  }, [currentGuess, guesses, gameOver]);

  return (
    <div className="wordle-app">
      <h1>Wordle</h1>

      <Grid guesses={guesses} currentGuess={currentGuess} />

      {gameOver && (
        <h2>
          {guesses[guesses.length - 1]?.word === TARGET_WORD
            ? "You Win!"
            : `Game Over! Word was ${TARGET_WORD.toUpperCase()}`}
        </h2>
      )}

      <Keyboard handleKeyPress={handleKeyPress} />
    </div>
  );
}
