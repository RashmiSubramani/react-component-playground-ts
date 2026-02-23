/*
  ROOT LAYOUT (Layout Route)
  ---------------------------
  Routing concept: LAYOUT ROUTES

  A layout route wraps child routes with shared UI (sidebar, header, etc.)
  using <Outlet />. The child route's component renders WHERE <Outlet /> is placed.

  Think of it as:
    RootLayout = sidebar + <Outlet />
    <Outlet /> = whatever page/component the current URL matches

  Key imports from react-router-dom:
  - Outlet   → placeholder where child routes render
  - NavLink  → like <a> but adds "active" class when route matches
  - Link     → navigation without full page reload (uses History API)
*/

import { Outlet, NavLink, Link } from "react-router-dom";
import { getComponentsByDifficulty, type Difficulty } from "../routes/componentRegistry";

// Labels and colors for each difficulty section in sidebar
const difficultyConfig: Record<Difficulty, { label: string; emoji: string }> = {
  easy: { label: "Easy", emoji: "🟢" },
  medium: { label: "Medium", emoji: "🟡" },
  hard: { label: "Hard", emoji: "🔴" },
  advanced: { label: "Advanced Topics", emoji: "🔥" },
};

export default function RootLayout() {
  const grouped = getComponentsByDifficulty();

  return (
    <div className="app-layout">
      {/* ─── SIDEBAR ──────────────────────────────────────── */}
      <aside className="sidebar">
        {/* Link navigates without page reload (client-side routing) */}
        <h1>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Building Components
          </Link>
        </h1>

        {/* Render each difficulty section */}
        {(["easy", "medium", "hard", "advanced"] as Difficulty[]).map((difficulty) => {
          const components = grouped[difficulty];
          if (components.length === 0) return null;

          return (
            <div key={difficulty}>
              <h3>
                {difficultyConfig[difficulty].emoji} {difficultyConfig[difficulty].label}
              </h3>

              {components.map((entry) => (
                /*
                  NavLink vs Link:
                  - Link     → just navigates (no active styling)
                  - NavLink  → navigates AND adds "active" class when URL matches

                  The "active" class is used in index.css to highlight the current page.
                  NavLink also accepts a function for className:
                    className={({ isActive }) => isActive ? "active" : ""}
                */
                <NavLink
                  key={entry.path}
                  to={`/${entry.difficulty}/${entry.path}`}
                  // end prop = only match exact path (not child routes)
                  end
                >
                  {entry.name}
                </NavLink>
              ))}
            </div>
          );
        })}
      </aside>

      {/* ─── MAIN CONTENT ─────────────────────────────────── */}
      <main className="main-content">
        {/*
          Outlet = where the matched child route renders.

          If URL is /easy/accordion → Outlet renders <Accordion />
          If URL is / → Outlet renders <HomePage />
          If URL is /xyz → Outlet renders <NotFound />
        */}
        <Outlet />
      </main>
    </div>
  );
}
