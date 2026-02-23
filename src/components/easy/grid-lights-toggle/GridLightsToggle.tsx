/*
  GRID LIGHTS TOGGLE (Lights-Out Puzzle)
  ----------------------------------------
  Difficulty: Easy
  Concepts: number[][] 2D grid state, directional offsets for neighbors,
            boundary checking, immutable deep copy via .map(row => [...row]),
            toggle 0↔1, configurable grid size via prop

  How it works:
  1. N×N grid of cells (default 3×3), all start OFF (0)
  2. Clicking a cell toggles it AND its 4 adjacent neighbors (top/bottom/left/right)
  3. Neighbors outside the grid boundary are ignored
  4. Goal: turn all lights on (or off) — classic "Lights Out" puzzle
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type GridLightsToggleProps = {
  n?: number;
};

// ─── Constants ──────────────────────────────────────────────────────

/** Offsets: self, top, bottom, left, right */
const DIRECTIONS: [number, number][] = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// ─── Helpers ────────────────────────────────────────────────────────

function createGrid(size: number): number[][] {
  return Array.from({ length: size }, () => Array<number>(size).fill(0));
}

// ─── Component ──────────────────────────────────────────────────────

function GridLightsToggle({ n = 3 }: GridLightsToggleProps) {
  const [grid, setGrid] = useState<number[][]>(() => createGrid(n));

  function toggle(row: number, col: number): void {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);

      for (const [dx, dy] of DIRECTIONS) {
        const x = row + dx;
        const y = col + dy;

        if (x >= 0 && x < n && y >= 0 && y < n) {
          next[x][y] = next[x][y] === 0 ? 1 : 0;
        }
      }

      return next;
    });
  }

  function resetGrid(): void {
    setGrid(createGrid(n));
  }

  return (
    <div className="glt-container">
      <h2>Grid Lights Toggle</h2>

      <p className="glt-hint">
        Click a cell to toggle it and its neighbors
      </p>

      <div className="glt-actions">
        <button className="glt-reset-btn" onClick={resetGrid}>
          Reset
        </button>
      </div>

      <div className="glt-grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="glt-row">
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`glt-cell ${cell === 1 ? "glt-on" : ""}`}
                onClick={() => toggle(rowIdx, colIdx)}
                role="cell"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridLightsToggle;
