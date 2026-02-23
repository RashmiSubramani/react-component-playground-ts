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

import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { FaCrosshairs, FaEraser, FaBolt, FaLock, FaUnlock } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

// The "handle" — what the parent can call on the ref.
// This is the PUBLIC API of FancyInput. The parent does NOT get direct DOM access.
type FancyInputHandle = {
  focus: () => void;
  clear: () => void;
  shake: () => void;
  disable: () => void;
  enable: () => void;
  getValue: () => string;
};

type FancyInputProps = {
  label: string;
  placeholder?: string;
};

// ─── FancyInput (child with forwardRef) ─────────────────────────────

// forwardRef<HandleType, PropsType> lets the parent pass a ref to this component.
// Without forwardRef, the ref would be ignored.
const FancyInput = forwardRef<FancyInputHandle, FancyInputProps>(
  function FancyInput({ label, placeholder = "Type here..." }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    // useImperativeHandle customizes what the parent sees when it uses the ref.
    // Instead of exposing the raw <input> DOM element, we expose specific methods.
    // This is an "escape hatch" — use it sparingly for imperative operations
    // that can't be expressed via props (focus, scroll, animations).
    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },

      clear() {
        if (inputRef.current) {
          // Directly mutating DOM — this is why imperative handle exists
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      },

      shake() {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      },

      disable() {
        setIsDisabled(true);
      },

      enable() {
        setIsDisabled(false);
        inputRef.current?.focus();
      },

      getValue() {
        return inputRef.current?.value ?? "";
      },
    }));

    return (
      <div className={`hfr-field ${isShaking ? "hfr-shake" : ""}`}>
        <label className="hfr-label">{label}</label>
        <input
          ref={inputRef}
          className="hfr-input"
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
        />
        {isDisabled && <span className="hfr-disabled-tag">Disabled</span>}
      </div>
    );
  },
);

// ─── Parent Component ───────────────────────────────────────────────

function HookForwardRef() {
  // Parent creates refs typed with the HANDLE, not the DOM element.
  // It can only call .focus(), .clear(), .shake(), etc. — NOT .style or .innerHTML.
  const nameRef = useRef<FancyInputHandle>(null);
  const emailRef = useRef<FancyInputHandle>(null);
  const [log, setLog] = useState<string[]>([]);

  function addLog(msg: string): void {
    setLog((prev) => [`> ${msg}`, ...prev].slice(0, 8));
  }

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
              onClick={() => {
                nameRef.current?.focus();
                addLog("nameRef.focus()");
              }}
            >
              <FaCrosshairs size={11} /> Focus
            </button>
            <button
              className="hfr-btn hfr-clear-btn"
              onClick={() => {
                nameRef.current?.clear();
                addLog("nameRef.clear()");
              }}
            >
              <FaEraser size={11} /> Clear
            </button>
            <button
              className="hfr-btn hfr-shake-btn"
              onClick={() => {
                nameRef.current?.shake();
                addLog("nameRef.shake()");
              }}
            >
              <FaBolt size={11} /> Shake
            </button>
            <button
              className="hfr-btn hfr-disable-btn"
              onClick={() => {
                nameRef.current?.disable();
                addLog("nameRef.disable()");
              }}
            >
              <FaLock size={11} /> Disable
            </button>
            <button
              className="hfr-btn hfr-enable-btn"
              onClick={() => {
                nameRef.current?.enable();
                addLog("nameRef.enable()");
              }}
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
              onClick={() => {
                emailRef.current?.focus();
                addLog("emailRef.focus()");
              }}
            >
              <FaCrosshairs size={11} /> Focus
            </button>
            <button
              className="hfr-btn hfr-clear-btn"
              onClick={() => {
                emailRef.current?.clear();
                addLog("emailRef.clear()");
              }}
            >
              <FaEraser size={11} /> Clear
            </button>
            <button
              className="hfr-btn hfr-shake-btn"
              onClick={() => {
                emailRef.current?.shake();
                addLog("emailRef.shake()");
              }}
            >
              <FaBolt size={11} /> Shake
            </button>
            <button
              className="hfr-btn hfr-disable-btn"
              onClick={() => {
                emailRef.current?.disable();
                addLog("emailRef.disable()");
              }}
            >
              <FaLock size={11} /> Disable
            </button>
            <button
              className="hfr-btn hfr-enable-btn"
              onClick={() => {
                emailRef.current?.enable();
                addLog("emailRef.enable()");
              }}
            >
              <FaUnlock size={11} /> Enable
            </button>
          </div>
        </div>
      </div>

      {/* ── Get both values ── */}
      <button
        className="hfr-btn hfr-read-btn"
        onClick={() => {
          const name = nameRef.current?.getValue() ?? "";
          const email = emailRef.current?.getValue() ?? "";
          addLog(`getValue() → name="${name}", email="${email}"`);
        }}
      >
        Read Both Values
      </button>

      {/* ── Action log ── */}
      {log.length > 0 && (
        <div className="hfr-log">
          <h4 className="hfr-log-title">Action Log</h4>
          {log.map((entry, i) => (
            <div key={i} className="hfr-log-entry">{entry}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HookForwardRef;
