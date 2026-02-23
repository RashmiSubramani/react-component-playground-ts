/*
  SELECTABLE GRID (Drag-to-Select Rectangle)
  ---------------------------------------------
  Difficulty: Medium
  Concepts: useCallback with typed dependencies,
            CSS custom properties via inline style (React.CSSProperties cast),
            1-based box number ↔ row/col conversion,
            rectangular selection (min/max row/col boundaries),
            mouse event flow (mouseDown → mouseEnter → mouseUp)

  How it works:
  1. Grid of rows × cols boxes rendered via CSS Grid
  2. mouseDown on a box starts selection (records start box)
  3. mouseEnter while dragging calculates the rectangle between
     start and current box, collecting all boxes inside
  4. mouseUp ends selection mode
*/

import { useCallback, useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type SelectableGridProps = {
  rows?: number;
  cols?: number;
};

// ─── Component ────────────────────────────────────────────────────

function SelectableGrid({ rows = 10, cols = 10 }: SelectableGridProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);

  // Start selection — record the first box
  function handleMouseDown(boxNumber: number) {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  }

  // Extend selection — calculate rectangle between start and current box
  const handleMouseEnter = useCallback(
    (boxNumber: number) => {
      if (!isMouseDown) return;

      const startBox = selectedBoxes[0];
      const endBox = boxNumber;

      // Convert 1-based box number → 0-based row & col
      const startRow = Math.floor((startBox - 1) / cols);
      const startCol = (startBox - 1) % cols;
      const endRow = Math.floor((endBox - 1) / cols);
      const endCol = (endBox - 1) % cols;

      // Rectangle boundaries
      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);

      // Collect all boxes within the rectangle
      const selected: number[] = [];
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          selected.push(row * cols + col + 1);
        }
      }

      setSelectedBoxes(selected);
    },
    [isMouseDown, cols, selectedBoxes],
  );

  // End selection
  function handleMouseUp() {
    setIsMouseDown(false);
  }

  return (
    <div>
      <div
        className="sg-grid"
        // CSS custom properties aren't in React.CSSProperties — cast needed
        style={
          { "--sg-rows": rows, "--sg-cols": cols } as React.CSSProperties
        }
        onMouseUp={handleMouseUp}
      >
        {[...Array(rows * cols).keys()].map((i) => (
          <div
            key={i}
            className={`sg-box ${selectedBoxes.includes(i + 1) ? "sg-selected" : ""}`}
            onMouseDown={() => handleMouseDown(i + 1)}
            onMouseEnter={() => handleMouseEnter(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <p className="sg-count">Selected Cells: {selectedBoxes.length}</p>
    </div>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function SelectableGridWrapper() {
  return <SelectableGrid rows={10} cols={10} />;
}
