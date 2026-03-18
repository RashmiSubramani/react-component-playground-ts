import { useEffect, useState } from "react";
import {
  createBoard,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  canMove,
} from "./gameLogic";
import "./styles.css";

export default function Game2048() {
  const [board, setBoard] = useState(() => {
    let b = createBoard();
    b = addRandomTile(b);
    b = addRandomTile(b);
    return b;
  });
  const [gameOver, setGameOver] = useState(false);

  const handleMove = (key: string) => {
    if (gameOver) return;

    let newBoard: number[][] | undefined;
    if (key === "ArrowLeft") newBoard = moveLeft(board);
    if (key === "ArrowRight") newBoard = moveRight(board);
    if (key === "ArrowUp") newBoard = moveUp(board);
    if (key === "ArrowDown") newBoard = moveDown(board);

    if (!newBoard) return;

    if (JSON.stringify(board) === JSON.stringify(newBoard)) return;

    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleMove(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver]);

  useEffect(() => {
    if (!canMove(board)) {
      setGameOver(true);
    }
  }, [board]);

  const restartGame = () => {
    let b = createBoard();
    b = addRandomTile(b);
    b = addRandomTile(b);
    setBoard(b);
    setGameOver(false);
  };

  return (
    <div className="game2048">
      <h1>2048</h1>

      <div className="grid2048">
        {board.flat().map((cell, idx) => (
          <div key={idx} className={`cell2048 tile-${cell}`}>
            {cell !== 0 ? cell : ""}
          </div>
        ))}
      </div>

      <p className="hint">Use arrow keys</p>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}
