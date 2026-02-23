/*
  DROPDOWN MULTI-SELECT
  ----------------------
  Difficulty: Easy
  Concepts: union state type (string[] | string | null), isMulti prop discriminant,
            type narrowing with Array.isArray(), useRef<HTMLDivElement> click-outside,
            keyboard navigation, checkbox-driven multi-select

  Key TS pattern:
  The `selected` state has type `string[] | string | null` because:
  - isMulti=true  → selected is string[] (array of chosen options)
  - isMulti=false → selected is string | null (single value or nothing)
  We use Array.isArray() to narrow the type in each branch.
*/

import { useEffect, useRef, useState } from "react";
import "./styles.css";

// ─── Props type ───────────────────────────────────────────────────
type DropdownMultiSelectProps = {
  options?: string[];
  isMulti?: boolean;
};

function DropdownMultiSelect({
  options = [],
  isMulti = false,
}: DropdownMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Union state — type depends on isMulti
  const [selected, setSelected] = useState<string[] | string | null>(
    isMulti ? [] : null,
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Select logic — branches on isMulti
  function handleSelect(option: string) {
    if (isMulti) {
      setSelected((prev) => {
        // Array.isArray() narrows prev from string[] | string | null → string[]
        const arr = Array.isArray(prev) ? prev : [];
        return arr.includes(option)
          ? arr.filter((item) => item !== option)
          : [...arr, option];
      });
    } else {
      setSelected(option);
      setIsOpen(false);
    }
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < options.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      handleSelect(options[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  // ─── Derive display text ────────────────────────────────────────
  // Array.isArray() narrows the type for safe .length / .join() access
  const displayText: string = Array.isArray(selected)
    ? selected.length > 0
      ? selected.join(", ")
      : "Select options"
    : selected || "Select option";

  /**
     * 
     In JS, 
        {isMulti
          ? selected.length
            ? selected.join(", ")
            : "Select options"
          : selected || "Select option"}
     */

  // Helper to check if an option is selected (multi mode)
  function isOptionSelected(option: string): boolean {
    return Array.isArray(selected) && selected.includes(option);
  }

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {displayText}
      </div>

      {/* Menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={option}
              className={`dropdown-item ${index === highlightedIndex ? "active" : ""} ${isOptionSelected(option) ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {isMulti && (
                <input
                  type="checkbox"
                  readOnly
                  checked={isOptionSelected(option)}
                  className="multiselectCheckBox"
                />
              )}
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function DropdownMultiSelectWrapper() {
  return (
    <div className="dropdownDemo">
      <DropdownMultiSelect
        options={["Admin", "Editor", "Viewer"]}
        isMulti={true}
      />
    </div>
  );
}
