import { useState } from "react";
import "./styles.css";

function CharacterCount() {
  const [maxLength, setMaxLength] = useState(50);
  const [text, setText] = useState("");

  const textLength = text.length;
  const overLimit = textLength > maxLength;
  let warningLimit = Math.floor(maxLength * 0.9);
  let warning = textLength >= warningLimit;

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="characterCount">
      <h1>Character Count</h1>
      <p>Track your input length with live character warnings.</p>

      <div className="container">
        <div className="inputs">
          <label>
            Max length:
            <input
              type="number"
              min="0"
              max="1000"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
              data-testid="maxlength"
            />
          </label>
        </div>
        <textarea
          className="text"
          placeholder="Start Typing"
          data-testid="textarea"
          value={text}
          onChange={handleChange}
        ></textarea>

        <div className="char-info" data-testid="char-info">
          {textLength} / {maxLength}
        </div>

        <div className="warnings">
          {/* Show  Overlimit message if limit is exceeded*/}
          {overLimit && (
            <p
              className="error-message"
              data-testid="error-text"
            >{`Limit exceeded by ${textLength - maxLength} characters`}</p>
          )}

          {/* Show Warning if it reaches to 90 */}
          {warning && !overLimit && (
            <p className="warning-text" data-testid="warning-text">
              You are close to the limit!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default CharacterCount;
