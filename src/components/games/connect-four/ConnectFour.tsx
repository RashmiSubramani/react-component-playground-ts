import { useState } from "react";
import "./styles.css";

const ROWS = 6;
const COLS = 7;

type Player = "red" | "yellow";
type Cell = Player | null;

export default function ConnectFour() {
  const [board, setBoard] = useState<Cell[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("red");
  const [winner, setWinner] = useState<Player | null>(null);

  const checkWinner = (b: Cell[][]): Player | null => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const player = b[row][col];
        if (!player) continue;

        for (const [dx, dy] of directions) {
          let count = 0;
          for (let k = 0; k < 4; k++) {
            const r = row + dx * k;
            const c = col + dy * k;

            if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;

            if (b[r][c] === player) count++;
          }
          if (count === 4) return player;
        }
      }
    }
    return null;
  };

  const handleClick = (col: number) => {
    if (winner) return;

    const row = [...board].reverse().findIndex((r) => r[col] === null);
    if (row === -1) return;

    const actualRow = ROWS - 1 - row;

    const newBoard = board.map((r) => [...r]);
    newBoard[actualRow][col] = currentPlayer;

    const win = checkWinner(newBoard);
    if (win) setWinner(win);

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
  };

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPlayer("red");
    setWinner(null);
  };

  return (
    <div className="connect-four-container">
      <h2>Connect Four</h2>

      {winner ? (
        <h3>Winner: {winner}</h3>
      ) : (
        <h3>Current Player: {currentPlayer}</h3>
      )}

      <div className="board-connect-four">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row-connect-four">
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className="cell-connect-four"
                onClick={() => handleClick(cIdx)}
              >
                <div className={`disc ${cell ? cell : ""}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={resetGame} className="reset-btn-connect-four">
        Reset Game
      </button>
    </div>
  );
}
