import { useState } from "react";
import "./styles.css";

const initialBoard: (number | null)[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

function isValid(board: (number | null)[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

export default function Sudoku() {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (row: number, col: number, value: string) => {
    const num = Number(value);
    if (num < 1 || num > 9) return;

    if (!isValid(board, row, col, num)) {
      alert("Invalid move");
      return;
    }

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);
  };

  return (
    <div className="sudoku">
      {board.map((row, r) =>
        row.map((cell, c) => (
          <input
            key={`${r}-${c}`}
            value={cell || ""}
            disabled={initialBoard[r][c] !== null}
            onChange={(e) => handleChange(r, c, e.target.value)}
            className="cellSudoku"
          />
        ))
      )}
    </div>
  );
}
