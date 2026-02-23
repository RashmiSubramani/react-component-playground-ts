/*
  HOOK: useContext — Theme Toggle (Light / Dark)
  -------------------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)

  Syntax patterns:
  1. createContext<Type | null>(null)   — create a typed context with null default
  2. <Context.Provider value={...}>     — wrap children to provide the value
  3. useContext(Context)                — consume the value in any nested child
  4. Custom hook with null guard        — useTheme() throws if used outside Provider
  5. Context value with updater         — value includes both state AND toggle function

  Everything is in ONE file for educational clarity.
  In a real app, context + provider would live in a separate file.
*/

import { useState, useContext, createContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./styles.css";

// ─── Step 1: Define the context type ────────────────────────────────

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void; // context provides the updater function too
};

// ─── Step 2: Create the context ─────────────────────────────────────

// Default is null — we'll guard against it in the custom hook.
const ThemeContext = createContext<ThemeContextType | null>(null);

// ─── Step 3: Custom hook with null guard ────────────────────────────

// Idiomatic pattern: always use a custom hook instead of raw useContext.
// This ensures TypeScript knows the value is NOT null inside consumers.
function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

// ─── Child components (consumers) ───────────────────────────────────

// These components are deeply nested — they access theme without prop drilling.
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`huc-header huc-header-${theme}`}>
      <span className="huc-header-title">My App</span>
      <button className="huc-toggle-btn" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
        {theme === "light" ? " Dark" : " Light"}
      </button>
    </header>
  );
}

function ContentCard() {
  const { theme } = useTheme();

  return (
    <div className={`huc-card huc-card-${theme}`}>
      <h4>Content Card</h4>
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <p className="huc-card-text">
        This component reads the theme via <code>useTheme()</code> — no props
        passed from the parent. The context value flows down automatically.
      </p>
    </div>
  );
}

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`huc-footer huc-footer-${theme}`}>
      Footer — theme: {theme}
    </footer>
  );
}

// ─── Step 4: Provider component ─────────────────────────────────────

function HookUseContext() {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // The Provider wraps all children that need access to the theme.
  // value={{ theme, toggleTheme }} passes both the state AND the updater.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="huc-container">
        <h2>Hook: useContext</h2>
        <p className="huc-subtitle">
          Theme toggle — createContext, Provider, useContext, custom hook
        </p>

        <div className={`huc-app huc-app-${theme}`}>
          {/* These children all consume ThemeContext without any props */}
          <Header />
          <ContentCard />
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default HookUseContext;
