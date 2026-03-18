import React, { useState } from "react";
import "./styles.css";

export default function PinItems() {
  const [items, setItems] = useState([
    { id: 1, text: "Buy groceries", pinned: false },
    { id: 2, text: "Call Alice", pinned: false },
    { id: 3, text: "Meeting with Bob", pinned: false },
    { id: 4, text: "Pay electricity bill", pinned: false },
    { id: 5, text: "Read a book", pinned: false },
    { id: 6, text: "Go for a walk", pinned: false },
    { id: 7, text: "Fix bug #234", pinned: false },
    { id: 8, text: "Review pull requests", pinned: false },
  ]);

  const togglePin = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      )
    );
  };

  const pinnedItems = items.filter((i) => i.pinned);
  const unpinnedItems = items.filter((i) => !i.pinned);
  const finalList = [...pinnedItems, ...unpinnedItems];

  return (
    <div className="pin-container container" data-testid="app-container">
      <h3 className="pin-title" data-testid="main-title">
        Pin Items To Top
      </h3>

      <ul className="pin-list" data-testid="item-list">
        {finalList.map((item) => (
          <li
            key={item.id}
            className={`pin-item ${
              item.pinned ? "pin-item--pinned pinned" : ""
            }`}
          >
            <label className="pin-label">
              <input
                type="checkbox"
                className="pin-checkbox"
                data-testid={`pin-checkbox-${item.id}`}
                checked={item.pinned}
                onChange={() => togglePin(item.id)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
