/*
  STICKY NOTES (Draggable + Grid Placement)
  --------------------------------------------
  Difficulty: Hard
  Concepts: Note type with Point sub-type (position, offset),
            useRef<HTMLDivElement> for container bounding rect,
            drag state machine (mouseDown → mouseMove → mouseUp),
            z-index reordering via array position (last = top),
            grid placement with Set<string> collision avoidance,
            container clamping (Math.max/min),
            stopPropagation to isolate textarea/close from drag

  How it works:
  1. "+" button adds a note at the first free grid cell
  2. mouseDown on a note starts drag (records offset from cursor to note origin)
  3. mouseMove updates position, clamped inside container bounds
  4. mouseUp ends drag
  5. Clicking a note brings it to front by moving it to end of array
  6. Each note has an editable textarea and a close button
*/

import { useState, useRef, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type Point = {
  x: number;
  y: number;
};

type Note = {
  id: number;
  text: string;
  color: string;
  position: Point;
  isDragging: boolean;
  offset: Point; // cursor offset from note origin when drag starts
};

// ─── Constants ────────────────────────────────────────────────────

const COLORS = [
  "#FFFA65",
  "#FF9AA2",
  "#FFB7B2",
  "#FFDAC1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 150;
const GAP = 15;
const COLUMNS = 3;

// ─── Helpers ──────────────────────────────────────────────────────

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Convert linear index → grid (x, y) position
function getGridPosition(index: number): Point {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  return {
    x: col * (NOTE_WIDTH + GAP),
    y: row * (NOTE_HEIGHT + GAP),
  };
}

// ─── Component ────────────────────────────────────────────────────

function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Bring clicked note to front by moving it to end of array
  function bringNoteToFront(id: number) {
    setNotes((prev) => {
      const note = prev.find((n) => n.id === id);
      if (!note) return prev;
      const remaining = prev.filter((n) => n.id !== id);
      return [...remaining, note]; // last = highest z-index
    });
  }

  // Add note at first free grid cell
  function addNote() {
    // Set<string> for O(1) collision checks
    const occupiedPositions = new Set(
      notes.map((n) => `${n.position.x},${n.position.y}`),
    );

    let index = 0;
    let position: Point = getGridPosition(0);

    // Find first unoccupied grid cell
    while (true) {
      const pos = getGridPosition(index);
      const key = `${pos.x},${pos.y}`;
      if (!occupiedPositions.has(key)) {
        position = pos;
        break;
      }
      index++;
    }

    const newNote: Note = {
      id: Date.now(),
      text: "",
      color: getRandomColor(),
      position,
      isDragging: false,
      offset: { x: 0, y: 0 },
    };

    setNotes((prev) => [...prev, newNote]);
  }

  function removeNote(id: number) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function updateText(id: number, text: string) {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  }

  // ─── Drag handlers ─────────────────────────────────────────────

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>, id: number) {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    bringNoteToFront(id);

    const offsetX = e.clientX - rect.left - note.position.x;
    const offsetY = e.clientY - rect.top - note.position.y;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, isDragging: true, offset: { x: offsetX, y: offsetY } }
          : n,
      ),
    );
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (notes.every((n) => !n.isDragging)) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    setNotes((prev) =>
      prev.map((n) => {
        if (!n.isDragging) return n;

        // Calculate new position from cursor minus offset
        let x = e.clientX - rect.left - n.offset.x;
        let y = e.clientY - rect.top - n.offset.y;

        // Clamp inside container bounds
        x = Math.max(0, Math.min(x, rect.width - NOTE_WIDTH));
        y = Math.max(0, Math.min(y, rect.height - NOTE_HEIGHT));

        return { ...n, position: { x, y } };
      }),
    );
  }

  function onMouseUp() {
    setNotes((prev) =>
      prev.map((n) => (n.isDragging ? { ...n, isDragging: false } : n)),
    );
  }

  // Auto-scroll container when notes are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [notes.length]);

  // Calculate container inner height from note positions
  const innerHeight =
    notes.length === 0
      ? "100%"
      : Math.max(...notes.map((n) => n.position.y + NOTE_HEIGHT)) + 30;

  return (
    <div
      className="sn-container"
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        className="sn-inner"
        style={{ height: innerHeight }}
      >
        {notes.map(({ id, text, color, position }, index) => (
          <div
            key={id}
            className="sn-note"
            style={{
              backgroundColor: color,
              left: position.x,
              top: position.y,
              zIndex: index + 1,
            }}
            onMouseDown={(e) => onMouseDown(e, id)}
          >
            {/* Close button */}
            <button
              className="sn-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeNote(id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <FaTimes />
            </button>

            {/* Editable text */}
            <textarea
              className="sn-textarea"
              placeholder="Enter Text"
              value={text}
              onChange={(e) => updateText(id, e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      {/* Add note FAB */}
      <button className="sn-add-btn" onClick={addNote}>
        <FaPlus />
      </button>
    </div>
  );
}

export default StickyNotes;
