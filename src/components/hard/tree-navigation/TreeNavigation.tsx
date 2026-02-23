/*
  TREE NAVIGATION (Checkbox with Bidirectional Propagation)
  -----------------------------------------------------------
  Difficulty: Hard
  Concepts: recursive TreeNodeData type with "folder" | "file" discriminant,
            Set<string> for selectedIds and expandedIds,
            bidirectional checkbox propagation:
              - DOWNWARD: toggle all descendants when parent clicked
              - UPWARD: parent checked only if ALL children checked
            findParent recursive tree traversal returning TreeNodeData | null,
            recursive TreeNode component with typed callback props

  How it works:
  1. TreeNode renders each node with checkbox + expand/collapse button (folders only)
  2. toggleCheckbox → updateChildren (select/deselect all descendants)
                    → updateParents (walk upward, check parent if all children checked)
  3. toggleFolder → add/remove from expandedIds Set
*/

import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type NodeType = "folder" | "file";

type TreeNodeData = {
  id: string;
  name: string;
  type: NodeType;
  children?: TreeNodeData[];
};

type TreeNodeProps = {
  node: TreeNodeData;
  selectedIds: Set<string>;
  toggleCheckbox: (node: TreeNodeData, checked: boolean) => void;
  toggleFolder: (id: string) => void;
  expandedIds: Set<string>;
};

// ─── Sample data ──────────────────────────────────────────────────

const tree: TreeNodeData[] = [
  {
    id: "1",
    name: "Root",
    type: "folder",
    children: [
      { id: "2", name: "File1.txt", type: "file" },
      {
        id: "3",
        name: "Folder1",
        type: "folder",
        children: [{ id: "4", name: "File2.txt", type: "file" }],
      },
    ],
  },
];

// ─── Recursive TreeNode component ─────────────────────────────────

function TreeNode({
  node,
  selectedIds,
  toggleCheckbox,
  toggleFolder,
  expandedIds,
}: TreeNodeProps) {
  const isFolder = node.type === "folder";
  const isExpanded = expandedIds.has(node.id);

  return (
    <div className={`tn-node ${node.type === "folder" ? "tn-folder" : "tn-file"}`}>
      <div className="tn-content">
        {/* Expand / Collapse — folders only */}
        {isFolder && (
          <button
            className="tn-expand-btn"
            onClick={() => toggleFolder(node.id)}
          >
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        )}

        {/* Checkbox — checked state from selectedIds Set */}
        <input
          type="checkbox"
          checked={selectedIds.has(node.id)}
          onChange={() => toggleCheckbox(node, !selectedIds.has(node.id))}
        />
        <span>{node.name}</span>
      </div>

      {/* Recursive children — only if folder, expanded, and has children */}
      {isFolder && isExpanded && node.children && (
        <div className="tn-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              toggleCheckbox={toggleCheckbox}
              toggleFolder={toggleFolder}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────

function TreeNavigation() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["1"]));

  // Toggle folder expand / collapse
  function toggleFolder(id: string) {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  // ─── DOWNWARD: Update node + all descendants ───────────────────

  function updateChildren(
    node: TreeNodeData,
    ids: Set<string>,
    checked: boolean,
  ) {
    if (checked) {
      ids.add(node.id);
    } else {
      ids.delete(node.id);
    }

    if (node.children) {
      node.children.forEach((child) => updateChildren(child, ids, checked));
    }
  }

  // ─── Find immediate parent of a node in the tree ───────────────

  function findParent(
    id: string,
    nodes: TreeNodeData[],
  ): TreeNodeData | null {
    for (const node of nodes) {
      if (node.children && node.children.some((child) => child.id === id)) {
        return node;
      }
      if (node.children) {
        const found = findParent(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  // ─── UPWARD: Recalculate parent checked state ──────────────────
  // Parent is checked ONLY if ALL children are checked

  function updateParents(
    nodeId: string,
    treeData: TreeNodeData[],
    ids: Set<string>,
  ) {
    let currentId: string | null = nodeId;

    while (currentId) {
      const parent = findParent(currentId, treeData);
      if (!parent) break;

      const allChildrenChecked = parent.children
        ? parent.children.every((child) => ids.has(child.id))
        : false;

      if (allChildrenChecked) {
        ids.add(parent.id);
      } else {
        ids.delete(parent.id);
      }

      currentId = parent.id;
    }
  }

  // ─── Toggle checkbox (main entry point) ─────────────────────────

  function toggleCheckbox(node: TreeNodeData, checked: boolean) {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);

      // 1. Update current node + all descendants (downward)
      updateChildren(node, newSet, checked);

      // 2. Recalculate all parent nodes (upward)
      updateParents(node.id, tree, newSet);

      return newSet;
    });
  }

  return (
    <div className="tn-container">
      <h2>Folder Navigation</h2>

      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          toggleCheckbox={toggleCheckbox}
          toggleFolder={toggleFolder}
          expandedIds={expandedIds}
        />
      ))}
    </div>
  );
}

export default TreeNavigation;
