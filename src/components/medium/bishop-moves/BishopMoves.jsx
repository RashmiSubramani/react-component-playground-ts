import React, { useState, useMemo } from "react";
import "./styles.css";

const boardSize = 8;

// 4 directions a bishop can move: [rowStep, colStep]
// 4 diagonals
const bishopDirections = [
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

export default function BishopMoves() {
  // State to store currently hovered cell as [row, col]
  const [hovered, setHovered] = useState(null);

  // Compute all valid bishop moves from the hovered cell. Valid bishop move check → decides which cells to highlight based on the hovered bishop.
  // useMemo ensures we only recalc when hovered changes
  const bishopMoves = useMemo(() => {
    if (!hovered) return []; // No hovered cell → no moves
    const [row, col] = hovered;
    const moves = [];

    // Loop through each bishop direction
    bishopDirections.forEach(([dx, dy]) => {
      let r = row + dx;
      let c = col + dy;

      // Extend in this direction until board edge
      while (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
        let dirLabel = `${dx},${dy}`; // Optional: can convert to "UP", "DOWN-RIGHT", etc.
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
            bishopMoves={bishopMoves} // Pass calculated bishop moves
            onHover={setHovered} // Callback to update hovered cell
          />
        ))
      )}
    </div>
  );
}

// Memoized Cell component to improve performance
// Receives row, col, hovered cell, bishop moves, and hover callback
const Cell = React.memo(({ row, col, hovered, bishopMoves, onHover }) => {
  // Check if this cell is the currently hovered cell
  const isHovered = hovered?.[0] === row && hovered?.[1] === col;

  // Check if this cell is a valid bishop move from hovered cell
  // bishopMoves is an array of [row, col, direction]
  const bishopMove = bishopMoves.find(([r, c]) => r === row && c === col);
  const direction = bishopMove?.[2]; // optional direction label for styling

  // Determine cell color like a chessboard
  const cellColor = (row + col) % 2 === 0 ? "light" : "dark";

  // Combine CSS classes:
  // - light/dark cell
  // - hovered (if this is the hovered cell)
  // - bishop-move (if this is a valid move)
  const classes = `cell ${cellColor} ${isHovered ? "hovered" : ""} ${
    direction ? "bishop-move" : ""
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
