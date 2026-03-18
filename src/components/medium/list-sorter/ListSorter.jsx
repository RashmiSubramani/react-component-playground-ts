import React, { useState } from "react";
import "./styles.css";

export default function ListSorter() {
  const initialList = [
    "Banana",
    "Apple",
    "Cherry",
    "Mango",
    "Blueberry",
    "Kiwi",
    "Pineapple",
    "Fig",
  ];

  const [list, setList] = useState(initialList);
  const [sortType, setSortType] = useState("az");

  function sortList(type) {
    let sortedList = [...initialList]; // ❗ always sort original list

    if (type === "az") {
      sortedList.sort((a, b) => a.localeCompare(b));
    } else if (type === "za") {
      sortedList.sort((a, b) => b.localeCompare(a));
    } else if (type === "length") {
      sortedList.sort((a, b) => a.length - b.length);
    }

    setList(sortedList);
  }

  function handleChange(e) {
    const value = e.target.value;
    setSortType(value);
    sortList(value);
  }

  return (
    <div data-testid="container" style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2 data-testid="heading">List Sorter</h2>

      <label htmlFor="sort">Sort By: </label>

      <select
        id="sort"
        data-testid="sort-dropdown"
        value={sortType}
        onChange={handleChange}
      >
        <option value="az">A - Z (Alphabetical)</option>
        <option value="za">Z - A (Reverse Alphabetical)</option>
        <option value="length">Length (Shortest First)</option>
      </select>

      <ul data-testid="list">
        {list.map((item, index) => (
          <li data-testid="list-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
