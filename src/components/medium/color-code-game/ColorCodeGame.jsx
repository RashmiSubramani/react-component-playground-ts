import { useState } from "react";
import "./styles.css";

export default function ColorCodeGame() {
  const [targetColor, setTargetColor] = useState(generateRandomColor()); // The correct color the user must guess
  const [options, setOptions] = useState(generateOptions(targetColor)); // The three color options shown to the user
  const [result, setResult] = useState(""); // Stores result text: "Correct!" or "Incorrect!"
  const [gameOver, setGameOver] = useState(false); // Locks game once user chooses an option

  // Generates a random HEX color like "#A1B2C3"
  function generateRandomColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return "#" + hex.padStart(6, "0").toUpperCase();
  }

  // Builds 3 total options: the correct one + 2 random wrong colors
  // Ensures no duplicates & shuffles them
  function generateOptions(correctColor) {
    const options = [correctColor]; // first include correct color

    // Add 2 more unique colors
    while (options.length < 3) {
      const color = generateRandomColor();
      if (!options.includes(color)) options.push(color);
    }

    // Shuffle randomly so correct option is not always first
    return options.sort(() => Math.random() - 0.5);
  }

  // When user clicks a color box
  // Checks if it's correct or wrong & locks the game
  function handleGuess(color) {
    if (gameOver) return; // prevent clicking after result

    if (color === targetColor) {
      setResult("Correct!");
    } else {
      setResult("Incorrect!");
    }

    setGameOver(true);
  }

  // Resets everything for a new game round
  function resetGame() {
    const newColor = generateRandomColor();
    setTargetColor(newColor);
    setOptions(generateOptions(newColor));
    setResult("");
    setGameOver(false);
  }

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2>🎨 Color Code Game</h2>

      {/* Display the target HEX code */}
      <h3 data-testid="color-code">{targetColor}</h3>

      {/* Render all 3 color options */}
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {options.map((color) => (
          <div
            key={color}
            role="button" // required by challenge
            aria-label={`Color option ${color}`} // required by challenge
            onClick={() => handleGuess(color)}
            style={{
              width: 100,
              height: 100,
              background: color,
              borderRadius: 8,
              cursor: "pointer",
              border: "2px solid #000",
            }}
            data-testid={`option-${color}`} // for testing
          ></div>
        ))}
      </div>

      {/* Show result text */}
      {result && (
        <h3 data-testid="result" style={{ marginTop: 20 }}>
          {result}
        </h3>
      )}

      {/* Show reset button only after the round ends */}
      {gameOver && (
        <button
          onClick={resetGame}
          style={{
            marginTop: 20,
            padding: "8px 16px",
            fontSize: 16,
            cursor: "pointer",
          }}
          data-testid="play-again"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
