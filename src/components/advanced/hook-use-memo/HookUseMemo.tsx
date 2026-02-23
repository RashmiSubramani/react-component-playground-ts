/*
  HOOK: useMemo — Filterable Employee Directory
  ------------------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)
  Concepts: useMemo for expensive filter/sort, useMemo for derived stats,
            dependency array correctness, when NOT to use useMemo,
            unrelated state update proving memoization works

  Patterns demonstrated:
  1. Memoized filter + sort   — only recomputes when query or sortField changes
  2. Memoized derived stats   — salary avg/min/max recalculated only when filtered list changes
  3. Unrelated counter        — incrementing it does NOT recompute the expensive operations
  4. When NOT to use useMemo  — simple computations (length, string concat) don't need it
*/

import { useState, useMemo } from "react";
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaUsers, FaPlus } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};

type SortField = "name" | "salary" | "department";
type SortOrder = "asc" | "desc";

type Stats = {
  count: number;
  avg: number;
  min: number;
  max: number;
  total: number;
};

// ─── Data generation (runs once at module level) ────────────────────

const FIRST_NAMES = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "James", "Mia", "Logan", "Charlotte", "Lucas", "Amelia",
  "Alexander", "Harper", "Benjamin", "Evelyn", "Daniel", "Aria", "Henry",
  "Chloe", "Sebastian", "Luna", "Jack", "Ella", "Owen", "Grace", "Samuel",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore",
  "Jackson", "Martin", "Lee", "Perez", "White", "Harris", "Clark",
  "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright",
];

const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Product", "Support",
];

function generateEmployees(count: number): Employee[] {
  const employees: Employee[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
    employees.push({
      id: i + 1,
      name: `${first} ${last}`,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      salary: 45000 + Math.floor(((i * 7919) % 80000)),
    });
  }
  return employees;
}

// Generated ONCE at module load — not on every render
const ALL_EMPLOYEES = generateEmployees(500);

// ─── Component ──────────────────────────────────────────────────────

function HookUseMemo() {
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [deptFilter, setDeptFilter] = useState("all");

  // Unrelated state — incrementing this should NOT recompute filtered/sorted lists
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  // ChangeEvent<HTMLInputElement> — typed event from the search input
  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  // ChangeEvent<HTMLSelectElement> — typed event from the department filter
  function handleDeptFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDeptFilter(e.target.value);
  }

  // ChangeEvent<HTMLSelectElement> — typed event from the sort field select
  function handleSortFieldChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortField(e.target.value as SortField);
  }

  // ── Pattern 1: Memoized filter + sort ──
  // This is an EXPENSIVE operation (500 items, filter + sort).
  // useMemo ensures it only runs when query, sortField, sortOrder, or deptFilter change.
  // Clicking the unrelated counter does NOT trigger this computation.
  const filteredEmployees = useMemo(() => {
    console.log("🔄 useMemo: filtering + sorting (check console)");

    let result = ALL_EMPLOYEES;

    // Filter by department
    if (deptFilter !== "all") {
      result = result.filter((e) => e.department === deptFilter);
    }

    // Filter by search query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q),
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      let cmp: number;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "salary") cmp = a.salary - b.salary;
      else cmp = a.department.localeCompare(b.department);
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [query, sortField, sortOrder, deptFilter]);
  // ^ Only these 4 deps — NOT unrelatedCounter

  // ── Pattern 2: Memoized derived stats ──
  // Depends on filteredEmployees — only recomputes when the filtered list changes.
  const stats = useMemo((): Stats => {
    if (filteredEmployees.length === 0) {
      return { count: 0, avg: 0, min: 0, max: 0, total: 0 };
    }

    const salaries = filteredEmployees.map((e) => e.salary);
    const total = salaries.reduce((a, b) => a + b, 0);

    return {
      count: filteredEmployees.length,
      avg: Math.round(total / salaries.length),
      min: Math.min(...salaries),
      max: Math.max(...salaries),
      total,
    };
  }, [filteredEmployees]);

  return (
    <div className="hum-container">
      <h2>Hook: useMemo</h2>
      <p className="hum-subtitle">
        Filterable Employee Directory — 500 entries, memoized filter/sort/stats
      </p>

      {/* ── Unrelated counter (proves memoization) ── */}
      <div className="hum-counter-row">
        <button
          className="hum-btn hum-counter-btn"
          onClick={() => setUnrelatedCounter((c) => c + 1)}
        >
          <FaPlus size={10} /> Unrelated Counter: {unrelatedCounter}
        </button>
        <span className="hum-counter-hint">
          Click this — check console. useMemo does NOT recompute.
        </span>
      </div>

      {/* ── Controls ── */}
      <div className="hum-controls">
        <div className="hum-search">
          <FaSearch size={14} className="hum-search-icon" />
          <input
            className="hum-input"
            type="text"
            placeholder="Search by name or department..."
            value={query}
            onChange={handleQueryChange}
          />
        </div>

        <div className="hum-filters-row">
          <select
            className="hum-select"
            value={deptFilter}
            onChange={handleDeptFilterChange}
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            className="hum-select"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="name">Sort by Name</option>
            <option value="salary">Sort by Salary</option>
            <option value="department">Sort by Department</option>
          </select>

          <button
            className="hum-sort-btn"
            onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
          >
            {sortOrder === "asc" ? <FaSortAmountUp size={14} /> : <FaSortAmountDown size={14} />}
          </button>
        </div>
      </div>

      {/* ── Stats panel (memoized) ── */}
      <div className="hum-stats">
        <div className="hum-stat">
          <span className="hum-stat-label"><FaUsers size={12} /> Showing</span>
          <span className="hum-stat-value">{stats.count}</span>
        </div>
        <div className="hum-stat">
          <span className="hum-stat-label">Avg Salary</span>
          <span className="hum-stat-value">${stats.avg.toLocaleString()}</span>
        </div>
        <div className="hum-stat">
          <span className="hum-stat-label">Min</span>
          <span className="hum-stat-value">${stats.min.toLocaleString()}</span>
        </div>
        <div className="hum-stat">
          <span className="hum-stat-label">Max</span>
          <span className="hum-stat-value">${stats.max.toLocaleString()}</span>
        </div>
      </div>

      {/* ── Employee table ── */}
      {filteredEmployees.length === 0 ? (
        <p className="hum-empty">No employees match your search.</p>
      ) : (
        <div className="hum-table-wrap">
          <table className="hum-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.slice(0, 50).map((emp, idx) => (
                <tr key={emp.id}>
                  <td className="hum-cell-id">{idx + 1}</td>
                  <td>{emp.name}</td>
                  <td>
                    <span className="hum-dept-badge">{emp.department}</span>
                  </td>
                  <td className="hum-cell-salary">
                    ${emp.salary.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length > 50 && (
            <p className="hum-truncated">
              Showing first 50 of {filteredEmployees.length} results
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default HookUseMemo;
