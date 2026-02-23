/*
  KANBAN BOARD (Drag & Drop Columns)
  ------------------------------------
  Difficulty: Medium
  Concepts: Record<ColumnId, Task[]> typed state, HTML5 drag events,
            inline edit with Enter/blur save, useRef flag to prevent
            double-fire (Enter + blur), Date.now() unique IDs,
            for…in iteration over typed Record

  How it works:
  1. Three columns: To Do, In Progress, Done
  2. Drag tasks between columns to change status
  3. Click a task label to edit inline (Enter or blur to save)
  4. Delete tasks with the × button
  5. Add new tasks to the "To Do" column via inline input
*/

import { useRef, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Task = {
  id: string;
  label: string;
};

type ColumnId = "todo" | "in progress" | "done";

type Columns = Record<ColumnId, Task[]>;

// ─── Data ───────────────────────────────────────────────────────────

const initialData: Columns = {
  todo: [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" },
  ],
  "in progress": [{ id: "task-3", label: "Task 3" }],
  done: [{ id: "task-4", label: "Task 4" }],
};

const columnOrder: ColumnId[] = ["todo", "in progress", "done"];

const columnDisplayNames: Record<ColumnId, string> = {
  todo: "To Do",
  "in progress": "In Progress",
  done: "Done",
};

// ─── Component ──────────────────────────────────────────────────────

function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskLabel, setEditingTaskLabel] = useState("");

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskInputLabel, setNewTaskInputLabel] = useState("");

  // Prevents double-fire when Enter triggers blur
  const enterPressedRef = useRef(false);

  // ChangeEvent<HTMLInputElement> — typed events from inline edit + new task inputs
  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingTaskLabel(e.target.value);
  }

  function handleNewTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskInputLabel(e.target.value);
  }

  function handleNewTaskKeyDown(e: React.KeyboardEvent<HTMLInputElement>, col: ColumnId) {
    if (e.key === "Enter") {
      enterPressedRef.current = true;
      addNewTaskInline(col);
      (e.target as HTMLInputElement).blur();
    }
  }

  function handleDragStart(task: Task): void {
    setDraggedTask(task);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function handleDrop(columnId: ColumnId): void {
    if (!draggedTask) return;

    setColumns((prev) => {
      const updated: Columns = { ...prev };

      // Remove from old column
      for (const col of columnOrder) {
        updated[col] = updated[col].filter((t) => t.id !== draggedTask.id);
      }

      // Add to new column
      updated[columnId] = [...updated[columnId], draggedTask];
      return updated;
    });

    setDraggedTask(null);
  }

  function handleLabelClick(task: Task): void {
    setEditingTaskId(task.id);
    setEditingTaskLabel(task.label);
  }

  function saveEditedTask(taskId: string): void {
    setColumns((prev) => {
      const updated: Columns = { ...prev };
      for (const col of columnOrder) {
        updated[col] = updated[col].map((t) =>
          t.id === taskId ? { ...t, label: editingTaskLabel } : t,
        );
      }
      return updated;
    });

    setEditingTaskId(null);
    setEditingTaskLabel("");
  }

  function handleEditKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    taskId: string,
  ): void {
    if (e.key === "Enter") {
      saveEditedTask(taskId);
    }
  }

  function deleteTask(taskId: string): void {
    setColumns((prev) => {
      const updated: Columns = { ...prev };
      for (const col of columnOrder) {
        updated[col] = updated[col].filter((t) => t.id !== taskId);
      }
      return updated;
    });
  }

  function addNewTaskInline(columnId: ColumnId): void {
    // Guard against double-fire from Enter + blur
    if (enterPressedRef.current) {
      enterPressedRef.current = false;
      return;
    }

    if (newTaskInputLabel.trim() === "") {
      setIsAddingNewTask(false);
      setNewTaskInputLabel("");
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      label: newTaskInputLabel.trim(),
    };

    setColumns((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }));

    setIsAddingNewTask(false);
    setNewTaskInputLabel("");
  }

  return (
    <div className="kb-wrapper">
      <h2>Kanban Board</h2>

      <div className="kb-board">
        {columnOrder.map((col) => (
          <div
            key={col}
            className="kb-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col)}
          >
            <h4 className="kb-col-title">{columnDisplayNames[col]}</h4>

            {columns[col].map((task) => (
              <div
                key={task.id}
                className="kb-task"
                draggable
                onDragStart={() => handleDragStart(task)}
              >
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTaskLabel}
                    onChange={handleEditChange}
                    onBlur={() => saveEditedTask(task.id)}
                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                    autoFocus
                    className="kb-edit-input"
                  />
                ) : (
                  <>
                    <span
                      className="kb-task-label"
                      onClick={() => handleLabelClick(task)}
                    >
                      {task.label}
                    </span>
                    <button
                      className="kb-delete-btn"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Inline Add — only in the To Do column */}
            {col === "todo" && (
              <div className="kb-add-section">
                {isAddingNewTask ? (
                  <input
                    type="text"
                    placeholder="Enter new task..."
                    value={newTaskInputLabel}
                    onChange={handleNewTaskChange}
                    onBlur={() => addNewTaskInline(col)}
                    onKeyDown={(e) => handleNewTaskKeyDown(e, col)}
                    autoFocus
                    className="kb-add-input"
                  />
                ) : (
                  <button
                    className="kb-add-btn"
                    onClick={() => setIsAddingNewTask(true)}
                  >
                    <FaPlus size={12} /> Add a task
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
