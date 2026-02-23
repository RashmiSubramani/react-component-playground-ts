/*
  STEPPER (Step Indicator with Progress Bar)
  --------------------------------------------
  Difficulty: Medium
  Concepts: StepConfig type with React.ComponentType,
            useRef<(HTMLDivElement | null)[]> for dynamic ref array,
            ref callback to store per-step DOM elements,
            useEffect for margin calculation from offsetWidth,
            progress bar width as percentage of (currentStep - 1) / (totalSteps - 1)

  How it works:
  1. Renders step circles + labels from stepsConfig
  2. A horizontal progress bar spans between the first and last step centers
  3. Margins calculated from first/last step widths via refs
  4. "Next" advances the step; last step shows "Finish" → marks complete
  5. Active step's Component is rendered below the stepper
*/
import { useEffect, useRef, useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

// Each step has a name and a component that renders its content
type StepConfig = {
  name: string;
  Component: React.ComponentType;
};

// ─── Config ───────────────────────────────────────────────────────

// Steps in the stepper — you can add/remove steps easily
const stepsConfig: StepConfig[] = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div>Your order has been delivered.</div>,
  },
];

// ─── Stepper Component ────────────────────────────────────────────

function Stepper() {
  const [currentStep, setCurrentStep] = useState(1); // Current active step (1-indexed)
  const [isComplete, setIsComplete] = useState(false); // Flag to know when the stepper is completed
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 }); // Margins for the progress bar to align with step circles

  // Mutable array of refs — one per step to get DOM measurements
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  // ── Calculate progress bar margins once the component mounts
  useEffect(() => {
    const first = stepRef.current[0]; // First step circle
    const last = stepRef.current[stepsConfig.length - 1]; // Last step circle

    if (first && last) {
      // Margin = half of first/last circle width so progress bar aligns perfectly
      setMargins({
        marginLeft: first.offsetWidth / 2,
        marginRight: last.offsetWidth / 2,
      });
    }
  }, []);

  // Guard for empty stepsConfig
  if (!stepsConfig.length) return null;

  // ── Navigate to next step
  function handleNext() {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        // Last step → mark complete
        setIsComplete(true);
        return prevStep;
      }
      return prevStep + 1;
    });
  }

  // ── Calculate progress percentage for inner progress div
  function calculateProgressBarWidth(): number {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  }

  // Get the component for the active step
  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      {/* ── Stepper Header ── */}
      <div className="stp-stepper">
        {stepsConfig.map((step, index) => (
          <div
            key={step.name}
            ref={(el) => {
              // Store each step's DOM element in ref array for measurement
              stepRef.current[index] = el;
            }}
            className={`stp-step ${
              currentStep > index + 1 || isComplete ? "stp-complete" : ""
            } ${currentStep === index + 1 ? "stp-active" : ""}`}
          >
            {/* Step circle */}
            <div className="stp-number">
              {/* Show checkmark if completed */}
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>

            {/* Step label */}
            <div className="stp-name">{step.name}</div>
          </div>
        ))}

        {/* ── Progress bar container ── */}
        <div
          className="stp-progress-bar"
          style={{
            // Total width minus first/last step margins
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          {/* Inner progress bar showing actual progress */}
          <div
            className="stp-progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          />
        </div>
      </div>

      {/* ── Current step content ── */}
      {ActiveComponent && <ActiveComponent />}

      {/* ── Navigation button ── */}
      {!isComplete && (
        <button className="stp-btn" onClick={handleNext}>
          {/* Change text on last step */}
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
}

export default Stepper;
