/*
  AUTO-SAVE FORM (localStorage Persistence)
  --------------------------------------------
  Difficulty: Easy
  Concepts: typed form data object, localStorage get/set with JSON parse/stringify,
            two useEffect hooks (load on mount, save on change),
            loaded flag to prevent saving initial empty state,
            ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

  How it works:
  1. On mount: read saved form from localStorage, parse, set state
  2. On form change (after load): stringify and write back to localStorage
  3. Clear button resets state AND localStorage in sync
*/

import { useEffect, useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  message: string;
};

// ─── Constants ────────────────────────────────────────────────────

const STORAGE_KEY = "autosave";

const EMPTY_FORM: FormData = { name: "", email: "", message: "" };

// ─── Component ────────────────────────────────────────────────────

function AutoSaveForm() {
  // Lazy initializer — reads localStorage ONCE on first render (no effect needed)
  const [form, setForm] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as FormData) : EMPTY_FORM;
  });

  // Save to localStorage whenever form changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function clearForm() {
    setForm(EMPTY_FORM);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(EMPTY_FORM));
  }

  return (
    <div className="asf-container">
      <h2>Auto Save Form</h2>

      <form className="asf-form">
        <div className="asf-group">
          <label className="asf-label">Name:</label>
          <input
            className="asf-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="asf-group">
          <label className="asf-label">Email:</label>
          <input
            className="asf-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="asf-group">
          <label className="asf-label">Message:</label>
          <textarea
            className="asf-input asf-textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <button className="asf-btn" type="button" onClick={clearForm}>
          Clear
        </button>
      </form>
    </div>
  );
}

export default AutoSaveForm;
