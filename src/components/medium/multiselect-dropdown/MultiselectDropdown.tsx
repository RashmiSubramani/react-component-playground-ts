/*
  MULTISELECT DROPDOWN (Checkbox List + Submit)
  -----------------------------------------------
  Difficulty: Easy
  Concepts: string[] selected state, click-outside close via useRef + useEffect,
            checkbox toggle with includes/filter, submit validation with error state,
            conditional dropdown rendering

  How it works:
  1. Click the toggle button to open/close a dropdown of checkboxes
  2. Select/deselect options — button shows count of selected
  3. "Reset Selection" clears all checkboxes
  4. "Submit" validates at least one is selected, then displays results
  5. Clicking outside the dropdown closes it
*/

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./styles.css";

// ─── Constants ──────────────────────────────────────────────────────

const OPTIONS = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
  "Option 9",
  "Option 10",
];

// ─── Component ──────────────────────────────────────────────────────

function MultiselectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedOptions, setSubmittedOptions] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function toggleDropdown(): void {
    setIsOpen((prev) => !prev);
    setErrorMessage(null);
  }

  function toggleOption(option: string): void {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
    setErrorMessage(null);
  }

  function resetSelection(): void {
    setSelectedOptions([]);
    setErrorMessage(null);
  }

  function handleSubmit(): void {
    if (selectedOptions.length === 0) {
      setErrorMessage("Please select at least one option.");
      setSubmittedOptions([]);
      return;
    }

    setSubmittedOptions(selectedOptions);
    setErrorMessage(null);
  }

  return (
    <div className="msd-container">
      <h2>Multiselect Dropdown</h2>

      <label className="msd-label">Select Options:</label>

      <div className="msd-wrapper" ref={dropdownRef}>
        {/* Toggle button */}
        <button className="msd-toggle" onClick={toggleDropdown}>
          <span className={`msd-icon ${isOpen ? "msd-icon-open" : ""}`}>
            <FaChevronDown />
          </span>
          <span>
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : "Choose Options"}
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <ul className="msd-menu">
            <li className="msd-reset" onClick={resetSelection}>
              Reset Selection
            </li>

            {OPTIONS.map((opt) => (
              <li
                key={opt}
                className="msd-option"
                onClick={() => toggleOption(opt)}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(opt)}
                  readOnly
                />
                <span className="msd-option-label">{opt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error message */}
      {errorMessage && <p className="msd-error">{errorMessage}</p>}

      {/* Submit button */}
      <button className="msd-submit" onClick={handleSubmit}>
        Submit
      </button>

      {/* Submitted results */}
      {submittedOptions.length > 0 && (
        <div className="msd-result">
          Selected: {submittedOptions.join(", ")}
        </div>
      )}
    </div>
  );
}

export default MultiselectDropdown;
