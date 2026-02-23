/*
  TOOLTIP (Hover + Focus)
  -------------------------
  Difficulty: Easy
  Concepts: React.ReactNode for children prop,
            boolean visibility toggle with onMouseEnter/Leave,
            onFocus/onBlur for keyboard accessibility,
            tabIndex={0} to make span focusable

  Shows a positioned tooltip above the wrapped element on hover or focus.
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

// ─── Component ────────────────────────────────────────────────────

function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tt-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
    >
      {children}
      {visible && <span className="tt-tooltip">{content}</span>}
    </span>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function TooltipWrapper() {
  return (
    <div className="tt-demo">
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>

      <br />
      <br />

      <Tooltip content="More info here">
        <span className="tt-underline">Hover text</span>
      </Tooltip>
    </div>
  );
}
