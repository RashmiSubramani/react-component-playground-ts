import { useState } from "react";

function CopyToClipboard() {
  const [inputvalue, setinputvalue] = useState("");
  const [error, setError] = useState("");
  const [copy, setCopy] = useState(false);

  function handleCopy(value) {
    if (!inputvalue.trim()) {
      setError("Type some values to copy");
      return;
    }

    navigator.clipboard.writeText(value);
    setCopy(true);

    setTimeout(() => setCopy(false), 2000);
  }

  return (
    <div className="copyToClipboard">
      <h1>Copy to Clipboard</h1>
      <p>Click the button to copy the text</p>

      <div className="copyToClipboard-container">
        <div className="form">
          <label htmlFor="text">
            Enter your text:
            <input
              type="text"
              id="text"
              data-testid="input-field"
              placeholder="Type Something"
              value={inputvalue}
              onChange={(e) => setinputvalue(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              handleCopy(inputvalue);
            }}
            className="btn"
            data-testid="copy-button"
          >
            Copy
          </button>
          {error && (
            <div className="errorMessage" data-testid="error-message">
              {error}
            </div>
          )}
          {copy && (
            <div className="message" data-testid="copied-message">
              Copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CopyToClipboard;
