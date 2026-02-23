import { useState, useRef, forwardRef, useImperativeHandle } from "react";

// ─── Types ──────────────────────────────────────────────────────────

// The "handle" — what the parent can call on the ref.
// This is the PUBLIC API of FancyInput. The parent does NOT get direct DOM access.
export type FancyInputHandle = {
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

// forwardRef<RefType, PropsType> lets the parent pass a ref to this component.
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

export default FancyInput;
