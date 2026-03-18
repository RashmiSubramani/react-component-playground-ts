import React, { useState, useMemo } from "react";
import "./styles.css";

const boardSize = 8; // Standard chess board size (8x8)

// 4 directions a rook can move: [rowStep, colStep]
const rookDirections = [
  [-1, 0], // UP
  [1, 0], // DOWN
  [0, -1], // LEFT
  [0, 1], // RIGHT
];

export default function RookMoves() {
  // State to store currently hovered cell as [row, col]
  const [hovered, setHovered] = useState(null);

  // Compute all valid rook moves from the hovered cell
  const rookMoves = useMemo(() => {
    if (!hovered) return []; // No hovered cell → no moves
    const [row, col] = hovered;
    const moves = [];

    // Loop through each rook direction
    rookDirections.forEach(([dx, dy]) => {
      let r = row + dx;
      let c = col + dy;

      // Extend in this direction until board edge
      while (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
        let dirLabel = `${dx},${dy}`; // optional: can convert to "UP", "DOWN", etc.
        moves.push([r, c, dirLabel]); // store move with direction
        r += dx; // move further in same direction
        c += dy;
      }
    });

    return moves;
  }, [hovered]);

  return (
    <div className="board" role="grid">
      {/* Render the board as rows and columns */}
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => (
          <Cell
            key={`${row}-${col}`} // Unique key for React
            row={row}
            col={col}
            hovered={hovered} // Pass hovered state
            rookMoves={rookMoves} // Pass calculated rook moves
            onHover={setHovered} // Callback to update hovered cell
          />
        ))
      )}
    </div>
  );
}

// Memoized Cell component to improve performance
const Cell = React.memo(({ row, col, hovered, rookMoves, onHover }) => {
  // Check if this cell is the currently hovered cell
  const isHovered = hovered?.[0] === row && hovered?.[1] === col;

  // Check if this cell is a valid rook move from hovered cell
  const rookMove = rookMoves.find(([r, c]) => r === row && c === col);
  const direction = rookMove?.[2]; // optional direction label for styling

  // Determine cell color like a chessboard
  const cellColor = (row + col) % 2 === 0 ? "light" : "dark";

  // Combine CSS classes:
  // - light/dark cell
  // - hovered (if this is the hovered cell)
  // - rook-move (if this is a valid move)
  const classes = `cell ${cellColor} ${isHovered ? "hovered" : ""} ${
    direction ? "rook-move" : ""
  }`;

  return (
    <div
      className={classes}
      role="gridcell"
      data-testid={`cell-${row}-${col}`} // For testing: allows tests to select this cell
      data-direction={direction || ""} // Optional: can be used to show arrows
      onMouseEnter={() => onHover([row, col])} // Hover starts → update hovered state
      onMouseLeave={() => onHover(null)} // Hover ends → clear hovered state
    />
  );
});
