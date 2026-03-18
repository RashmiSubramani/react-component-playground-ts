import React, { useState, useMemo } from "react";
import "./styles.css";

const boardSize = 8;

// 8 directions a king can move: [rowStep, colStep]
// UP, DOWN, LEFT, RIGHT, and 4 diagonals
const kingDirections = [
  [-1, 0], // UP
  [1, 0], // DOWN
  [0, -1], // LEFT
  [0, 1], // RIGHT
  [-1, -1], // UP-LEFT
  [-1, 1], // UP-RIGHT
  [1, -1], // DOWN-LEFT
  [1, 1], // DOWN-RIGHT
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

function KingMoves() {
  // State to store currently hovered cell as [row, col]
  const [hovered, setHovered] = useState(null);

  // Compute all valid king moves from the hovered cell. Valid king move check → decides which cells to highlight based on the hovered king.
  // useMemo ensures we only recalc when hovered changes
  const kingMoves = useMemo(() => {
    if (!hovered) return []; // No hovered cell → no moves
    const [row, col] = hovered;
    const moves = [];

    // Loop through each king direction
    kingDirections.forEach(([dx, dy]) => {
      let r = row + dx;
      let c = col + dy;
      let dirLabel = `${dx},${dy}`; // Optional: can convert to "UP", "DOWN-RIGHT", etc.
      moves.push([r, c, dirLabel]);
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
            kingMoves={kingMoves} // Pass calculated king moves
            onHover={setHovered} // Callback to update hovered cell
          />
        ))
      )}
    </div>
  );
}

export default KingMoves;

// Memoized Cell component to improve performance
// Receives row, col, hovered cell, king moves, and hover callback
const Cell = React.memo(({ row, col, hovered, kingMoves, onHover }) => {
  // Check if this cell is the currently hovered cell
  const isHovered = hovered?.[0] === row && hovered?.[1] === col;

  // Check if this cell is a valid king move from hovered cell
  // kingMoves is an array of [row, col, direction]
  const kingMove = kingMoves.find(([r, c]) => r === row && c === col);
  const direction = kingMove?.[2]; // optional direction label for styling

  // Determine cell color like a chessboard
  const cellColor = (row + col) % 2 === 0 ? "light" : "dark";

  // Combine CSS classes:
  // - light/dark cell
  // - hovered (if this is the hovered cell)
  // - king-move (if this is a valid move)
  const classes = `cell ${cellColor} ${isHovered ? "hovered" : ""} ${
    direction ? "king-move" : ""
  }`;

  return (
    <div
      className={classes}
      data-testid={`cell-${row}-${col}`} // For testing: allows tests to select this cell
      data-direction={direction || ""} // Optional: can be used to show arrows
      onMouseEnter={() => onHover([row, col])} // Hover starts → update hovered state
      onMouseLeave={() => onHover(null)} // Hover ends → clear hovered state
    />
  );
});
