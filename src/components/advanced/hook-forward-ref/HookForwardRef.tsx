/*
  HOOK: forwardRef + useImperativeHandle — Custom Input Controls
  -----------------------------------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)
  Concepts: forwardRef with typed ref, useImperativeHandle to expose
            custom methods, Ref<Handle> typing, parent controlling child DOM

  Patterns demonstrated:
  1. forwardRef<Handle, Props>      — wraps a component to accept a ref from parent
  2. useImperativeHandle(ref, ...)   — exposes custom methods (focus, clear, shake)
                                       instead of the raw DOM node
  3. Typed handle interface          — parent only sees the methods you choose to expose
  4. Multiple FancyInput instances   — parent can control each independently via refs
  5. When to use this pattern        — reusable components where the parent needs
                                       imperative control (focus, scroll, reset, animate)
*/

import { useRef } from "react";
import { FaCrosshairs, FaEraser, FaBolt, FaLock, FaUnlock } from "react-icons/fa";
import FancyInput, { type FancyInputHandle } from "./FancyInput";
import "./styles.css";

// ─── Parent Component ───────────────────────────────────────────────

function HookForwardRef() {
  // Parent creates refs typed with the HANDLE, not the DOM element.
  // It can only call .focus(), .clear(), .shake(), etc. — NOT .style or .innerHTML.
  const nameRef = useRef<FancyInputHandle>(null);
  const emailRef = useRef<FancyInputHandle>(null);
  return (
    <div className="hfr-container">
      <h2>Hook: forwardRef</h2>
      <p className="hfr-subtitle">
        Custom Input — forwardRef + useImperativeHandle for parent control
      </p>

      {/* ── The two FancyInput instances ── */}
      <div className="hfr-inputs">
        <FancyInput ref={nameRef} label="Name" placeholder="Enter your name..." />
        <FancyInput ref={emailRef} label="Email" placeholder="Enter your email..." />
      </div>

      {/* ── Control panels ── */}
      <div className="hfr-panels">
        <div className="hfr-panel">
          <h4 className="hfr-panel-title">Control: Name Input</h4>
          <div className="hfr-btn-group">
            <button
              className="hfr-btn hfr-focus-btn"
              onClick={() => nameRef.current?.focus()}
            >
              <FaCrosshairs size={11} /> Focus
            </button>
            <button
              className="hfr-btn hfr-clear-btn"
              onClick={() => nameRef.current?.clear()}
            >
              <FaEraser size={11} /> Clear
            </button>
            <button
              className="hfr-btn hfr-shake-btn"
              onClick={() => nameRef.current?.shake()}
            >
              <FaBolt size={11} /> Shake
            </button>
            <button
              className="hfr-btn hfr-disable-btn"
              onClick={() => nameRef.current?.disable()}
            >
              <FaLock size={11} /> Disable
            </button>
            <button
              className="hfr-btn hfr-enable-btn"
              onClick={() => nameRef.current?.enable()}
            >
              <FaUnlock size={11} /> Enable
            </button>
          </div>
        </div>

        <div className="hfr-panel">
          <h4 className="hfr-panel-title">Control: Email Input</h4>
          <div className="hfr-btn-group">
            <button
              className="hfr-btn hfr-focus-btn"
              onClick={() => emailRef.current?.focus()}
            >
              <FaCrosshairs size={11} /> Focus
            </button>
            <button
              className="hfr-btn hfr-clear-btn"
              onClick={() => emailRef.current?.clear()}
            >
              <FaEraser size={11} /> Clear
            </button>
            <button
              className="hfr-btn hfr-shake-btn"
              onClick={() => emailRef.current?.shake()}
            >
              <FaBolt size={11} /> Shake
            </button>
            <button
              className="hfr-btn hfr-disable-btn"
              onClick={() => emailRef.current?.disable()}
            >
              <FaLock size={11} /> Disable
            </button>
            <button
              className="hfr-btn hfr-enable-btn"
              onClick={() => emailRef.current?.enable()}
            >
              <FaUnlock size={11} /> Enable
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HookForwardRef;
