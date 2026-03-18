import React, { useState } from "react";
import { colorNameToHex } from "./colorData";
import "./styles.css";

const ColorExplorer = () => {
  const [inputValue, setInputValue] = useState();
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  function handleSearch() {
    const hex = colorNameToHex(inputValue.trim().toLowerCase());

    if (hex) {
      setColor({ name: inputValue.trim(), hex });
      setError("");
    } else {
      // Handle invalid color
      setError("Sorry, I couldn't recognize that colour.");
      setColor(null);
    }
    setInputValue("");
  }

  return (
    <div className="container">
      <h1>Color Explorer</h1>
      <div className="input-section">
        <input
          type="text"
          data-testid="color-input"
          placeholder="Type a color name e.g. lavender"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button data-testid="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
      {error && (
        <p className="error" data-testid="error-msg">
          {error}
        </p>
      )}
      {color && (
        <div className="color-box" data-testid="color-box">
          <div
            className="preview"
            role="presentation"
            data-testid="color-preview"
            style={{ backgroundColor: color.hex || "transparent" }}
          ></div>
          <p data-testid="color-name">
            <strong>Name:{color.name}</strong>
          </p>
          <p data-testid="color-hex">
            <strong>Hex:{color.hex}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorExplorer;
