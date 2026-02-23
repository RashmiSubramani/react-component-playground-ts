/*
  TODO WITH TIMER (Per-Item Stopwatch)
  ----------------------------------------
  Difficulty: Easy
  Concepts: typed Todo object with isRunning flag, useRef for stable ID counter,
            global setInterval that ticks all running timers, padStart time formatting,
            immutable map/filter updates

  How it works:
  1. User types a todo and clicks "Add" (or presses Enter)
  2. Each todo has its own timer that can be started/paused and reset
  3. A single global setInterval (1 s) increments time on all running todos
  4. Deleting a todo removes it from the list entirely
*/

import { useState, useEffect, useRef } from "react";
import { FaPlus, FaPlay, FaPause, FaUndo, FaTrash } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Todo = {
  id: number;
  title: string;
  time: number;       // elapsed seconds
  isRunning: boolean;
};

// ─── Helpers ────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// ─── Component ──────────────────────────────────────────────────────

function TodoWithTimer() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const nextId = useRef(1);

  // Global tick — increments time for every running todo each second
  useEffect(() => {
    const interval = setInterval(() => {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.isRunning ? { ...todo, time: todo.time + 1 } : todo,
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function addTodo(): void {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: nextId.current++,
      title: inputValue.trim(),
      time: 0,
      isRunning: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    setInputValue("");
  }

  function deleteTodo(id: number): void {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleTimer(id: number): void {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isRunning: !todo.isRunning } : todo,
      ),
    );
  }

  function resetTimer(id: number): void {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isRunning: false, time: 0 } : todo,
      ),
    );
  }

  // ChangeEvent<HTMLInputElement> — typed event from the text input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") addTodo();
  }

  return (
    <div className="tt-container">
      <h2>Todo with Timer</h2>

      <div className="tt-input-row">
        <input
          className="tt-input"
          type="text"
          placeholder="Enter todo"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="tt-btn tt-add-btn" onClick={addTodo}>
          <FaPlus size={12} /> Add
        </button>
      </div>

      {todoList.length === 0 ? (
        <p className="tt-empty">No todos yet. Add one above.</p>
      ) : (
        <ul className="tt-list">
          {todoList.map(({ id, title, isRunning, time }) => (
            <li key={id} className="tt-item">
              <div className="tt-item-top">
                <span className="tt-title">{title}</span>
                <span className="tt-time">{formatTime(time)}</span>
              </div>

              <div className="tt-actions">
                <button
                  className={`tt-btn ${isRunning ? "tt-pause-btn" : "tt-start-btn"}`}
                  onClick={() => toggleTimer(id)}
                >
                  {isRunning ? <><FaPause size={11} /> Pause</> : <><FaPlay size={11} /> Start</>}
                </button>
                <button
                  className="tt-btn tt-reset-btn"
                  onClick={() => resetTimer(id)}
                >
                  <FaUndo size={11} /> Reset
                </button>
                <button
                  className="tt-btn tt-delete-btn"
                  onClick={() => deleteTodo(id)}
                >
                  <FaTrash size={11} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoWithTimer;
