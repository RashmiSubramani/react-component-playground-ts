/*
  DRAG & DROP (Two-List Reorder + Transfer)
  -------------------------------------------
  Difficulty: Easy
  Concepts: typed Fruit object, HTML5 drag events (onDragStart/onDragOver/onDrop),
            same-list reorder via splice, cross-list transfer via filter + spread,
            useCallback with state deps, data-id attribute for drop target lookup

  How it works:
  1. Two columns: "Available" and "Dropped"
  2. Drag a fruit within the same list → reorder
  3. Drag a fruit to the other list → transfer
  4. Reset button restores initial state
*/

import { useState, useCallback } from "react";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Fruit = {
  id: string;
  name: string;
};

type ListName = "availableFruits" | "droppedFruits";

// ─── Data ───────────────────────────────────────────────────────────

const initialAvailable: Fruit[] = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Grape" },
  { id: "4", name: "Pineapple" },
  { id: "5", name: "Mango" },
];

// ─── Helpers ────────────────────────────────────────────────────────

/** Reorder an array by moving the item at `startIndex` to `endIndex`. */
function reorder(list: Fruit[], startIndex: number, endIndex: number): Fruit[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

// ─── Component ──────────────────────────────────────────────────────

function DragAndDrop() {
  const [availableFruits, setAvailableFruits] =
    useState<Fruit[]>(initialAvailable);
  const [droppedFruits, setDroppedFruits] = useState<Fruit[]>([]);

  const [draggedItem, setDraggedItem] = useState<Fruit | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<ListName | null>(null);

  const handleDragStart = useCallback((item: Fruit, from: ListName) => {
    setDraggedItem(item);
    setDraggedFrom(from);
  }, []);

  function allowDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  const handleDrop = useCallback(
    (targetListName: ListName, e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!draggedItem || !draggedFrom) return;

      const isSameList = draggedFrom === targetListName;

      const sourceList =
        draggedFrom === "availableFruits" ? availableFruits : droppedFruits;
      const targetList =
        targetListName === "availableFruits" ? availableFruits : droppedFruits;

      // Same list → reorder
      if (isSameList) {
        const draggedIndex = sourceList.findIndex(
          (i) => i.id === draggedItem.id,
        );

        const dropTargetId = (e.target as HTMLElement).getAttribute("data-id");
        const dropIndex = sourceList.findIndex((i) => i.id === dropTargetId);

        if (dropIndex === -1) return;

        if (draggedIndex !== dropIndex) {
          const reordered = reorder(sourceList, draggedIndex, dropIndex);

          if (targetListName === "availableFruits") {
            setAvailableFruits(reordered);
          } else {
            setDroppedFruits(reordered);
          }
        }
      }
      // Different list → transfer
      else {
        const updatedSource = sourceList.filter(
          (i) => i.id !== draggedItem.id,
        );
        const updatedTarget = [...targetList, draggedItem];

        if (draggedFrom === "availableFruits") {
          setAvailableFruits(updatedSource);
          setDroppedFruits(updatedTarget);
        } else {
          setDroppedFruits(updatedSource);
          setAvailableFruits(updatedTarget);
        }
      }

      setDraggedItem(null);
      setDraggedFrom(null);
    },
    [draggedItem, draggedFrom, availableFruits, droppedFruits],
  );

  function resetLists(): void {
    setAvailableFruits(initialAvailable);
    setDroppedFruits([]);
    setDraggedItem(null);
    setDraggedFrom(null);
  }

  function renderItem(item: Fruit, from: ListName) {
    return (
      <div
        key={item.id}
        data-id={item.id}
        draggable
        onDragStart={() => handleDragStart(item, from)}
        className="dd-item"
      >
        {item.name}
      </div>
    );
  }

  return (
    <div className="dd-wrapper">
      <div className="dd-header">
        <h2>Drag &amp; Drop Fruits</h2>
        <button className="dd-reset-btn" onClick={resetLists}>
          Reset Lists
        </button>
      </div>

      <div className="dd-columns">
        {/* Available Column */}
        <div
          className="dd-column"
          onDrop={(e) => handleDrop("availableFruits", e)}
          onDragOver={allowDrop}
        >
          <h3>Available Fruits</h3>

          {availableFruits.length === 0 && (
            <p className="dd-empty">No fruits here</p>
          )}

          {availableFruits.map((item) => renderItem(item, "availableFruits"))}
        </div>

        {/* Dropped Column */}
        <div
          className="dd-column dd-drop-zone"
          onDrop={(e) => handleDrop("droppedFruits", e)}
          onDragOver={allowDrop}
        >
          <h3>Dropped Fruits</h3>

          {droppedFruits.length === 0 && (
            <p className="dd-empty">Drop fruits here</p>
          )}

          {droppedFruits.map((item) => renderItem(item, "droppedFruits"))}
        </div>
      </div>
    </div>
  );
}

export default DragAndDrop;
