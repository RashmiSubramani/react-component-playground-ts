/*
  DYNAMIC FORM (Config-driven with Validation)
  -----------------------------------------------
  Difficulty: Medium
  Concepts: config-driven rendering, discriminated field types via union literal,
            Record<string, string> for errors, Record<string, FormValue> for form data,
            RegExp in validation config, switch-based field renderer,
            typing form events (FormEvent, ChangeEvent)

  Architecture:
  formConfig[] → each field has { name, label, type, options?, validations? }
  DynamicForm  → iterates config, renders the right input via switch(type),
                 validates on submit, displays errors per field
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

// Union of all possible field types
type FieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "radio"
  | "checkbox"
  | "select"
  | "multi-select";

// Validation rules — all optional since not every field has validation
type FieldValidations = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp; // typed as RegExp — gives .test() autocomplete
};

// A single field in the config array
type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // for radio, checkbox, select, multi-select
  validations?: FieldValidations;
};

// Form data value — can be a string (text/radio/select) or string[] (checkbox/multi-select)
type FormValue = string | string[];

// Form data and errors as Record types
type FormData = Record<string, FormValue>;
type FormErrors = Record<string, string>;

// Props for DynamicForm
type DynamicFormProps = {
  config: FieldConfig[];
};

// ─── Config ───────────────────────────────────────────────────────

const formConfig: FieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    validations: { required: true, minLength: 3 },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    validations: { required: true, pattern: /^\S+@\S+\.\S+$/ },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    validations: { required: true, minLength: 6 },
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself",
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
    validations: { required: true },
  },
  {
    name: "hobbies",
    label: "Hobbies",
    type: "checkbox",
    options: ["Reading", "Traveling", "Gaming", "Cooking"],
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: ["USA", "India", "UK", "Canada"],
    validations: { required: true },
  },
  {
    name: "skills",
    label: "Skills",
    type: "multi-select",
    options: ["React", "Node", "Python", "Java"],
  },
];

// ─── DynamicForm component ────────────────────────────────────────

function DynamicForm({ config }: DynamicFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(name: string, value: FormValue) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleCheckboxChange(name: string, option: string) {
    const currentValues = (formData[name] as string[] | undefined) || [];
    if (currentValues.includes(option)) {
      handleChange(
        name,
        currentValues.filter((v) => v !== option),
      );
    } else {
      handleChange(name, [...currentValues, option]);
    }
  }

  // Validate a single field — returns error message or empty string
  function validateField(field: FieldConfig, value: FormValue | undefined): string {
    const { validations } = field;
    if (!validations) return "";
    if (validations.required && (!value || value.length === 0))
      return "This field is required";
    if (
      validations.minLength &&
      typeof value === "string" &&
      value.length < validations.minLength
    )
      return `Minimum length is ${validations.minLength}`;
    if (
      validations.pattern &&
      typeof value === "string" &&
      !validations.pattern.test(value)
    )
      return "Invalid format";
    return "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors: FormErrors = {};
    config.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  }

  // Switch-based field renderer — returns the correct input for each field type
  function renderField(field: FieldConfig): React.ReactNode {
    const { name, type, options, placeholder } = field;
    const value: FormValue = formData[name] || "";

    switch (type) {
      case "text":
      case "email":
      case "password":
        return (
          <input
            id={name}
            className={`form-input ${errors[name] ? "error" : ""}`}
            type={type}
            value={value as string}
            placeholder={placeholder || ""}
            onChange={(e) => handleChange(name, e.target.value)}
          />
        );

      case "textarea":
        return (
          <textarea
            id={name}
            className={`form-input ${errors[name] ? "error" : ""}`}
            value={value as string}
            placeholder={placeholder || ""}
            onChange={(e) => handleChange(name, e.target.value)}
          />
        );

      case "select":
        return (
          <select
            id={name}
            className={`form-input ${errors[name] ? "error" : ""}`}
            value={value as string}
            onChange={(e) => handleChange(name, e.target.value)}
          >
            <option value="">Select</option>
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="radio-group">
            {options?.map((opt) => (
              <label key={opt} className="radio-label">
                <input
                  type="radio"
                  name={name}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => handleChange(name, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "checkbox":
      case "multi-select":
        return (
          <div className="checkbox-group">
            {options?.map((opt) => (
              <label key={opt} className="checkbox-label">
                <input
                  type="checkbox"
                  value={opt}
                  checked={Array.isArray(value) && value.includes(opt)}
                  onChange={() => handleCheckboxChange(name, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Dynamic Form</h2>

      {config.map((field) => (
        <div className="form-group" key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <span className="form-error">{errors[field.name]}</span>
          )}
        </div>
      ))}

      <button type="submit" className="form-btn">
        Submit
      </button>
    </form>
  );
}

// ─── Wrapper for demo ─────────────────────────────────────────────

export default function DynamicFormWrapper() {
  return <DynamicForm config={formConfig} />;
}
