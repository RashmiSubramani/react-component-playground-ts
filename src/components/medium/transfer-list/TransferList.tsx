/*
  Transfer List — Two-panel multi-select with move buttons
  -----------------------------------------------------------
  Category: Medium

  Concepts:
  1. Two lists (left/right) with items that move between them
  2. Multi-select with checkboxes + Set<number> for checked tracking
  3. Move selected / move all in both directions
  4. Select all checkbox with indeterminate state
  5. useCallback for stable handlers
*/

import { useState, useCallback } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import "./styles.css";

// ─── Types ─────────────────────────────────────────────────────────

type Item = {
  id: number;
  label: string;
};

// ─── Initial data ──────────────────────────────────────────────────

const INITIAL_LEFT: Item[] = [
  { id: 1, label: "JavaScript" },
  { id: 2, label: "TypeScript" },
  { id: 3, label: "React" },
  { id: 4, label: "Vue" },
  { id: 5, label: "Angular" },
  { id: 6, label: "Svelte" },
  { id: 7, label: "Next.js" },
  { id: 8, label: "Node.js" },
  { id: 9, label: "Express" },
  { id: 10, label: "GraphQL" },
];

const INITIAL_RIGHT: Item[] = [];

// ─── Component ─────────────────────────────────────────────────────

function TransferList() {
  const [left, setLeft] = useState<Item[]>(INITIAL_LEFT);
  const [right, setRight] = useState<Item[]>(INITIAL_RIGHT);
  const [checkedLeft, setCheckedLeft] = useState<Set<number>>(new Set());
  const [checkedRight, setCheckedRight] = useState<Set<number>>(new Set());

  // ── Toggle a single checkbox ──
  const toggleCheck = useCallback(
    (side: "left" | "right", id: number) => {
      const setter = side === "left" ? setCheckedLeft : setCheckedRight;
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  // ── Select all / deselect all ──
  const toggleSelectAll = useCallback(
    (side: "left" | "right") => {
      const items = side === "left" ? left : right;
      const checked = side === "left" ? checkedLeft : checkedRight;
      const setter = side === "left" ? setCheckedLeft : setCheckedRight;

      if (checked.size === items.length && items.length > 0) {
        setter(new Set()); // deselect all
      } else {
        setter(new Set(items.map((i) => i.id))); // select all
      }
    },
    [left, right, checkedLeft, checkedRight]
  );

  // ── Move checked items right ──
  const moveRight = useCallback(() => {
    const moving = left.filter((i) => checkedLeft.has(i.id));
    setLeft((prev) => prev.filter((i) => !checkedLeft.has(i.id)));
    setRight((prev) => [...prev, ...moving]);
    setCheckedLeft(new Set());
  }, [left, checkedLeft]);

  // ── Move checked items left ──
  const moveLeft = useCallback(() => {
    const moving = right.filter((i) => checkedRight.has(i.id));
    setRight((prev) => prev.filter((i) => !checkedRight.has(i.id)));
    setLeft((prev) => [...prev, ...moving]);
    setCheckedRight(new Set());
  }, [right, checkedRight]);

  // ── Move all right ──
  const moveAllRight = useCallback(() => {
    setRight((prev) => [...prev, ...left]);
    setLeft([]);
    setCheckedLeft(new Set());
  }, [left]);

  // ── Move all left ──
  const moveAllLeft = useCallback(() => {
    setLeft((prev) => [...prev, ...right]);
    setRight([]);
    setCheckedRight(new Set());
  }, [right]);

  // ── Render a panel ──
  function renderPanel(
    title: string,
    items: Item[],
    checked: Set<number>,
    side: "left" | "right"
  ) {
    const allChecked = items.length > 0 && checked.size === items.length;
    const someChecked = checked.size > 0 && checked.size < items.length;

    return (
      <div className="tl-panel">
        <div className="tl-panel-header">
          <span className="tl-panel-title">{title}</span>
          <span className="tl-panel-count">{items.length}</span>
        </div>

        {items.length > 0 && (
          <label className="tl-select-all">
            <input
              type="checkbox"
              checked={allChecked}
              ref={(el) => {
                if (el) el.indeterminate = someChecked;
              }}
              onChange={() => toggleSelectAll(side)}
            />
            {allChecked ? "Deselect all" : "Select all"}
            {checked.size > 0 && ` (${checked.size})`}
          </label>
        )}

        <ul className="tl-list">
          {items.length === 0 ? (
            <li className="tl-empty">No items</li>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className={`tl-item ${checked.has(item.id) ? "tl-item-selected" : ""}`}
                onClick={() => toggleCheck(side, item.id)}
              >
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={() => toggleCheck(side, item.id)}
                />
                {item.label}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="tl-container">
      <h2>Transfer List</h2>
      <p className="tl-subtitle">
        Multi-select items and move between two lists
      </p>

      <div className="tl-layout">
        {/* Left panel */}
        {renderPanel("Available", left, checkedLeft, "left")}

        {/* Transfer buttons */}
        <div className="tl-actions">
          <button
            className="tl-btn tl-btn-all-right"
            onClick={moveAllRight}
            disabled={left.length === 0}
            title="Move all right"
          >
            <FaAngleDoubleRight size={14} />
          </button>
          <button
            className="tl-btn tl-btn-right"
            onClick={moveRight}
            disabled={checkedLeft.size === 0}
            title="Move selected right"
          >
            <FaChevronRight size={12} />
          </button>
          <button
            className="tl-btn tl-btn-left"
            onClick={moveLeft}
            disabled={checkedRight.size === 0}
            title="Move selected left"
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            className="tl-btn tl-btn-all-left"
            onClick={moveAllLeft}
            disabled={right.length === 0}
            title="Move all left"
          >
            <FaAngleDoubleLeft size={14} />
          </button>
        </div>

        {/* Right panel */}
        {renderPanel("Selected", right, checkedRight, "right")}
      </div>
    </div>
  );
}

export default TransferList;
