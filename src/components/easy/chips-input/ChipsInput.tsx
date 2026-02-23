/*
  CHIPS INPUT
  ------------
  Difficulty: Easy
  Concepts: typing KeyboardEvent handler, useState<string[]>,
            duplicate prevention with .includes(), Backspace to delete last chip

  Features:
  - Add chips by pressing Enter
  - Delete chips with X button or Backspace (when input is empty)
  - Prevents duplicate chips
*/

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./styles.css";

export default function ChipsInput() {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState<string[]>(["history", "hello"]);

  // ChangeEvent<HTMLInputElement> — typed event from the text input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  // Handle keyboard interactions — typed as KeyboardEvent<HTMLInputElement>
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // Add new chip only if it doesn't already exist (duplicate prevention)
      if (!chips.includes(inputValue.trim())) {
        setChips((prev) => [...prev, inputValue.trim()]);
      }
      setInputValue("");
    }
    // Backspace on empty input → remove the last chip
    else if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      setChips((prev) => prev.slice(0, -1));
      //[1, 2, 3, 4].slice(0, -1)
      // → [1, 2, 3] (start at first element, exclude last element)
    }
  }

  // Remove chip by index — typed index param
  function handleDelete(index: number) {
    setChips((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="Type anything and press Enter"
        className="inputBox"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <div className="chipsContainer">
        {chips.map((chip, index) => (
          <div key={`${chip}-${index}`} className="chipWrapper">
            <div className="chip">{chip}</div>
            <button className="deleteBtn" onClick={() => handleDelete(index)}>
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
