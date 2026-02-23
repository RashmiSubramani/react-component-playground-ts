/*
  DATA TABLE (Client-Side Pagination)
  --------------------------------------
  Difficulty: Easy
  Concepts: typed row object, dynamic headers via Object.keys(),
            Record cast for dynamic key access,
            client-side pagination with .slice(),
            ChangeEvent<HTMLSelectElement> for page size

  Bug fix from original:
  - setPageSize(e.target.value) stored a string — fixed with Number()

  Pagination math:
  | Page | Rows shown | startIndex           |
  | ---- | ---------- | -------------------- |
  | 1    | rows 0–4   | (1 − 1) × 5 = 0     |
  | 2    | rows 5–9   | (2 − 1) × 5 = 5     |
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type Row = {
  id: number;
  name: string;
  age: number;
};

// ─── Sample data ──────────────────────────────────────────────────

const data: Row[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 28 },
  { id: 5, name: "Eve", age: 27 },
  { id: 6, name: "Frank", age: 33 },
  { id: 7, name: "Grace", age: 24 },
  { id: 8, name: "Hank", age: 26 },
  { id: 9, name: "Ivy", age: 21 },
  { id: 10, name: "Jack", age: 29 },
];

// ─── Component ────────────────────────────────────────────────────

function DataTable() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  function handleNext() {
    if (currentPageNo < totalPages) {
      setCurrentPageNo((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentPageNo > 1) {
      setCurrentPageNo((prev) => prev - 1);
    }
  }

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // e.target.value is always a string — convert to number
    setPageSize(Number(e.target.value));
    setCurrentPageNo(1);
  }

  const startIndex = (currentPageNo - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  // Dynamic headers from first row's keys
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="dt-container">
      <h2>Data Table</h2>

      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <>
          <table className="dt-table">
            <thead>
              <tr>
                {headers.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentData.map((row) => (
                <tr key={row.id}>
                  {headers.map((key) => (
                    <td key={key}>
                      {(row as Record<string, string | number>)[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="dt-controls">
            <div>
              <button
                className="dt-btn"
                onClick={handlePrevious}
                disabled={currentPageNo === 1}
              >
                Previous
              </button>

              <span className="dt-page-info">
                Page {currentPageNo} of {totalPages}
              </span>

              <button
                className="dt-btn"
                onClick={handleNext}
                disabled={currentPageNo === totalPages}
              >
                Next
              </button>
            </div>

            <div>
              Rows per page:{" "}
              <select
                className="dt-select"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DataTable;
