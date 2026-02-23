/*
  HOOK: useRef — Simple Form with Refs
  ----------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)

  Syntax patterns:
  1. useRef<HTMLInputElement>(null)  — DOM element access
  2. useRef<number>(0)              — mutable value that persists across renders
                                      (does NOT trigger re-render when changed)
  3. ref.current                    — reading/writing the ref value
  4. ref.current?.focus()           — optional chaining for null safety
*/

import { useState, useRef, useEffect } from "react";
import { FaCrosshairs } from "react-icons/fa";
import "./styles.css";

function HookUseRef() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ── Pattern 1: DOM element ref ──
  // Typed as the specific HTML element. Starts as null (no DOM yet).
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // ── Pattern 2: Mutable value ref (NOT for DOM) ──
  // Changing this does NOT cause a re-render.
  // Compare: useState would re-render on every increment.
  const renderCount = useRef<number>(0);

  // Increment on every render — but this doesn't CAUSE a render
  renderCount.current += 1;

  // ── Pattern 3: Auto-focus on mount ──
  useEffect(() => {
    // ref.current is the actual <input> DOM element after mount
    nameRef.current?.focus();
  }, []);

  // ChangeEvent<HTMLInputElement> — typed event from the name input
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  // ChangeEvent<HTMLInputElement> — typed event from the email input
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleFocusEmail(): void {
    // Parent can imperatively focus any input via its ref
    emailRef.current?.focus();
  }

  function handleSubmit(): void {
    // Validate: if name is empty, focus that field
    if (!name.trim()) {
      nameRef.current?.focus();
      return;
    }
    if (!email.trim()) {
      emailRef.current?.focus();
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="hur-container">
      <h2>Hook: useRef</h2>
      <p className="hur-subtitle">
        Simple form — DOM refs, mutable render counter, auto-focus
      </p>

      {/* Render count — updates every render but does NOT cause one */}
      <div className="hur-render-badge">
        Renders: {renderCount.current}
      </div>

      <div className="hur-form">
        <label className="hur-label">
          Name
          {/* ref={nameRef} connects this <input> to the ref */}
          <input
            ref={nameRef}
            className="hur-input"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Auto-focused on mount"
          />
        </label>

        <label className="hur-label">
          Email
          <input
            ref={emailRef}
            className="hur-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Click button below to focus"
          />
        </label>

        <div className="hur-actions">
          <button className="hur-btn hur-focus-btn" onClick={handleFocusEmail}>
            <FaCrosshairs size={11} /> Focus Email
          </button>
          <button className="hur-btn hur-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {submitted && (
        <div className="hur-result">
          Submitted: <strong>{name}</strong> ({email})
        </div>
      )}
    </div>
  );
}

export default HookUseRef;
