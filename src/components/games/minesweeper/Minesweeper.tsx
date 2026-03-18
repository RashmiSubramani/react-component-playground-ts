import { useState } from "react";
import "./styles.css";

const ROWS = 8;
const COLS = 8;
const MINES = 10;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  count: number;
};

const createBoard = (): Cell[][] =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      count: 0,
    }))
  );

const placeMines = (board: Cell[][]) => {
  let placed = 0;

  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);

    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }
};

const calculateCounts = (board: Cell[][]) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;

      let count = 0;

      directions.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nr < ROWS &&
          nc >= 0 &&
          nc < COLS &&
          board[nr][nc].isMine
        ) {
          count++;
        }
      });

      board[r][c].count = count;
    }
  }
};

const initGame = (): Cell[][] => {
  const board = createBoard();
  placeMines(board);
  calculateCounts(board);
  return board;
};

export default function Minesweeper() {
  const [board, setBoard] = useState(initGame);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const revealCell = (r: number, c: number, newBoard: Cell[][]) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || newBoard[r][c].isRevealed) {
      return;
    }

    newBoard[r][c].isRevealed = true;

    if (newBoard[r][c].count === 0 && !newBoard[r][c].isMine) {
      revealCell(r - 1, c, newBoard);
      revealCell(r + 1, c, newBoard);
      revealCell(r, c - 1, newBoard);
      revealCell(r, c + 1, newBoard);
    }
  };

  const handleClick = (r: number, c: number) => {
    if (gameOver || board[r][c].isRevealed) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (newBoard[r][c].isMine) {
      newBoard.forEach((row) =>
        row.forEach((cell) => {
          if (cell.isMine) cell.isRevealed = true;
        })
      );
      setGameOver(true);
    } else {
      revealCell(r, c, newBoard);
      checkWin(newBoard);
    }

    setBoard(newBoard);
  };

  const checkWin = (b: Cell[][]) => {
    let revealedSafeCells = 0;

    b.forEach((row) =>
      row.forEach((cell) => {
        if (cell.isRevealed && !cell.isMine) {
          revealedSafeCells++;
        }
      })
    );

    if (revealedSafeCells === ROWS * COLS - MINES) {
      setWon(true);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setBoard(initGame());
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="minesweeper-app">
      <h1>Minesweeper</h1>

      <div className="gridMinesweeper">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`cellMinesweeper ${cell.isRevealed ? "revealed" : ""}`}
              onClick={() => handleClick(r, c)}
            >
              {cell.isRevealed && (cell.isMine ? "💣" : cell.count || "")}
            </div>
          ))
        )}
      </div>

      {gameOver && (
        <div className="statusMinesweeper">
          {won ? "You Win!" : "Game Over"}
        </div>
      )}

      <button onClick={resetGame}>Restart</button>
    </div>
  );
}
