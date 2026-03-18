import React, { useState } from "react";
import "./styles.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Track whose turn it is → true = X, false = O
  const [winner, setWinner] = useState(null); // Winner state (X or O)
  const [isDraw, setIsDraw] = useState(false); // Draw state when no winner + no empty squares

  const handleClick = (index) => {
    // ❌ Stop if:
    // - cell is already filled
    // - winner already found
    // - match is a draw
    if (board[index] || winner || isDraw) return;

    // Copy board and update clicked cell
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O"; // Put X or O
    setBoard(newBoard);

    // Check if this move creates a winner
    const win = calculateWinner(newBoard);

    if (win) {
      setWinner(win); // Update winner
      return; // Stop play
    }

    // Check draw: all cells filled + no winner
    if (!newBoard.includes(null)) {
      setIsDraw(true);
      return;
    }

    // Toggle turn (X → O or O → X)
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  function getStatus(winner, isDraw, isXNext) {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Next Player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            id={`cell-${index}`} // REQUIRED BY NAMASTEDEV
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      {/* STATUS MESSAGE — REQUIRED ID */}
      <h2 id="status">{getStatus(winner, isDraw, isXNext)}</h2>

      {/* RESTART BUTTON — REQUIRED ID */}
      <button id="restart" className="restart-button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}

// Function to check winning combinations
function calculateWinner(board) {
  // All possible 3-in-a-row patterns
  const patterns = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  // Loop through patterns and check if X or O matches any
  for (let [a, b, c] of patterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return winner (X or O)
    }
  }

  return null; // No winner
}

export default TicTacToe;
