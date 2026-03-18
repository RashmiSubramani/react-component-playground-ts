import { useEffect, useState } from "react";

function AutoSaveInputLocalStorage() {
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("autosave-text");
    if (saved) {
      setText(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("autosave-text", text);
  }, [text]);

  function onClear() {
    setText("");
    localStorage.removeItem("autosave-text");
  }

  return (
    <div>
      <h1>Auto Save Input</h1>

      {/* your code here  */}
      <label>Name :</label>
      <input
        type="text"
        data-testid="input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={onClear} data-testid="clear-btn">
        Clear
      </button>
    </div>
  );
}

export default AutoSaveInputLocalStorage;
