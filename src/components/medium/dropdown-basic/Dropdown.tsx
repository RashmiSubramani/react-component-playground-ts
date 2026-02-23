/*
  DROPDOWN (Custom Select)
  -------------------------
  Difficulty: Easy
  Concepts: typed props with defaults, useRef<HTMLDivElement> for click-outside detection,
            useState<string | null> for selected value, keyboard navigation (Arrow/Enter/Escape),
            document event listener with typed MouseEvent, tabIndex for focusability

  How click-outside works:
  - Listen at the document level (mousedown)
  - Check: is e.target inside dropdownRef?
    - YES → do nothing
    - NO  → close dropdown
  - Why not onMouseDown on the dropdown itself?
    Because it can't detect clicks OUTSIDE itself — it never receives them.
*/

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./styles.css";

// ─── Props type ───────────────────────────────────────────────────
type DropdownProps = {
  options?: string[];
  placeholder?: string;
};

function Dropdown({
  options = [],
  placeholder = "Select option",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Typed ref — must be HTMLDivElement (not just HTMLElement) for .contains()
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // e.target is EventTarget — cast to Node for .contains() check
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

  function handleSelect(option: string) {
    setSelected(option);
    setIsOpen(false);
  }

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Dropdown Header */}
      <div
        className="dropdown-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected || placeholder}
        <span className="arrow">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={option}
              className={`dropdown-item ${index === highlightedIndex ? "active" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function DropdownWrapper() {
  return (
    <div className="dropdownDemo">
      <Dropdown
        placeholder="Choose a role"
        options={["Admin", "Editor", "Viewer"]}
      />
    </div>
  );
}
