/*
  FILE & FOLDER EXPLORER (Recursive Tree with Modal Add)
  --------------------------------------------------------
  Difficulty: Medium
  Concepts: recursive FileNode type with optional children,
            Record<number, boolean> for collapsed state,
            ModalInfo type for add dialog context,
            recursive tree mutation (add/delete),
            conditional spread for children on new nodes,
            two-component architecture (recursive display + parent state)

  How it works:
  1. FileAndFolder renders the tree recursively, with expand/collapse per folder
  2. "+" buttons open a modal asking for the new file/folder name
  3. handleModalSubmit recursively walks the tree to insert the new node
  4. deleteNode recursively filters out the target node from the tree
*/

import { useState } from "react";
import {
  FaChevronRight,
  FaChevronDown,
  FaFolderPlus,
  FaFileAlt,
  FaTrash,
} from "react-icons/fa";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type FileNode = {
  id: number;
  name: string;
  isFolder: boolean;
  children?: FileNode[];
};

type CollapsedState = Record<number, boolean>;

type ModalInfo = {
  parentId: number | null;
  isFolder: boolean;
};

type FileAndFolderProps = {
  data: FileNode[];
  onAdd: (parentId: number, isFolder: boolean) => void;
  onRemove: (id: number) => void;
};

// ─── Recursive display component ─────────────────────────────────

function FileAndFolder({ data, onAdd, onRemove }: FileAndFolderProps) {
  const [collapsed, setCollapsed] = useState<CollapsedState>({});

  function toggleFolder(id: number) {
    setCollapsed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="ffe-node">
          {item.isFolder ? (
            <>
              {/* Folder Row */}
              <div className="ffe-row">
                <button
                  className="ffe-icon-btn"
                  onClick={() => toggleFolder(item.id)}
                  title={collapsed[item.id] ? "Expand" : "Collapse"}
                >
                  {collapsed[item.id] ? <FaChevronRight /> : <FaChevronDown />}
                </button>

                <span className="ffe-folder-name">{item.name}</span>

                <button
                  className="ffe-icon-btn"
                  onClick={() => onAdd(item.id, true)}
                  title="Add folder"
                >
                  <FaFolderPlus />
                </button>

                <button
                  className="ffe-icon-btn"
                  onClick={() => onAdd(item.id, false)}
                  title="Add file"
                >
                  <FaFileAlt />
                </button>

                <button
                  className="ffe-icon-btn ffe-delete"
                  onClick={() => onRemove(item.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Recursive Children */}
              {!collapsed[item.id] && item.children && (
                <FileAndFolder
                  data={item.children}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              )}
            </>
          ) : (
            /* File Row */
            <div className="ffe-row">
              <span className="ffe-file-name">{item.name}</span>
              <button
                className="ffe-icon-btn ffe-delete"
                onClick={() => onRemove(item.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main component (state + modal) ──────────────────────────────

const initialData: FileNode[] = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [{ id: 2, name: "index.html", isFolder: false }],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      { id: 4, name: "App.js", isFolder: false },
      { id: 5, name: "index.js", isFolder: false },
    ],
  },
  { id: 6, name: "package.json", isFolder: false },
];

export default function FileFolderExplorer() {
  const [data, setData] = useState<FileNode[]>(initialData);
  const [idCounter, setIdCounter] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    parentId: null,
    isFolder: false,
  });
  const [inputValue, setInputValue] = useState("");

  // ChangeEvent<HTMLInputElement> — typed event from the modal input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  // Open modal for adding a file or folder
  function openModal(parentId: number, isFolder: boolean) {
    setModalInfo({ parentId, isFolder });
    setInputValue("");
    setShowModal(true);
  }

  // Recursively insert a new node under the target parent
  function handleModalSubmit() {
    const { parentId, isFolder } = modalInfo;
    const name = inputValue.trim();
    if (!name) return;

    // Conditional spread — folders get children[], files don't
    const newItem: FileNode = {
      id: idCounter,
      name,
      isFolder,
      ...(isFolder ? { children: [] } : {}),
    };

    function updateTree(nodes: FileNode[]): FileNode[] {
      return nodes.map((node) => {
        if (node.id === parentId && node.isFolder) {
          return {
            ...node,
            children: [...(node.children || []), newItem],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    }

    setData(updateTree(data));
    setIdCounter((prev) => prev + 1);
    setShowModal(false);
  }

  // Recursively filter out the target node
  function deleteNode(nodes: FileNode[], targetId: number): FileNode[] {
    const result: FileNode[] = [];
    for (const node of nodes) {
      if (node.id === targetId) continue;
      if (node.children) {
        result.push({ ...node, children: deleteNode(node.children, targetId) });
      } else {
        result.push(node);
      }
    }
    return result;
  }

  function handleRemove(targetId: number) {
    setData((prev) => deleteNode(prev, targetId));
  }

  return (
    <div className="ffe-container">
      <h2>File & Folder Explorer</h2>

      <FileAndFolder data={data} onAdd={openModal} onRemove={handleRemove} />

      {/* Add Modal */}
      {showModal && (
        <div className="ffe-modal-backdrop">
          <div className="ffe-modal">
            <h3>Enter {modalInfo.isFolder ? "folder" : "file"} name</h3>

            <input
              className="ffe-modal-input"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
            />

            <div className="ffe-modal-actions">
              <button className="ffe-btn" onClick={handleModalSubmit}>
                Add
              </button>
              <button
                className="ffe-btn ffe-btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
