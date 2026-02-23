/*
  MULTI-STEP FORM (Wizard with Per-Step Validation)
  ---------------------------------------------------
  Difficulty: Medium
  Concepts: config-driven steps, FieldType union literal,
            Record<string, FormValue> for form data,
            Record<string, string> for errors,
            step index navigation, per-step validation,
            conditional field renderer (if-chain)

  Architecture:
  stepsConfig[] → each step has { title, fields[] }
  MultiStepForm → tracks currentStep index, renders only the active step,
                  validates current step before advancing, submits on last step
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

// Union of supported field types in each step
type FieldType = "text" | "email" | "textarea" | "select" | "multi-select";

// A single field config inside a step
type StepField = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select, multi-select
  required?: boolean;
};

// One step in the wizard
type Step = {
  title: string;
  fields: StepField[];
};

// Form value — string for text/email/textarea/select, string[] for multi-select
type FormValue = string | string[];

// Form data and errors as Record types
type FormData = Record<string, FormValue>;
type FormErrors = Record<string, string>;

// Props for MultiStepForm
type MultiStepFormProps = {
  steps: Step[];
};

// ─── MultiStepForm component ──────────────────────────────────────

function MultiStepForm({ steps }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const step = steps[currentStep];

  function handleChange(name: string, value: FormValue) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleMultiSelect(name: string, option: string) {
    const current = (formData[name] as string[] | undefined) || [];
    if (current.includes(option)) {
      handleChange(
        name,
        current.filter((v) => v !== option),
      );
    } else {
      handleChange(name, [...current, option]);
    }
  }

  // Validate only the fields in the current step
  function validateStep(): boolean {
    const newErrors: FormErrors = {};
    step.fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && (!value || value.length === 0)) {
        newErrors[field.name] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function handlePrev() {
    setCurrentStep((prev) => prev - 1);
  }

  function handleSubmit() {
    if (!validateStep()) return;
    console.log("Final Form Data:", formData);
    alert("Form submitted successfully!");
  }

  // Field renderer — returns the correct input for each field type
  function renderField(field: StepField): React.ReactNode {
    const value: FormValue = formData[field.name] || "";

    if (field.type === "text" || field.type === "email") {
      return (
        <input
          className={`msf-input ${errors[field.name] ? "msf-error" : ""}`}
          type={field.type}
          value={value as string}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          className={`msf-input ${errors[field.name] ? "msf-error" : ""}`}
          value={value as string}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          className={`msf-input ${errors[field.name] ? "msf-error" : ""}`}
          value={value as string}
          onChange={(e) => handleChange(field.name, e.target.value)}
        >
          <option value="">Select</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "multi-select") {
      return (
        <div className="msf-checkbox-group">
          {field.options?.map((opt) => (
            <label key={opt} className="msf-checkbox-label">
              <input
                type="checkbox"
                checked={Array.isArray(value) && value.includes(opt)}
                onChange={() => handleMultiSelect(field.name, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    }

    return null;
  }

  return (
    <div className="msf-container">
      <h2 className="msf-title">{step.title}</h2>

      {step.fields.map((field) => (
        <div className="msf-group" key={field.name}>
          <label className="msf-label">{field.label}</label>
          {renderField(field)}
          {errors[field.name] && (
            <span className="msf-error-text">{errors[field.name]}</span>
          )}
        </div>
      ))}

      <div className="msf-actions">
        {currentStep > 0 && (
          <button className="msf-btn secondary" onClick={handlePrev}>
            Back
          </button>
        )}

        {currentStep < steps.length - 1 ? (
          <button className="msf-btn" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="msf-btn" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function MultiStepFormWrapper() {
  const stepsConfig: Step[] = [
    {
      title: "Personal Info",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
      ],
    },
    {
      title: "Profile",
      fields: [
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Other"],
          required: true,
        },
        {
          name: "skills",
          label: "Skills",
          type: "multi-select",
          options: ["React", "Node", "Java", "Python"],
        },
      ],
    },
    {
      title: "Confirmation",
      fields: [{ name: "bio", label: "Bio", type: "textarea" }],
    },
  ];

  return <MultiStepForm steps={stepsConfig} />;
}
