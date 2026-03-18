import React, { useState, useMemo } from "react";
import "./styles.css";

const boardSize = 8;

export default function PawnMoves() {
  const [hovered, setHovered] = useState(null);

  // Compute valid pawn moves for WHITE pawn
  const pawnMoves = useMemo(() => {
    if (!hovered) return [];

    const [row, col] = hovered;

    //Based on this,, logic below will be writeen(NOTE: In actual board, it will be reverse but since we are using 2D array, below is how our 2D array will be)
    // 0  Black side
    // 1
    // 2
    // 3
    // 4
    // 5
    // 6  White pawns
    // 7  White side

    // White pawn cannot move if placed on rank 1 (row 7)
    if (row === 7) return [];

    const moves = [];

    // 1 step forward
    if (row - 1 >= 0) {
      moves.push([row - 1, col, "forward"]);
    }

    // 2 steps forward only from starting rank (row 6)
    if (row === 6 && row - 2 >= 0) {
      moves.push([row - 2, col, "forwardTwo"]);
    }

    // Capture left
    if (row - 1 >= 0 && col - 1 >= 0) {
      moves.push([row - 1, col - 1, "captureLeft"]);
    }

    // Capture right
    if (row - 1 >= 0 && col + 1 < boardSize) {
      moves.push([row - 1, col + 1, "captureRight"]);
    }

    return moves;
  }, [hovered]);

  return (
    <div className="board" role="grid">
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => (
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            hovered={hovered}
            pawnMoves={pawnMoves}
            onHover={setHovered}
          />
        ))
      )}
    </div>
  );
}

const Cell = React.memo(({ row, col, hovered, pawnMoves, onHover }) => {
  const isHovered = hovered?.[0] === row && hovered?.[1] === col;

  // Check if this cell is a valid move
  const pawnMove = pawnMoves.find(([r, c]) => r === row && c === col);
  const direction = pawnMove?.[2];

  const cellColor = (row + col) % 2 === 0 ? "light" : "dark";

  const classes = `cell ${cellColor} ${isHovered ? "hovered" : ""} ${
    direction ? "pawn-move" : ""
  }`;

  return (
    <div
      className={classes}
      role="gridcell"
      data-testid={`cell-${row}-${col}`}
      data-direction={direction || ""}
      onMouseEnter={() => onHover([row, col])}
      onMouseLeave={() => onHover(null)}
    />
  );
});
