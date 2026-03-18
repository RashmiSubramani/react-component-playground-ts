import React, { useState, useMemo } from "react";
import "./styles.css";

const BOARD_SIZE = 8;

// 8 L-shaped moves of a knight
const knightDirections = [
  [-2, -1], // UP-LEFT
  [-2, 1], // UP-RIGHT
  [2, -1], // DOWN-LEFT
  [2, 1], // DOWN-RIGHT
  [-1, -2], // LEFT-UP
  [1, -2], // LEFT-DOWN
  [-1, 2], // RIGHT-UP
  [1, 2], // RIGHT-DOWN
];

//Based on this,, logic below will be writeen(NOTE: In actual board, it will be reverse but since we are using 2D array, below is how our 2D array will be)
// 0  Black side
// 1
// 2
// 3
// 4
// 5
// 6  White pawns
// 7  White side

const KnightMoves = () => {
  // Which square is being hovered
  const [hovered, setHovered] = useState(null);

  // Compute valid knight moves (only stays inside board)
  const knightMoves = useMemo(() => {
    if (!hovered) return [];

    const [row, col] = hovered;
    const validMoves = [];

    knightDirections.forEach(([dr, dc]) => {
      const r = row + dr;
      const c = col + dc;

      // Only highlight moves inside the chessboard
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        validMoves.push([r, c]);
      }
    });

    return validMoves;
  }, [hovered]);

  return (
    <div className="board" role="grid">
      {Array.from({ length: BOARD_SIZE }).map((_, row) =>
        Array.from({ length: BOARD_SIZE }).map((_, col) => (
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            hovered={hovered}
            knightMoves={knightMoves}
            onHover={setHovered}
          />
        ))
      )}
    </div>
  );
};

export default KnightMoves;

// Single Cell Component
const Cell = React.memo(({ row, col, hovered, knightMoves, onHover }) => {
  const isHovered = hovered?.[0] === row && hovered?.[1] === col;

  const isKnightMoveTarget = knightMoves.some(
    ([r, c]) => r === row && c === col
  );

  // Determine light/dark square
  const cellColor = (row + col) % 2 === 0 ? "light" : "dark";

  const classes = `
    cell 
    ${cellColor}
    ${isHovered ? "selected-square" : ""}
    ${isKnightMoveTarget ? "knight-move-target" : ""}
  `;

  return (
    <div
      className={classes}
      role="gridcell"
      data-testid={`cell-${row}-${col}`}
      onMouseEnter={() => onHover([row, col])}
      onMouseLeave={() => onHover(null)}
    >
      {/* Knight symbol appears on hovered square */}
      {isHovered && <span className="knight">♞</span>}
    </div>
  );
});
