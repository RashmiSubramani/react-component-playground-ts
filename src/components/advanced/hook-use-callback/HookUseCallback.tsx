/*
  HOOK: useCallback — Stable Callback for Memo'd Child
  -------------------------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)

  Syntax patterns:
  1. useCallback(fn, deps)             — returns a memoized version of fn
  2. React.memo(Component)             — skips re-render if props haven't changed
  3. useCallback + React.memo together — prevents child re-render when parent re-renders
  4. Without useCallback               — new function ref every render → memo defeated

  This demo has a parent counter and a memo'd child.
  The child has its own render counter to PROVE when it re-renders.
*/

import { useState, useCallback, useRef, memo } from "react";
import { FaPlus } from "react-icons/fa";
import "./styles.css";

// ─── Memo'd child component ─────────────────────────────────────────

type ChildProps = {
  onAdd: () => void;
  label: string;
};

// React.memo: only re-renders if props change (shallow compare).
// If the parent passes the SAME function reference, this won't re-render.
// If the parent passes a NEW function reference, this WILL re-render.
const MemoChild = memo(function MemoChild({ onAdd, label }: ChildProps) {
  const childRenders = useRef(0);
  childRenders.current += 1;

  return (
    <div className="hucb-child">
      <span className="hucb-child-label">{label}</span>
      <button className="hucb-btn hucb-child-btn" onClick={onAdd}>
        <FaPlus size={10} /> Add Item
      </button>
      <span className="hucb-render-count">
        Child renders: {childRenders.current}
      </span>
    </div>
  );
});

// ─── Parent component ───────────────────────────────────────────────

function HookUseCallback() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  // ── WITH useCallback: stable reference ──
  // This function is created ONCE and reused across renders.
  // The memo'd child sees the same reference → does NOT re-render.
  const handleAddStable = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []); // Empty deps → never recreated

  // ── WITHOUT useCallback: new reference every render ──
  // This creates a NEW function on every render.
  // The memo'd child sees a different reference → DOES re-render.
  const handleAddUnstable = () => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  };

  return (
    <div className="hucb-container">
      <h2>Hook: useCallback</h2>
      <p className="hucb-subtitle">
        Stable callback ref — prevents unnecessary child re-renders
      </p>

      <div className="hucb-render-badge">
        Parent renders: {parentRenders.current}
      </div>

      {/* This button re-renders the parent (but should NOT re-render the stable child) */}
      <button
        className="hucb-btn hucb-counter-btn"
        onClick={() => setCount((c) => c + 1)}
      >
        <FaPlus size={10} /> Parent Counter: {count}
      </button>
      <p className="hucb-hint">
        Click the counter — watch which child re-renders.
      </p>

      <div className="hucb-comparison">
        {/* Child with useCallback — render count stays LOW */}
        <div className="hucb-card hucb-card-stable">
          <h4>With useCallback</h4>
          <MemoChild onAdd={handleAddStable} label="Stable" />
        </div>

        {/* Child without useCallback — render count matches parent */}
        <div className="hucb-card hucb-card-unstable">
          <h4>Without useCallback</h4>
          <MemoChild onAdd={handleAddUnstable} label="Unstable" />
        </div>
      </div>

      {items.length > 0 && (
        <div className="hucb-items">
          <h4>Items ({items.length})</h4>
          {items.map((item, i) => (
            <span key={i} className="hucb-item">{item}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default HookUseCallback;
