/*
  FILE EXPLORER
  --------------
  Difficulty: Medium
  Concepts: recursive types (self-referencing with isFolder discriminant),
            Record<string, boolean> for expand state, recursive component,
            tree mutation (add/delete nodes), typing form events,
            string | number union for IDs, lifting state up

  Steps:
  i)   Create sample data + recursive component for rendering the tree
  ii)  Expand/Collapse for folders — individual state via Record<string, boolean>
  iii) Add folder — inline input, recursive tree update to insert at target parent
  iv)  Delete folder/file — filter + recursive map to remove by ID
*/

import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaPlus, FaTimes } from "react-icons/fa";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

// Recursive type for a file system node
// isFolder discriminates between folders (can have children) and files
type FileNode = {
  id: string | number; // string for initial data, number for Date.now() generated IDs
  name: string;
  isFolder: boolean;
  children?: FileNode[];
};

// Tracks which folders are expanded: { folderName: true/false }
type ExpandedState = Record<string, boolean>;

// Props for the recursive IndividualNode component
type IndividualNodeProps = {
  data: FileNode[];
  showAddFolderInput: (targetParentId: string | number) => void;
  showInput: boolean;
  parentId: string | number | null;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cancelAddFolder: () => void;
  deleteFolder: (targetId: string | number) => void;
};

// ─── Sample data ──────────────────────────────────────────────────

const sampleData: FileNode[] = [
  {
    id: "1",
    name: "public",
    isFolder: true,
    children: [{ id: "1a", name: "index.html", isFolder: false }],
  },
  {
    id: "2",
    name: "src",
    isFolder: true,
    children: [
      {
        id: "3",
        name: "components",
        isFolder: true,
        children: [
          {
            id: "4",
            name: "test",
            isFolder: true,
            children: [
              {
                id: "5",
                name: "file.js",
                isFolder: false,
              },
            ],
          },
        ],
      },
      { id: "6", name: "App.jsx", isFolder: false },
      { id: "7", name: "data.json", isFolder: false },
      { id: "8", name: "index.js", isFolder: false },
      { id: "9", name: "styles.css", isFolder: false },
    ],
  },
  { id: "10", name: "package.json", isFolder: false },
];

// ─── Parent component ─────────────────────────────────────────────

export default function FileExplorer() {
  const [data, setData] = useState<FileNode[]>(sampleData);

  // Input management state for adding new folders
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [parentId, setParentId] = useState<string | number | null>(null);

  // Show input box for adding a new folder under a target parent
  function showAddFolderInput(targetParentId: string | number) {
    setParentId(targetParentId);
    setShowInput(true);
    setInputValue("");
  }

  // Add new folder to the target parent via recursive tree update
  function addFolder() {
    const name = inputValue.trim();
    if (!name) return;

    // Recursive function to traverse and update the tree
    function updateTree(list: FileNode[]): FileNode[] {
      return list.map((node) => {
        // Found the target parent → add new folder to its children
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now(), // unique ID via timestamp
                name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }

        // Not the target — recurse into children if they exist
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }

        return node;
      });
    }

    setData((prev) => updateTree(prev));
    cancelAddFolder();
  }

  // Reset input state
  function cancelAddFolder() {
    setShowInput(false);
    setInputValue("");
    setParentId(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addFolder();
  }

  // Delete a node by ID — filter at current level + recurse into children
  function deleteFolder(targetId: string | number) {
    function deleteFromTree(list: FileNode[]): FileNode[] {
      return list
        .filter((item) => item.id !== targetId)
        .map((item) => {
          if (item.children && item.children.length > 0) {
            return { ...item, children: deleteFromTree(item.children) };
          }
          return item;
        });
    }

    setData((prev) => deleteFromTree(prev));
  }

  return (
    <div className="overallContainer">
      <IndividualNode
        data={data}
        showAddFolderInput={showAddFolderInput}
        showInput={showInput}
        parentId={parentId}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        cancelAddFolder={cancelAddFolder}
        deleteFolder={deleteFolder}
      />
    </div>
  );
}

// ─── Recursive node renderer ──────────────────────────────────────

function IndividualNode({
  data,
  showAddFolderInput,
  showInput,
  parentId,
  inputValue,
  setInputValue,
  handleSubmit,
  cancelAddFolder,
  deleteFolder,
}: IndividualNodeProps) {
  // Individual folder expand/collapse state — Record so each folder is independent
  const [isExpanded, setIsExpanded] = useState<ExpandedState>({});

  // ChangeEvent<HTMLInputElement> — typed event from the folder name input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  // KeyboardEvent<HTMLInputElement> — typed event for Escape key handling
  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      cancelAddFolder();
    }
  }

  return (
    <div className="container">
      {data.map((node) => (
        <div key={node.id}>
          {/* Individual node row */}
          <div className="indiviualNode">
            <span>
              {/* Expand/collapse toggle — only for folders */}
              {node.isFolder && (
                <span
                  onClick={() =>
                    setIsExpanded((prev) => ({
                      ...prev,
                      [node.name]: !prev[node.name],
                    }))
                  }
                >
                  {isExpanded[node.name] ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              )}
              <span>{node.name}</span>
            </span>

            {/* Action buttons — only for folders */}
            {node.isFolder && (
              <div className="actionButtons">
                <span
                  className="addIcon"
                  onClick={() => showAddFolderInput(node.id)}
                >
                  <FaPlus />
                </span>
                <span
                  className="deleteIcon"
                  onClick={() => deleteFolder(node.id)}
                >
                  <FaTimes />
                </span>
              </div>
            )}
          </div>

          {/* Inline input form — shown when adding to this specific folder */}
          {showInput && parentId === node.id && (
            <form onSubmit={handleSubmit} className="addFolderForm">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter folder name"
                className="folderInput"
                autoFocus
                onKeyDown={handleInputKeyDown}
              />
              <button type="submit" className="addButton">
                Add
              </button>
              <button
                type="button"
                onClick={cancelAddFolder}
                className="cancelButton"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Recursively render children when expanded */}
          {isExpanded[node.name] && node.children && (
            <IndividualNode
              data={node.children}
              showAddFolderInput={showAddFolderInput}
              showInput={showInput}
              parentId={parentId}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              cancelAddFolder={cancelAddFolder}
              deleteFolder={deleteFolder}
            />
          )}
        </div>
      ))}
    </div>
  );
}
