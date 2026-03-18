import React, { useState } from "react";
import "./styles.css";

function DrawCircles() {
  const [circles, setCircles] = useState([]); // circles → all circles drawn by user
  const [redoStack, setRedoStack] = useState([]); // redoStack → stores circles removed via undo

  const handleDraw = (e) => {
    // Get click position relative to the drawing area div
    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left; // x inside the box
    const y = e.clientY - rect.top; // y inside the box

    const newCircle = { x, y };
    setCircles([...circles, newCircle]); // Add new circle to the list
    setRedoStack([]); // Whenever we draw a new circle, redo history must clear
  };

  const handleUndo = () => {
    if (circles.length === 0) return; // Nothing to undo
    const last = circles[circles.length - 1]; // Get last drawn circle
    setCircles(circles.slice(0, -1)); // Remove last circle
    setRedoStack([...redoStack, last]); // Store it in redo stack
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return; // Nothing to redo
    const last = redoStack[redoStack.length - 1]; // Get last undone circle
    setRedoStack(redoStack.slice(0, -1)); // Remove it from redo stack
    setCircles([...circles, last]); // Add it back to circles
  };

  return (
    <div className="circle-drawer">
      <div
        data-testid="drawing-area"
        className="drawing-area"
        onClick={handleDraw}
      >
        {/* Render all circles */}
        {circles.map((circle, idx) => (
          <div
            key={idx}
            className="circle"
            style={{
              // Subtract radius (10px) so circle is centered at click
              left: circle.x - 10,
              top: circle.y - 10,
            }}
          ></div>
        ))}
      </div>

      <div className="buttons">
        <button className="undo-btn" onClick={handleUndo}>
          Undo
        </button>
        <button className="redo-btn" onClick={handleRedo}>
          Redo
        </button>
      </div>
    </div>
  );
}

export default DrawCircles;
