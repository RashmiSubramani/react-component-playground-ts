/*
  TRAFFIC LIGHTS (Sequential Light Simulation)
  -----------------------------------------------
  Difficulty: Easy
  Concepts: union literal type for light colors, useEffect + useRef for
            recurring setTimeout chain, cleanup via ref flag,
            conditional className with ternary

  How it works:
  1. Component starts with the red light active
  2. A setTimeout chain cycles: Red (5s) → Yellow (2s) → Green (3s) → repeat
  3. Each light has a glow effect when active
  4. The cycle runs continuously until the component unmounts
*/

import { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type LightColor = "red" | "yellow" | "green";

type LightConfig = {
  color: LightColor;
  duration: number; // ms
};

// ─── Constants ──────────────────────────────────────────────────────

const LIGHT_SEQUENCE: LightConfig[] = [
  { color: "red", duration: 5000 },
  { color: "yellow", duration: 2000 },
  { color: "green", duration: 3000 },
];

// ─── Component ──────────────────────────────────────────────────────

function TrafficLights() {
  const [active, setActive] = useState<LightColor>("red");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    function cycle(index: number): void {
      if (!mountedRef.current) return;

      const { color, duration } = LIGHT_SEQUENCE[index];
      setActive(color);

      setTimeout(() => {
        if (!mountedRef.current) return;
        const nextIndex = (index + 1) % LIGHT_SEQUENCE.length;
        cycle(nextIndex);
      }, duration);
    }

    cycle(0);

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="tl-container">
      <h2>Traffic Lights</h2>

      <div className="tl-housing">
        {LIGHT_SEQUENCE.map(({ color }) => (
          <div
            key={color}
            className={`tl-light ${active === color ? `tl-${color}-on` : ""}`}
          >
            <FaCircle size={40} />
          </div>
        ))}
      </div>

      <p className="tl-status">
        Current: <strong>{active.charAt(0).toUpperCase() + active.slice(1)}</strong>
      </p>
    </div>
  );
}

export default TrafficLights;
