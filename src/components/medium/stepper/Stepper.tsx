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

type StepConfig = {
  name: string;
  Component: React.ComponentType;
};

// ─── Config ───────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────

function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });

  // Mutable ref array — one slot per step for DOM measurement
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate progress bar margins from first/last step widths
  useEffect(() => {
    const first = stepRef.current[0];
    const last = stepRef.current[stepsConfig.length - 1];
    if (first && last) {
      setMargins({
        marginLeft: first.offsetWidth / 2,
        marginRight: last.offsetWidth / 2,
      });
    }
  }, []);

  if (!stepsConfig.length) return null;

  function handleNext() {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      }
      return prevStep + 1;
    });
  }

  function calculateProgressBarWidth(): number {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  }

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      {/* Stepper header */}
      <div className="stp-stepper">
        {stepsConfig.map((step, index) => (
          <div
            key={step.name}
            ref={(el) => {
              stepRef.current[index] = el;
            }}
            className={`stp-step ${
              currentStep > index + 1 || isComplete ? "stp-complete" : ""
            } ${currentStep === index + 1 ? "stp-active" : ""}`}
          >
            {/* Step circle */}
            <div className="stp-number">
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

        {/* Progress bar */}
        <div
          className="stp-progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="stp-progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          />
        </div>
      </div>

      {/* Current step content */}
      {ActiveComponent && <ActiveComponent />}

      {/* Navigation button */}
      {!isComplete && (
        <button className="stp-btn" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
}

export default Stepper;
