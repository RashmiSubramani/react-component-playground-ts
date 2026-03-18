import React, { useState } from "react";
import "./styles.css";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`container ${isDark ? "dark-mode" : "light-mode"}`}>
      <h1>Dark Mode Toggle</h1>
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => setIsDark(!isDark)}
            checked={isDark}
          />
          <span className="sliderDarkModeToggle round"></span>
        </label>
        <span className="mode-text">{isDark ? "Dark" : "Light"} Mode</span>
      </div>
    </div>
  );
}

export default DarkModeToggle;
