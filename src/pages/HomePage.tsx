import { Link } from "react-router-dom";
import { getComponentsByDifficulty, type Difficulty } from "../routes/componentRegistry";

const config: Record<Difficulty, { label: string; emoji: string; color: string }> = {
  easy: { label: "Easy", emoji: "🟢", color: "#2ecc71" },
  medium: { label: "Medium", emoji: "🟡", color: "#f1c40f" },
  hard: { label: "Hard", emoji: "🔴", color: "#e74c3c" },
  advanced: { label: "Advanced", emoji: "🔥", color: "#e67e22" },
  games: { label: "Games", emoji: "🎮", color: "#9b59b6" },
};

export default function HomePage() {
  const grouped = getComponentsByDifficulty();
  const total = Object.values(grouped).reduce((s, a) => s + a.length, 0);

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Building Components</h1>
        <p>{total} React + TypeScript components organized by difficulty</p>
      </div>

      {(["easy", "medium", "hard", "advanced", "games"] as Difficulty[]).map((difficulty) => {
        const components = grouped[difficulty];
        if (!components || components.length === 0) return null;

        return (
          <section key={difficulty} className="home-section">
            <h2 className="home-section-title">
              <span
                className="home-section-dot"
                style={{ background: config[difficulty].color }}
              />
              {config[difficulty].label}
              <span className="home-section-count">{components.length}</span>
            </h2>

            <div className="home-grid">
              {components.map((entry) => (
                <Link
                  key={entry.path}
                  to={`/${entry.difficulty}/${entry.path}`}
                  className={`home-card home-card--${difficulty}`}
                >
                  <h4>{entry.name}</h4>
                  <p className="home-card-concepts">
                    {entry.concepts.slice(0, 3).join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
