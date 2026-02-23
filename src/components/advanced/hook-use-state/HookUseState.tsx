/*
  HOOK: useState — User Profile Editor
  ----------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)
  Concepts: useState<object>, useState<string[]>, functional updater,
            lazy initializer, derived values (computed, NOT stored in state)

  Patterns demonstrated:
  1. Primitive state     — useState<string> for the tag input
  2. Object state        — useState<UserProfile> with spread-merge updates
  3. Array state          — useState<string[]> with add (spread) / remove (filter)
  4. Functional updater  — setProfile(prev => ...) to avoid stale closures
  5. Lazy initializer    — useState(() => loadSaved()) for expensive initial values
  6. Derived values      — character count computed inline, NOT stored in state
*/

import { useState } from "react";
import { FaPlus, FaTimes, FaUndo, FaUser } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type UserProfile = {
  name: string;
  email: string;
  bio: string;
};

// ─── Constants ──────────────────────────────────────────────────────

const DEFAULT_PROFILE: UserProfile = {
  name: "Jane Doe",
  email: "jane@example.com",
  bio: "Frontend developer who loves React and TypeScript.",
};

const BIO_MAX_LENGTH = 150;

// ─── Simulated saved data (for lazy initializer demo) ───────────────

function loadSavedProfile(): UserProfile {
  // In a real app this could be localStorage.getItem + JSON.parse.
  // The key point: this function runs ONCE on mount, not on every render.
  return { ...DEFAULT_PROFILE };
}

// ─── Component ──────────────────────────────────────────────────────

function HookUseState() {
  // ── Pattern 1: Lazy initializer ──
  // The function form useState(() => ...) ensures loadSavedProfile
  // runs only on the FIRST render, not on every re-render.
  const [profile, setProfile] = useState<UserProfile>(() => loadSavedProfile());

  // ── Pattern 2: Primitive state ──
  const [tagInput, setTagInput] = useState("");

  // ── Pattern 3: Array state ──
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);

  // ── Pattern 6: Derived value — computed, NOT stored in state ──
  // No need for useState here — it's a pure function of existing state.
  // Storing it in state would be redundant and risk going out of sync.
  const bioCharsLeft = BIO_MAX_LENGTH - profile.bio.length;

  // ── Handlers ──────────────────────────────────────────────────────

  // ChangeEvent<HTMLInputElement> — typed event from the name input
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile((prev) => ({ ...prev, name: e.target.value }));
  }

  // ChangeEvent<HTMLInputElement> — typed event from the email input
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile((prev) => ({ ...prev, email: e.target.value }));
  }

  // ChangeEvent<HTMLTextAreaElement> — typed event from the bio textarea
  function handleBioChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setProfile((prev) => ({ ...prev, bio: e.target.value }));
  }

  // ChangeEvent<HTMLInputElement> — typed event from the tag input
  function handleTagInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTagInput(e.target.value);
  }

  // Pattern 3: Array state — add with spread
  function addSkill(): void {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      setTagInput("");
      return;
    }
    // Pattern 5: Functional updater — guarantees latest state
    setSkills((prev) => [...prev, trimmed]);
    setTagInput("");
  }

  // Pattern 3: Array state — remove with filter
  function removeSkill(skill: string): void {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  // Reset everything back to defaults
  function handleReset(): void {
    setProfile({ ...DEFAULT_PROFILE });
    setSkills(["React", "TypeScript"]);
    setTagInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") addSkill();
  }

  return (
    <div className="hus-container">
      <h2>Hook: useState</h2>
      <p className="hus-subtitle">User Profile Editor — demonstrating all useState patterns</p>

      {/* ── Profile form (object state) ── */}
      <div className="hus-card">
        <div className="hus-avatar">
          <FaUser size={28} />
        </div>

        <label className="hus-label">
          Name
          <input
            className="hus-input"
            type="text"
            value={profile.name}
            onChange={handleNameChange}
          />
        </label>

        <label className="hus-label">
          Email
          <input
            className="hus-input"
            type="email"
            value={profile.email}
            onChange={handleEmailChange}
          />
        </label>

        <label className="hus-label">
          Bio
          <textarea
            className="hus-textarea"
            value={profile.bio}
            maxLength={BIO_MAX_LENGTH}
            onChange={handleBioChange}
          />
          {/* Derived value — no useState needed */}
          <span className={`hus-char-count ${bioCharsLeft < 20 ? "hus-char-warn" : ""}`}>
            {bioCharsLeft} characters remaining
          </span>
        </label>
      </div>

      {/* ── Skills (array state) ── */}
      <div className="hus-card">
        <h3 className="hus-section-title">Skills</h3>

        <div className="hus-tag-input-row">
          <input
            className="hus-input"
            type="text"
            placeholder="Add a skill..."
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="hus-btn hus-add-btn" onClick={addSkill}>
            <FaPlus size={12} /> Add
          </button>
        </div>

        <div className="hus-tags">
          {skills.length === 0 && (
            <span className="hus-empty">No skills added yet.</span>
          )}
          {skills.map((skill) => (
            <span key={skill} className="hus-tag">
              {skill}
              <button
                className="hus-tag-remove"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
              >
                <FaTimes size={10} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ── Preview + Reset ── */}
      <div className="hus-card hus-preview">
        <h3 className="hus-section-title">Live Preview</h3>
        <p><strong>{profile.name}</strong> ({profile.email})</p>
        <p className="hus-preview-bio">{profile.bio}</p>
        {skills.length > 0 && (
          <p className="hus-preview-skills">Skills: {skills.join(", ")}</p>
        )}
      </div>

      <button className="hus-btn hus-reset-btn" onClick={handleReset}>
        <FaUndo size={12} /> Reset All
      </button>
    </div>
  );
}

export default HookUseState;
