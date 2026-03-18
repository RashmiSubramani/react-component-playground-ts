import React, { useState } from "react";

function GuessTheNumber() {
  const generateRandom = () => Math.floor(Math.random() * 100) + 1;
  const [inputValue, setInputValue] = useState("");
  const [numberToGuess, setNumberToGuess] = useState(generateRandom);
  const [attempts, setNoOfAttempts] = useState(0);
  const [message, setMessage] = useState("");

  // Function to handle guess checking
  const handleGuess = () => {
    const num = parseInt(inputValue);

    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("Please enter a number between 1 and 100");
      return;
    }

    setNoOfAttempts(attempts + 1);

    if (num === numberToGuess) {
      setMessage(
        `Congratulations! You guessed the number in ${attempts + 1} attempts.`
      );
    } else if (num < numberToGuess) {
      setMessage("Too low! Try again");
    } else {
      setMessage("Too high! Try again");
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setNumberToGuess(generateRandom());
    setInputValue("");
    setMessage("");
    setNoOfAttempts(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px 0",
      }}
    >
      <h2>Guess the Number</h2>
      <input
        placeholder="Enter a number between 1 and 100"
        style={{ width: "300px", padding: "5px" }}
        id="guess-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div>
        <button onClick={handleGuess}>Check Guess</button>
        <button onClick={resetGame}>Reset Game</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default GuessTheNumber;
