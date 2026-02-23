/*
  Undo / Redo — History Stack Pattern
  -----------------------------------------------
  Category: Medium

  Concepts:
  1. History stack (past[] + present + future[])
  2. Undo — pop from past, push present to future
  3. Redo — pop from future, push present to past
  4. New action clears future (branching history)
  5. useCallback for stable handlers
*/

import { useState, useCallback } from "react";
import { FaUndo, FaRedo, FaPlus, FaPalette, FaTrash } from "react-icons/fa";
import "./styles.css";

// ─── Types ─────────────────────────────────────────────────────────

type Shape = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

type HistoryState = {
  past: Shape[][];
  present: Shape[];
  future: Shape[][];
};

// ─── Helpers ───────────────────────────────────────────────────────

const COLORS = ["#6c3483", "#2980b9", "#27ae60", "#e74c3c", "#f39c12", "#1abc9c"];

let nextId = 1;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// ─── Component ─────────────────────────────────────────────────────

function UndoRedo() {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: [],
    future: [],
  });

  const { past, present, future } = history;

  // ── Push a new present state (clears future) ──
  const pushState = useCallback((newPresent: Shape[]) => {
    setHistory((h) => ({
      past: [...h.past, h.present],
      present: newPresent,
      future: [], // new action clears redo stack
    }));
  }, []);

  // ── Undo: move present → future, pop past → present ──
  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const newPast = [...h.past];
      const prev = newPast.pop()!;
      return {
        past: newPast,
        present: prev,
        future: [h.present, ...h.future],
      };
    });
  }, []);

  // ── Redo: move present → past, pop future → present ──
  const redo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const newFuture = [...h.future];
      const next = newFuture.shift()!;
      return {
        past: [...h.past, h.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // ── Add a random shape ──
  const addShape = useCallback(() => {
    const shape: Shape = {
      id: nextId++,
      x: randomInt(10, 380),
      y: randomInt(10, 220),
      width: randomInt(40, 80),
      height: randomInt(30, 60),
      color: randomColor(),
    };
    pushState([...present, shape]);
  }, [present, pushState]);

  // ── Change all shape colors ──
  const shuffleColors = useCallback(() => {
    if (present.length === 0) return;
    const updated = present.map((s) => ({ ...s, color: randomColor() }));
    pushState(updated);
  }, [present, pushState]);

  // ── Clear all ──
  const clearAll = useCallback(() => {
    if (present.length === 0) return;
    pushState([]);
  }, [present, pushState]);

  return (
    <div className="ur-container">
      <h2>Undo / Redo</h2>
      <p className="ur-subtitle">
        History stack pattern — past[], present, future[]
      </p>

      {/* Toolbar */}
      <div className="ur-toolbar">
        <button
          className="ur-btn ur-undo-btn"
          onClick={undo}
          disabled={past.length === 0}
        >
          <FaUndo size={12} /> Undo
        </button>
        <button
          className="ur-btn ur-redo-btn"
          onClick={redo}
          disabled={future.length === 0}
        >
          <FaRedo size={12} /> Redo
        </button>
        <button
          className="ur-btn ur-clear-btn"
          onClick={clearAll}
          disabled={present.length === 0}
        >
          <FaTrash size={11} /> Clear
        </button>
      </div>

      {/* Actions */}
      <div className="ur-controls">
        <button className="ur-btn ur-add-btn" onClick={addShape}>
          <FaPlus size={11} /> Add Shape
        </button>
        <button
          className="ur-btn ur-color-btn"
          onClick={shuffleColors}
          disabled={present.length === 0}
        >
          <FaPalette size={12} /> Shuffle Colors
        </button>
      </div>

      {/* Canvas */}
      <div className="ur-canvas">
        {present.map((shape) => (
          <div
            key={shape.id}
            className="ur-shape"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.width,
              height: shape.height,
              background: shape.color,
            }}
          >
            {shape.id}
          </div>
        ))}
      </div>

      {/* Stack info */}
      <div className="ur-stack-info">
        <span>Undo stack: {past.length}</span>
        <span>Redo stack: {future.length}</span>
        <span>Shapes: {present.length}</span>
      </div>
    </div>
  );
}

export default UndoRedo;
