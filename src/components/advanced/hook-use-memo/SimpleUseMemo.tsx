// Imagine you have a list of users and you want to filter only active users. Filtering can be expensive if the list is large.
// ✅ Why this is good:
// Typing in search triggers filtering → recalculates only when search changes.
// Clicking Counter doesn’t recompute filteredUsers → performance saved.
// Console shows "Filtering users..." only when search changes.
//
// | Hook          | What it does               | When to use                                |
// | ------------- | -------------------------- | ------------------------------------------ |
// | `useMemo`     | Memoize **values/results** | Expensive calculations or filtered lists   |

import React, { useState, useMemo } from "react";

type User = {
  id: number;
  name: string;
  active: boolean;
};

const usersList: User[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  active: Math.random() > 0.5,
}));

export default function UseMemoExample() {
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);

  // Expensive filtering → only recompute if `search` changes
  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return usersList.filter(
      (user) =>
        user.active && user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div>
      <h2>useMemo Example</h2>

      <input
        placeholder="Search active users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setCounter((c) => c + 1)}>
        Counter: {counter}
      </button>

      <p>Matching users: {filteredUsers.length}</p>
    </div>
  );
}
