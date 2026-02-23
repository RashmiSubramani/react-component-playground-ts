/*
  HOME PAGE
  ----------
  Routing concept: INDEX ROUTE

  An index route renders when the parent route matches exactly.
  In our case, this renders at "/" (the root path).

  We define it as: <Route index element={<HomePage />} />
  The "index" prop means "render this when no child path matches"
*/

import { Link } from "react-router-dom";
import { getComponentsByDifficulty, type Difficulty } from "../routes/componentRegistry";

const difficultyEmoji: Record<Difficulty, string> = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
  advanced: "🔥",
};

export default function HomePage() {
  const grouped = getComponentsByDifficulty();

  return (
    <div className="home">
      <h2>All Components</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Click any component to view it. Each one is converted from JS to TypeScript with comments.
      </p>

      {(["easy", "medium", "hard", "advanced"] as Difficulty[]).map((difficulty) => {
        const components = grouped[difficulty];
        if (components.length === 0) return null;

        return (
          <div key={difficulty} style={{ marginBottom: 24 }}>
            <h3>
              {difficultyEmoji[difficulty]} {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </h3>
            <ul>
              {components.map((entry) => (
                <li key={entry.path}>
                  {/* Link = client-side navigation (no full page reload) */}
                  <Link to={`/${entry.difficulty}/${entry.path}`}>{entry.name}</Link>
                  {entry.concepts.map((c) => (
                    <span key={c} className="concept-tag">{c}</span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
