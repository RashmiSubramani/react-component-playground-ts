/*
  Virtual List — Render Only Visible Rows
  ------------------------------------------
  Category: Medium

  Concepts:
  1. Windowed rendering — only render rows in the visible viewport
  2. scrollTop to calculate which rows are visible
  3. Absolute positioning — each row placed at row * ROW_HEIGHT
  4. Inner container height = totalRows * ROW_HEIGHT (creates scrollbar)
  5. Overscan — render a few extra rows above/below for smooth scrolling
  6. useMemo for filtered list + visible slice
*/

import { useState, useRef, useMemo, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import "./styles.css";

// ─── Types ─────────────────────────────────────────────────────────

type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};

// ─── Data generation ───────────────────────────────────────────────

const DEPARTMENTS = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance"];
const FIRST_NAMES = [
  "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry",
  "Ivy", "Jack", "Kate", "Leo", "Maya", "Noah", "Olivia", "Paul",
];
const LAST_NAMES = [
  "Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Moore",
  "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Clark",
];

function generateEmployees(count: number): Employee[] {
  const result: Employee[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
    result.push({
      id: i + 1,
      name: `${first} ${last}`,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      salary: 45000 + Math.floor(Math.random() * 80000),
    });
  }
  return result;
}

// Generate 10,000 employees once (outside component)
const ALL_EMPLOYEES = generateEmployees(10000);

// ─── Constants ─────────────────────────────────────────────────────

const ROW_HEIGHT = 40;
const VIEWPORT_HEIGHT = 400;
const OVERSCAN = 5; // extra rows above/below viewport

// ─── Component ─────────────────────────────────────────────────────

function VirtualList() {
  const [scrollTop, setScrollTop] = useState(0);
  const [search, setSearch] = useState("");
  const viewportRef = useRef<HTMLDivElement>(null);

  // ── Filter by search ──
  const filtered = useMemo(() => {
    if (!search.trim()) return ALL_EMPLOYEES;
    const q = search.toLowerCase();
    return ALL_EMPLOYEES.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );
  }, [search]);

  // ── Calculate visible window ──
  const totalHeight = filtered.length * ROW_HEIGHT;

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(
    filtered.length,
    Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ROW_HEIGHT) + OVERSCAN
  );

  // ── Only the visible rows ──
  const visibleRows = useMemo(() => {
    return filtered.slice(startIndex, endIndex);
  }, [filtered, startIndex, endIndex]);

  // ChangeEvent<HTMLInputElement> — typed event from the search input
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // ── Scroll handler ──
  const handleScroll = useCallback(() => {
    if (viewportRef.current) {
      setScrollTop(viewportRef.current.scrollTop);
    }
  }, []);

  const renderedCount = visibleRows.length;

  return (
    <div className="vl-container">
      <h2>Virtual List</h2>
      <p className="vl-subtitle">
        10,000 rows — only {renderedCount} DOM nodes rendered at a time
      </p>

      {/* Stats */}
      <div className="vl-stats">
        <span>
          Total: <span className="vl-stat-highlight">{filtered.length.toLocaleString()}</span>
        </span>
        <span>
          DOM nodes: <span className="vl-stat-highlight">{renderedCount}</span>
        </span>
        <span>
          Row height: {ROW_HEIGHT}px
        </span>
      </div>

      {/* Search */}
      <div className="vl-search">
        <FaSearch className="vl-search-icon" size={13} />
        <input
          className="vl-search-input"
          placeholder="Filter by name or department…"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Scrollable viewport */}
      {filtered.length === 0 ? (
        <div className="vl-empty">No employees match your search.</div>
      ) : (
        <div
          ref={viewportRef}
          className="vl-viewport"
          style={{ height: VIEWPORT_HEIGHT }}
          onScroll={handleScroll}
        >
          {/* Inner container — full height for correct scrollbar */}
          <div className="vl-inner" style={{ height: totalHeight }}>
            {visibleRows.map((emp, i) => {
              const actualIndex = startIndex + i;
              return (
                <div
                  key={emp.id}
                  className="vl-row"
                  style={{
                    height: ROW_HEIGHT,
                    top: actualIndex * ROW_HEIGHT,
                  }}
                >
                  <span className="vl-row-index">#{emp.id}</span>
                  <span className="vl-row-name">{emp.name}</span>
                  <span className="vl-row-dept">{emp.department}</span>
                  <span className="vl-row-salary">
                    ${emp.salary.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default VirtualList;
