// App.js
import React, { useState } from "react";
import "./styles.css";

export default function JSONFormatterAndValidator() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearMessages = () => {
    setError("");
    setSuccess("");
    setFormatted("");
  };

  const handleFormat = () => {
    // TODO: Implement format logic
    clearMessages();
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
      setSuccess("JSON formatted successfully!");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  const handleValidate = () => {
    // TODO: Implement validate logic
    clearMessages();
    try {
      JSON.parse(input);
      setSuccess("Valid JSON!");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  const handleMinify = () => {
    // TODO: Implement minify logic
    clearMessages();
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setSuccess("JSON minified successfully!");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  const handleClear = () => {
    // TODO: Implement clear logic
    setInput("");
    setFormatted("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="wrapper">
      <h1>JSON Formatter & Validator</h1>

      {/* Input Box */}
      <textarea
        placeholder="Enter JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        className="input-box"
        data-testid="json-input"
      />

      {/* Buttons */}
      <div className="btn-group">
        <button
          onClick={handleFormat}
          data-testid="format-btn"
          className="action-button"
        >
          Format
        </button>
        <button
          onClick={handleValidate}
          data-testid="validate-btn"
          className="action-button"
        >
          Validate
        </button>
        <button
          onClick={handleMinify}
          data-testid="minify-btn"
          className="action-button"
        >
          Minify
        </button>
        <button
          onClick={handleClear}
          data-testid="clear-btn"
          className="action-button"
        >
          Clear
        </button>
      </div>

      {/* Errors / Success */}
      {error && (
        <p className="error" data-testid="error-message">
          {error}
        </p>
      )}
      {success && (
        <p className="success" data-testid="success-message">
          {success}
        </p>
      )}

      {/* Output */}
      {formatted && (
        <textarea
          value={formatted}
          readOnly
          rows={10}
          className="output-box"
          data-testid="formatted-output"
        />
      )}
    </div>
  );
}
