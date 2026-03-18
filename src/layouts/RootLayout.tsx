import { useState, useMemo } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  componentRegistry,
  type Difficulty,
  type ComponentEntry,
} from "../routes/componentRegistry";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "advanced", "games"];

const LABELS: Record<Difficulty, { label: string; emoji: string }> = {
  easy: { label: "Easy", emoji: "🟢" },
  medium: { label: "Medium", emoji: "🟡" },
  hard: { label: "Hard", emoji: "🔴" },
  advanced: { label: "Advanced", emoji: "🔥" },
  games: { label: "Games", emoji: "🎮" },
};

export default function RootLayout() {
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<"all" | Difficulty>("all");
  const [sortOrder, setSortOrder] = useState<"default" | "az" | "za">("default");

  const filtered = useMemo(() => {
    let items = [...componentRegistry];

    if (filterDifficulty !== "all") {
      items = items.filter((c) => c.difficulty === filterDifficulty);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.concepts.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortOrder === "az") items.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "za") items.sort((a, b) => b.name.localeCompare(a.name));

    const grouped: Record<string, ComponentEntry[]> = {};
    DIFFICULTIES.forEach((d) => (grouped[d] = []));
    items.forEach((c) => {
      if (!grouped[c.difficulty]) grouped[c.difficulty] = [];
      grouped[c.difficulty].push(c);
    });
    return grouped;
  }, [search, filterDifficulty, sortOrder]);

  const totalCount = Object.values(filtered).reduce((s, a) => s + a.length, 0);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>
            <Link to="/">Building Components (TS)</Link>
          </h1>

          <div className="sidebar-toolbar">
            <input
              type="text"
              className="sidebar-search"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="sidebar-controls">
              <select
                className="sidebar-select"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as "all" | Difficulty)}
              >
                <option value="all">All levels</option>
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {LABELS[d].emoji} {LABELS[d].label}
                  </option>
                ))}
              </select>
              <select
                className="sidebar-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "default" | "az" | "za")}
              >
                <option value="default">Default</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
            <div className="sidebar-count">{totalCount} components</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {DIFFICULTIES.map((difficulty) => {
            const components = filtered[difficulty];
            if (!components || components.length === 0) return null;

            return (
              <div key={difficulty}>
                <h3>
                  {LABELS[difficulty].emoji} {LABELS[difficulty].label} ({components.length})
                </h3>
                {components.map((entry) => (
                  <NavLink key={entry.path} to={`/${entry.difficulty}/${entry.path}`} end>
                    {entry.name}
                  </NavLink>
                ))}
              </div>
            );
          })}
          {totalCount === 0 && <p className="sidebar-empty">No components found.</p>}
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
