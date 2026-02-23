/*
  GRID LIGHTS (Click-to-Fill + Reverse Deactivation)
  ----------------------------------------------------
  Difficulty: Easy
  Concepts: useState<Set<number>> for active cells, activation order tracking,
            reverse deactivation via chained setTimeout, isDeactivating guard,
            Array.from grid generation, 1D index from row/col

  How it works:
  1. 3×3 grid — click a cell to light it up (green)
  2. Already-active cells ignore clicks
  3. Once all 9 cells are lit, they deactivate in reverse order (LIFO)
  4. During deactivation, all clicks are blocked
  5. Reset button restores initial state
*/

import { useState } from "react";
import "./styles.css";

// ─── Constants ──────────────────────────────────────────────────────

const GRID_SIZE = 3;
const TOTAL = GRID_SIZE * GRID_SIZE;

// ─── Component ──────────────────────────────────────────────────────

function GridLights() {
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set());
  const [activationOrder, setActivationOrder] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  function handleClick(index: number): void {
    if (isDeactivating || activeCells.has(index)) return;

    const updatedSet = new Set(activeCells);
    updatedSet.add(index);

    const updatedOrder = [...activationOrder, index];

    setActiveCells(updatedSet);
    setActivationOrder(updatedOrder);

    // All cells lit → start reverse deactivation
    if (updatedSet.size === TOTAL) {
      setTimeout(() => startReverseDeactivation(updatedOrder), 300);
    }
  }

  function startReverseDeactivation(order: number[]): void {
    setIsDeactivating(true);
    const reversed = [...order].reverse();

    reversed.forEach((cellIndex, i) => {
      setTimeout(() => {
        setActiveCells((prev) => {
          const copy = new Set(prev);
          copy.delete(cellIndex);
          return copy;
        });

        // Last cell → reset fully
        if (i === reversed.length - 1) {
          setTimeout(() => {
            setIsDeactivating(false);
            setActivationOrder([]);
          }, 100);
        }
      }, i * 300);
    });
  }

  function resetGrid(): void {
    setActiveCells(new Set());
    setActivationOrder([]);
    setIsDeactivating(false);
  }

  return (
    <div className="gl-container">
      <h2>Grid Lights</h2>

      <div className="gl-actions">
        <button className="gl-reset-btn" onClick={resetGrid}>
          Reset Grid
        </button>
      </div>

      <div className="gl-grid">
        {Array.from({ length: GRID_SIZE }, (_, rowIdx) => (
          <div className="gl-row" key={rowIdx}>
            {Array.from({ length: GRID_SIZE }, (_, colIdx) => {
              const index = rowIdx * GRID_SIZE + colIdx;
              const isActive = activeCells.has(index);

              return (
                <div
                  key={index}
                  className={`gl-cell ${isActive ? "gl-active" : ""}`}
                  onClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridLights;
