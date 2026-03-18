import React, { useState } from "react";
import { marked } from "marked"; //library to convert Markdown to HTML
import "./styles.css";

// Markdown Editor Component
const MarkdownEditor = () => {
  const [text, setText] = useState(""); // store whatever the user types in the textarea

  return (
    <div className="editor-container">
      {/* LEFT SECTION: MARKDOWN INPUT */}
      <div className="editor-section">
        <h2>Markdown Input</h2>
        <textarea
          className="markdown-input"
          placeholder="Write Markdown here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="markdown-input"
        />
      </div>
      {/* RIGHT SECTION: LIVE PREVIEW */}
      <div className="preview-section">
        <h2>Live Preview</h2>
        <div
          className="markdown-preview"
          role="region"
          // Convert Markdown → HTML using marked()
          // EXAMPLE: "**bold**" -> "<strong>bold</strong>"
          dangerouslySetInnerHTML={{
            __html: marked(text),
          }}
          data-testid="markdown-preview" // required for tests
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
