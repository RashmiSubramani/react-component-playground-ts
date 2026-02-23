/*
  MULTI-SELECT INPUT (Search + Pills with API)
  -----------------------------------------------
  Difficulty: Medium
  Concepts: typed API response (User, UsersApiResponse),
            useState<Set<string>> for O(1) duplicate prevention,
            useRef<HTMLInputElement> for programmatic focus,
            keyboard navigation (ArrowUp/Down/Enter/Backspace),
            pill sub-component with typed props,
            async fetch in useEffect

  How it works:
  1. User types → fetch matching users from dummyjson API
  2. Suggestions dropdown shows results (minus already-selected)
  3. Click or Enter selects a user → rendered as a pill
  4. Clicking a pill or pressing Backspace on empty input removes it
  5. Set<string> tracks selected emails for O(1) dedup checks
*/

import { useEffect, useRef, useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

// dummyjson /users/search response shape
type UsersApiResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

type PillProps = {
  image: string;
  text: string;
  onClick: () => void;
};

// ─── Pill sub-component ───────────────────────────────────────────

function Pill({ image, text, onClick }: PillProps) {
  return (
    <span className="msi-pill" onClick={onClick}>
      <img src={image} alt={text} />
      <span>{text} &times;</span>
    </span>
  );
}

// ─── MultiSelectInput component ───────────────────────────────────

function MultiSelectInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<UsersApiResponse | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Set<string> for O(1) lookup — prevents showing already-selected users
  const [selectedUserSet, setSelectedUserSet] = useState<Set<string>>(
    new Set(),
  );

  // Tracks the currently highlighted suggestion (keyboard navigation)
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch users whenever search term changes
  useEffect(() => {
    setActiveSuggestion(0);

    if (searchTerm.trim() === "") {
      setSuggestions(null);
      return;
    }

    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data: UsersApiResponse) => setSuggestions(data))
      .catch((err) => {
        console.error(err);
      });
  }, [searchTerm]);

  // Handle selecting a user from suggestions
  function handleSelectUser(user: User) {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions(null);
    inputRef.current?.focus();
  }

  // Handle removing a selected user (pill click or backspace)
  function handleRemoveUser(user: User) {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id,
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  }

  // ChangeEvent<HTMLInputElement> — typed event from the search input
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  // Keyboard interactions
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const users = suggestions?.users;

    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions(null);
    } else if (e.key === "ArrowDown" && users && users.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < users.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp" && users && users.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (
      e.key === "Enter" &&
      users &&
      activeSuggestion >= 0 &&
      activeSuggestion < users.length
    ) {
      handleSelectUser(users[activeSuggestion]);
    }
  }

  return (
    <div className="msi-container">
      <div className="msi-input-wrapper">
        {/* Selected user pills */}
        {selectedUsers.map((user) => (
          <Pill
            key={user.email}
            image={user.image}
            text={`${user.firstName} ${user.lastName}`}
            onClick={() => handleRemoveUser(user)}
          />
        ))}

        {/* Input field with suggestions */}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search For a User..."
            onKeyDown={handleKeyDown}
          />

          {/* Suggestions dropdown */}
          {suggestions?.users && suggestions.users.length > 0 && (
            <ul className="msi-suggestions">
              {suggestions.users.map((user, index) =>
                !selectedUserSet.has(user.email) ? (
                  <li
                    key={user.email}
                    className={index === activeSuggestion ? "active" : ""}
                    onClick={() => handleSelectUser(user)}
                  >
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiSelectInput;
