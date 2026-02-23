/*
  NESTED CHECKBOXES
  ------------------
  Difficulty: Medium
  Concepts: recursive types (self-referencing), Record<number, boolean>,
            recursive component rendering, parent↔child propagation,
            bottom-up tree verification, typing setState updater function

  Features:
  i)   Generate UI recursively for nested data structure
  ii)  onChange handler for every checkbox
  iii) Parent selection automatically selects all children
  iv)  Auto-select parent when all children are selected (bottom-up check)
*/

import { useState } from "react";
import "./styles.css";

// ─── Recursive type — a node can have children of the same shape ──
type CheckBoxNode = {
  id: number;
  label: string;
  children?: CheckBoxNode[]; // optional → leaf nodes have no children
};

// Checked state: maps node id → boolean
type CheckedState = Record<number, boolean>;

// Props for the recursive CheckboxTree component
type CheckboxTreeProps = {
  data: CheckBoxNode[];
  checked: CheckedState;
  setChecked: React.Dispatch<React.SetStateAction<CheckedState>>;
};

// ─── Sample data ──────────────────────────────────────────────────
const checkBoxData: CheckBoxNode[] = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
  {
    id: 10,
    label: "Country", // Leaf node — no children
  },
];

// ─── Parent component ─────────────────────────────────────────────
export default function NestedCheckBoxes() {
  // State tracks which checkboxes are checked: { nodeId: boolean }
  const [checked, setChecked] = useState<CheckedState>({});

  return (
    <CheckboxTree
      data={checkBoxData}
      checked={checked}
      setChecked={setChecked}
    />
  );
}

// ─── Recursive tree component ─────────────────────────────────────
function CheckboxTree({ data, checked, setChecked }: CheckboxTreeProps) {
  /**
   * Handle checkbox toggle with hierarchical logic:
   * 1. Update the clicked node
   * 2. Propagate DOWN to all children (parent → child)
   * 3. Bubble UP to update parents based on children's states (child → parent)
   */
  function toggleNode(id: number, value: boolean, node: CheckBoxNode) {
    setChecked((prev) => {
      let next: CheckedState = { ...prev, [id]: value };

      // STEP 1: Parent-to-Child — when a parent is toggled, update all descendants
      function updateChildren(node: CheckBoxNode, isChecked: boolean) {
        node.children?.forEach((child) => {
          next[child.id] = isChecked;
          if (child.children) {
            updateChildren(child, isChecked);
          }
        });
      }

      updateChildren(node, value);

      // STEP 2: Child-to-Parent — bottom-up: check if ALL children are selected
      // Process deepest levels first so grandparent state reflects grandchildren
      function verifyAllChildrenAreChecked(nodes: CheckBoxNode[]) {
        nodes.forEach((node) => {
          if (node.children) {
            // Recurse deeper first (bottom-up approach)
            verifyAllChildrenAreChecked(node.children);

            // Parent is checked only if ALL direct children are checked
            const allChildChecked = node.children.every(
              (child) => next[child.id] === true,
            );
            next[node.id] = allChildChecked;
          }
        });
      }

      // Start bottom-up verification from root nodes
      verifyAllChildrenAreChecked(checkBoxData);

      return next;
    });
  }

  return (
    <div className="individualCheckBox">
      {data.map((item) => (
        <div key={item.id} style={{ marginTop: 4 }}>
          <input
            type="checkbox"
            checked={checked[item.id] || false}
            onChange={(e) => toggleNode(item.id, e.target.checked, item)}
          />
          <label style={{ marginLeft: 4 }}>{item.label}</label>

          {/* Recursively render children */}
          {item.children && (
            <CheckboxTree
              data={item.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
}
