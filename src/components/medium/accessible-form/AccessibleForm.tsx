/*
  ACCESSIBLE FORM (Registration with ARIA)
  ------------------------------------------
  Difficulty: Easy
  Concepts: typed form data object with mixed value types (string | string[] | boolean),
            unified handleChange that branches on e.target.type,
            casting e.target to HTMLInputElement / HTMLSelectElement for checked / options,
            aria-invalid + aria-describedby for screen-reader-friendly errors,
            regex validation helpers typed with (value: string) => boolean

  TS highlights:
  - FormData has mixed field types → single object type with per-key types
  - handleChange receives ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    but only HTMLInputElement has .checked and only HTMLSelectElement has .options
    → we narrow with `as` casts inside type-guarded branches
  - aria-describedby expects string | undefined, not null → use `undefined`
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type AccessibleFormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  hobbies: string[];
  country: string;
  comments: string;
  agree: boolean;
};

// Errors map — only fields with errors get a string message
type FormErrors = Record<string, string>;

// ─── Validation helpers ───────────────────────────────────────────

const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone: string): boolean => /^\d{10}$/.test(phone);

// ─── Component ────────────────────────────────────────────────────

function AccessibleForm() {
  const [formData, setFormData] = useState<AccessibleFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    hobbies: [],
    country: "",
    comments: "",
    agree: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Unified change handler — branches on e.target.type to handle
  // text inputs, checkboxes, multi-selects, and textareas
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // For single checkbox - agree
      // Only HTMLInputElement has .checked — cast to access it
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "select-multiple") {
      // Only HTMLSelectElement has .options — cast to access it
      const selectEl = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(selectEl.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
      /**
       * Multi Select dropdown :
       * Array.from(selectEl.options) → converts HTMLOptionsCollection to array
      .filter(opt => opt.selected) → picks only selected ones
      .map(opt => opt.value) → extracts string values
      formData[name] → becomes an array of strings (string[]), e.g., ["Reading", "Sports"] */
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!validatePhone(formData.phone))
      newErrors.phone = "Invalid phone number";
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.agree)
      newErrors.agree = "You must agree to terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
    }
  }

  return (
    <form
      className="af-container"
      onSubmit={handleSubmit}
      aria-describedby="form-errors"
    >
      <h2 className="af-title">Registration Form</h2>

      {/* Name */}
      <div className="af-group">
        <label className="af-label" htmlFor="name">
          Name *
        </label>
        <input
          className={`af-input ${errors.name ? "af-error" : ""}`}
          id="name"
          name="name" //Only if you give name, we wil get e.target.name for line 66
          type="text"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span className="af-error-text" id="name-error">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="af-group">
        <label className="af-label" htmlFor="email">
          Email *
        </label>
        <input
          className={`af-input ${errors.email ? "af-error" : ""}`}
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span className="af-error-text" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      {/* Password */}
      <div className="af-group">
        <label className="af-label" htmlFor="password">
          Password *
        </label>
        <input
          className={`af-input ${errors.password ? "af-error" : ""}`}
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <span className="af-error-text" id="password-error">
            {errors.password}
          </span>
        )}
      </div>

      {/* Phone */}
      <div className="af-group">
        <label className="af-label" htmlFor="phone">
          Phone *
        </label>
        <input
          className={`af-input ${errors.phone ? "af-error" : ""}`}
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <span className="af-error-text" id="phone-error">
            {errors.phone}
          </span>
        )}
      </div>

      {/* Gender (Radio) */}
      <div className="af-group">
        <label className="af-label">Gender *</label>
        <div className="af-radio-group">
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender} className="af-radio-label">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleChange}
              />
              {gender}
            </label>
          ))}
        </div>
        {errors.gender && (
          <span className="af-error-text">{errors.gender}</span>
        )}
      </div>

      {/* Hobbies (Checkbox Multiple) */}
      <div className="af-group">
        <label className="af-label">Hobbies</label>
        <div className="af-checkbox-group">
          {["Reading", "Traveling", "Sports", "Music"].map((hobby) => (
            <label key={hobby} className="af-checkbox-label">
              <input
                type="checkbox"
                name="hobbies"
                value={hobby}
                checked={formData.hobbies.includes(hobby)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setFormData((prev) => {
                    const hobbies = [...prev.hobbies];
                    if (checked) hobbies.push(value);
                    else hobbies.splice(hobbies.indexOf(value), 1);
                    return { ...prev, hobbies };
                  });
                }}
              />
              {hobby}
            </label>
          ))}
        </div>
      </div>

      {/* Country (Single select) */}
      <div className="af-group">
        <label className="af-label" htmlFor="country">
          Country *
        </label>
        <select
          id="country"
          name="country"
          className={`af-input ${errors.country ? "af-error" : ""}`}
          value={formData.country}
          onChange={handleChange}
          aria-invalid={!!errors.country}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        {errors.country && (
          <span className="af-error-text">{errors.country}</span>
        )}
      </div>

      {/* Comments (Textarea) */}
      <div className="af-group">
        <label className="af-label" htmlFor="comments">
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          className="af-input"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      {/* Agree Checkbox */}
      <div className="af-group">
        <label className="af-checkbox-label">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="af-terms-input"
          />{" "}
          I agree to the terms *
        </label>
        {errors.agree && <span className="af-error-text">{errors.agree}</span>}
      </div>

      <button className="af-btn" type="submit">
        Submit
      </button>

      {submitted && Object.keys(errors).length === 0 && (
        <p className="af-success">Form submitted successfully!</p>
      )}
    </form>
  );
}

export default AccessibleForm;
