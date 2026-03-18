import React, { useRef, useState } from "react";
import "./styles.css";

// Sample initial data
const initialData = {
  todo: [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" },
  ],
  "in progress": [{ id: "task-3", label: "Task 3" }],
  done: [{ id: "task-4", label: "Task 4" }],
};

export default function DragAndDrop2() {
  const [columns, setColumns] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskLabel, setEditingTaskLabel] = useState("");

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskInputLabel, setNewTaskInputLabel] = useState("");
  const enterPressedRef = useRef(false);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (columnId) => {
    if (!draggedTask) return;

    setColumns((prevColumns) => {
      const newCols = { ...prevColumns };

      // Remove from old column
      for (const col in newCols) {
        newCols[col] = newCols[col].filter((t) => t.id !== draggedTask.id);
      }

      // Add to new column
      newCols[columnId].push(draggedTask);
      return newCols;
    });

    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); //Necessary to allow drop
  };

  const handleLabelClick = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskLabel(task.label);
  };

  const saveEditedTask = (taskId) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].map((t) =>
          t.id === taskId ? { ...t, label: editingTaskLabel } : t
        );
      }
      return updated;
    });

    setEditingTaskId(null);
    setEditingTaskLabel("");
  };

  const handleEditKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      saveEditedTask(taskId);
    }
  };

  const deleteTask = (taskId) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].filter((t) => t.id !== taskId);
      }
      return updated;
    });
  };

  const addNewTaskInline = (columnId) => {
    if (enterPressedRef.current) {
      enterPressedRef.current = false;
      return;
    }

    if (newTaskInputLabel.trim() === "") {
      setIsAddingNewTask(false);
      setNewTaskInputLabel("");
      return;
    }

    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, label: newTaskInputLabel.trim() };

    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: [...prevColumns[columnId], newTask],
    }));

    setIsAddingNewTask(false);
    setNewTaskInputLabel("");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Drag & Drop</h2>
      <div className="board">
        {["todo", "in progress", "done"].map((col) => (
          <div
            key={col}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col)}
          >
            <h4>
              {col === "todo"
                ? "To Do"
                : col === "in progress"
                ? "In Progress"
                : "Done"}
            </h4>

            {columns[col].map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={() => handleDragStart(task)}
              >
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTaskLabel}
                    onChange={(e) => setEditingTaskLabel(e.target.value)}
                    onBlur={() => saveEditedTask(task.id)}
                    onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                    autoFocus
                    className="task-edit-input"
                  />
                ) : (
                  <>
                    <span
                      className="task-label"
                      onClick={() => handleLabelClick(task)}
                    >
                      {task.label}
                    </span>
                    <button
                      className="icon-button delete-btn"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
                    >
                      🗑
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Inline Add Task Section */}
            {col === "todo" && (
              <div className="add-task-inline">
                {isAddingNewTask ? (
                  <input
                    type="text"
                    placeholder="Enter new task..."
                    value={newTaskInputLabel}
                    onChange={(e) => setNewTaskInputLabel(e.target.value)}
                    onBlur={() => addNewTaskInline(col)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        enterPressedRef.current = true;
                        addNewTaskInline(col);
                        e.target.blur();
                      }
                    }}
                    autoFocus
                    className="add-task-input-inline"
                  />
                ) : (
                  <button
                    className="add-task-placeholder"
                    onClick={() => setIsAddingNewTask(true)}
                  >
                    + Add a task
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
