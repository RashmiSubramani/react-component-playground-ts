/*
  TODO LIST
  ----------
  Difficulty: Easy
  Concepts: useState with typed arrays, typing objects, typing function params,
            immutable state updates (map, filter, spread)

  Features:
  i)   Add todo
  ii)  Checkbox — toggle completed
  iii) Strikethrough — visual feedback for completed items
  iv)  Delete todo
*/

import { useState } from "react";
import "./TodoList.css";

// ─── Type for a single todo item ─────────────────────────────────
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoList() {
  const [inputValue, setInputValue] = useState<string>("");
  // Typed as Todo[] — TypeScript now knows each item has id, text, completed
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // ChangeEvent<HTMLInputElement> — typed event from the text input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  // KeyboardEvent<HTMLInputElement> — typed keyboard event for Enter key
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addTodo();
  }

  function addTodo() {
    if (!inputValue.trim()) return;

    // Spread existing list + add new item
    // Date.now() gives a unique-enough id for client-side use
    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      },
    ]);
    setInputValue("");
  }

  // id is typed as number — matches Todo["id"]
  function onDeleteTodo(id: number) {
    // filter returns a NEW array without the deleted item (immutable update)
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  // Toggle completed status — uses map to return a new array (immutable)
  function toggleCheckBox(id: number) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          // Spread the todo and flip the completed flag
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  }

  return (
    <div className="todo-container">
      <div className="todo-input-row">
        <input
          type="text"
          placeholder="Enter todo"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="todo-input"
        />
        <button className="todo-add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCheckBox(todo.id)}
              className="todo-checkbox"
            />
            {/* Conditionally apply strikethrough class when completed */}
            <span className={todo.completed ? "todo-text" : ""}>
              {todo.text}
            </span>
            <button
              className="todo-delete-btn"
              onClick={() => onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
  ── KEY TYPESCRIPT CHANGES FROM JS VERSION ────────────────────────

  1. Added Todo type         → defines the shape of each todo item
  2. useState<Todo[]>([])    → tells TS this is an array of Todo objects
  3. (id: number)            → typed function parameters in onDeleteTodo & toggleCheckBox
  4. Fixed className logic   → simplified ternary (was `${completed ? "todo-text" : ""}`)

  ── INTERVIEW TALKING POINTS ─────────────────────────────────────

  Q: Why use spread (...todoList) instead of push()?
  A: React only re-renders when state REFERENCE changes.
     push() mutates the same array reference — React won't detect the change.
     Spread creates a NEW array → React sees a new reference → re-renders.

  Q: Why Date.now() for id instead of todoList.length + 1?
  A: If you delete item #2 from [1,2,3], length becomes 2.
     Next add gives id=3, which DUPLICATES the existing item #3.
     Date.now() is always unique (millisecond timestamp).

  Q: Why map() for toggle instead of directly modifying the object?
  A: Same reason — immutability. map() returns a new array with a new
     object for the changed item. React detects the change and re-renders.
*/
