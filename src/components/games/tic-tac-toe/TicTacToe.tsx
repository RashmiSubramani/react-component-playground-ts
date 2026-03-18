import { useState, useEffect } from "react";
import "./styles.css";

type Mark = "X" | "O" | null;
type Winner = "X" | "O" | "Tie" | null;

const initialBoard: Mark[] = Array(9).fill(null);

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Mark[]>(initialBoard);
  const [isHumanTurn, setIsHumanTurn] = useState(true);
  const [winner, setWinner] = useState<Winner>(null);

  const checkWinner = (b: Mark[]): Winner => {
    for (const combo of winCombos) {
      const [a, b2, c] = combo;
      if (b[a] && b[a] === b[b2] && b[a] === b[c]) {
        return b[a] as "X" | "O";
      }
    }

    return b.every((cell) => cell) ? "Tie" : null;
  };

  const handleClick = (index: number) => {
    if (!board[index] && isHumanTurn && !winner) {
      const newBoard = [...board];
      newBoard[index] = "X";
      setBoard(newBoard);
      setIsHumanTurn(false);
    }
  };

  useEffect(() => {
    if (winner || isHumanTurn) return;

    const emptyIndices = board
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((idx): idx is number => idx !== null);

    if (emptyIndices.length === 0) return;

    const randomMove =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const newBoard = [...board];
    newBoard[randomMove] = "O";

    const timer = setTimeout(() => {
      setBoard(newBoard);
      setIsHumanTurn(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isHumanTurn, board, winner]);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) setWinner(result);
  }, [board]);

  const resetGame = () => {
    setBoard(initialBoard);
    setIsHumanTurn(true);
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe-app">
      <h1>Tic Tac Toe</h1>

      <div className={`boardTicTacToe ${winner ? "disabled" : ""}`}>
        {board.map((cell, idx) => (
          <div
            key={idx}
            className="cellTicTacToe"
            onClick={() => handleClick(idx)}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="messageTicTacToe">
          {winner === "Tie" ? "It's a Tie!" : `${winner} wins!`}
          <button className="resetTicTacToe" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
