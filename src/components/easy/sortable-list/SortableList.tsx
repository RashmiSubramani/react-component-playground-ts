/*
  SORTABLE LIST (Add + Sort Ascending/Descending)
  --------------------------------------------------
  Difficulty: Easy
  Concepts: useCallback memoization, localeCompare for string sorting,
            typed sort order union, immutable sort via spread + .sort()

  How it works:
  1. Type a string and click "Add Item" to append to the list
  2. "Sort Ascending" / "Sort Descending" sorts the list alphabetically
  3. useCallback memoizes the sort function (no state deps needed)
*/

import { useState, useCallback } from "react";
import { FaSortAlphaDown, FaSortAlphaUpAlt, FaPlus } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type SortOrder = "asc" | "desc";

// ─── Component ──────────────────────────────────────────────────────

function SortableList() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  const sortItems = useCallback((order: SortOrder) => {
    setItems((prev) => {
      const sorted = [...prev];
      sorted.sort((a, b) =>
        order === "asc" ? a.localeCompare(b) : b.localeCompare(a),
      );
      return sorted;
    });
  }, []);

  function handleAddItem(): void {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, newItem.trim()]);
    setNewItem("");
  }

  // ChangeEvent<HTMLInputElement> — typed event from the text input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewItem(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") handleAddItem();
  }

  return (
    <div className="sl-container">
      <h2>Sortable List</h2>

      <div className="sl-input-row">
        <input
          className="sl-input"
          type="text"
          value={newItem}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new item"
        />
        <button className="sl-btn sl-add-btn" onClick={handleAddItem}>
          <FaPlus size={12} /> Add
        </button>
      </div>

      <div className="sl-sort-row">
        <button className="sl-btn" onClick={() => sortItems("asc")}>
          <FaSortAlphaDown /> Ascending
        </button>
        <button className="sl-btn" onClick={() => sortItems("desc")}>
          <FaSortAlphaUpAlt /> Descending
        </button>
      </div>

      {items.length === 0 ? (
        <p className="sl-empty">No items yet. Add one above.</p>
      ) : (
        <ul className="sl-list">
          {items.map((item, index) => (
            <li key={index} className="sl-item">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortableList;
