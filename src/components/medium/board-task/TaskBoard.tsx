/*
  TASK BOARD (Button-Based Column Movement)
  -------------------------------------------
  Difficulty: Easy
  Concepts: typed Task object with status union, column-based filtering,
            indexOf + direction for movement, inline edit with blur/Enter save,
            Date.now() unique IDs

  How it works:
  1. Add tasks via input — they start in "To Do"
  2. Move tasks left/right between columns using arrow buttons
  3. Click "Edit" to rename a task inline (blur or Enter saves)
  4. "Delete" removes the task entirely
*/

import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type ColumnId = "todo" | "in-progress" | "completed";

type Task = {
  id: number;
  title: string;
  status: ColumnId;
};

type Direction = "left" | "right";

// ─── Constants ──────────────────────────────────────────────────────

const COLUMNS: ColumnId[] = ["todo", "in-progress", "completed"];

const COLUMN_LABELS: Record<ColumnId, string> = {
  todo: "TO DO",
  "in-progress": "IN PROGRESS",
  completed: "COMPLETED",
};

// ─── Component ──────────────────────────────────────────────────────

function TaskBoard() {
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editableInput, setEditableInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  function addTask(): void {
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: inputValue.trim(),
      status: "todo",
    };

    setTaskList((prev) => [...prev, newTask]);
    setInputValue("");
  }

  function moveTask(id: number, direction: Direction): void {
    setTaskList((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        const currentIndex = COLUMNS.indexOf(task.status);
        const newIndex =
          direction === "right" ? currentIndex + 1 : currentIndex - 1;

        if (newIndex < 0 || newIndex >= COLUMNS.length) return task;

        return { ...task, status: COLUMNS[newIndex] };
      }),
    );
  }

  function deleteTask(id: number): void {
    setTaskList((prev) => prev.filter((t) => t.id !== id));
  }

  function saveTitle(id: number): void {
    if (!editableInput.trim()) return;

    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editableInput.trim() } : task,
      ),
    );

    setEditingTaskId(null);
    setEditableInput("");
  }

  function startEditing(task: Task): void {
    setEditingTaskId(task.id);
    setEditableInput(task.title);
  }

  // ChangeEvent<HTMLInputElement> — typed events from task inputs
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEditableInput(e.target.value);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>, id: number): void {
    if (e.key === "Enter") saveTitle(id);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") addTask();
  }

  return (
    <div className="tb-wrapper">
      <h2>Task Board</h2>

      <div className="tb-input-row">
        <input
          className="tb-input"
          placeholder="Enter task"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button className="tb-add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="tb-board">
        {COLUMNS.map((col) => (
          <div key={col} className="tb-column">
            <h4 className="tb-col-title">{COLUMN_LABELS[col]}</h4>

            {taskList
              .filter((task) => task.status === col)
              .map((task) => (
                <div key={task.id} className="tb-card">
                  {editingTaskId === task.id ? (
                    <input
                      className="tb-edit-input"
                      type="text"
                      value={editableInput}
                      onChange={handleEditChange}
                      onBlur={() => saveTitle(task.id)}
                      onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                      autoFocus
                    />
                  ) : (
                    <p className="tb-task-title">{task.title}</p>
                  )}

                  <div className="tb-actions">
                    {col !== "todo" && (
                      <button
                        className="tb-move-btn"
                        onClick={() => moveTask(task.id, "left")}
                      >
                        <FaArrowLeft />
                      </button>
                    )}

                    {col !== "completed" && (
                      <button
                        className="tb-move-btn"
                        onClick={() => moveTask(task.id, "right")}
                      >
                        <FaArrowRight />
                      </button>
                    )}

                    <button
                      className="tb-edit-btn"
                      onClick={() => startEditing(task)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="tb-delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
