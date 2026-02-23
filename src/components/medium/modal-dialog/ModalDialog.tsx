/*
  Modal / Dialog — Portal, Focus Trap, Escape Close
  ---------------------------------------------------
  Category: Medium

  Concepts:
  1. createPortal — render modal outside component tree
  2. Focus trap — Tab/Shift+Tab cycle within modal
  3. Escape key — close on keydown
  4. Click outside (overlay) — close on backdrop click
  5. Body scroll lock — prevent background scroll
  6. Reusable Modal component with children pattern
*/

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaInfoCircle, FaTrash, FaEdit } from "react-icons/fa";
import "./styles.css";

// ─── Reusable Modal component ──────────────────────────────────────

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ── Escape key closes modal ──
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // ── Lock body scroll when open ──
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // ── Focus trap: Tab cycles within modal ──
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Focus first focusable element
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !modal) return;

      const elements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: wrap from first → last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: wrap from last → first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Render via createPortal ──
  return createPortal(
    <div
      className="md-overlay"
      onClick={onClose} // click backdrop = close
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={modalRef}
        className="md-modal"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        <div className="md-modal-header">
          <h3 className="md-modal-title">{title}</h3>
          <button className="md-close-btn" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className="md-modal-body">{children}</div>
        {footer && <div className="md-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

// ─── Main demo component ───────────────────────────────────────────

function ModalDialog() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");

  // ChangeEvent<HTMLInputElement> — typed events from form inputs
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormEmail(e.target.value);
  }

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev]);
  }, []);

  // ── Info modal ──
  const openInfo = () => {
    setInfoOpen(true);
    addLog("Info modal opened");
  };

  // ── Confirm modal ──
  const openConfirm = () => {
    setConfirmOpen(true);
    addLog("Confirm modal opened");
  };

  const handleConfirmYes = () => {
    setConfirmOpen(false);
    addLog("Delete confirmed!");
  };

  // ── Form modal ──
  const openForm = () => {
    setFormName("");
    setFormEmail("");
    setFormOpen(true);
    addLog("Form modal opened");
  };

  const handleFormSubmit = () => {
    if (!formName.trim() || !formEmail.trim()) return;
    setFormOpen(false);
    addLog(`Form submitted: ${formName} (${formEmail})`);
  };

  return (
    <div className="md-container">
      <h2>Modal / Dialog</h2>
      <p className="md-subtitle">
        Portal, focus trap, Escape close, overlay click close
      </p>

      {/* Trigger buttons */}
      <div className="md-triggers">
        <button className="md-btn md-btn-info" onClick={openInfo}>
          <FaInfoCircle size={12} /> Info Modal
        </button>
        <button className="md-btn md-btn-danger" onClick={openConfirm}>
          <FaTrash size={12} /> Confirm Delete
        </button>
        <button className="md-btn md-btn-primary" onClick={openForm}>
          <FaEdit size={12} /> Form Modal
        </button>
      </div>

      {/* Info modal */}
      <Modal
        isOpen={infoOpen}
        onClose={() => {
          setInfoOpen(false);
          addLog("Info modal closed");
        }}
        title="Information"
        footer={
          <button
            className="md-btn md-btn-primary"
            onClick={() => {
              setInfoOpen(false);
              addLog("Info modal closed");
            }}
          >
            Got it
          </button>
        }
      >
        <p>
          This modal uses <strong>createPortal</strong> to render outside the
          component tree. It supports:
        </p>
        <ul>
          <li>Escape key to close</li>
          <li>Click outside (overlay) to close</li>
          <li>Focus trap (Tab / Shift+Tab cycles within)</li>
          <li>Body scroll lock while open</li>
        </ul>
      </Modal>

      {/* Confirm modal */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          addLog("Confirm cancelled");
        }}
        title="Confirm Delete"
        footer={
          <>
            <button
              className="md-btn md-btn-cancel"
              onClick={() => {
                setConfirmOpen(false);
                addLog("Confirm cancelled");
              }}
            >
              Cancel
            </button>
            <button className="md-btn md-btn-danger" onClick={handleConfirmYes}>
              <FaTrash size={11} /> Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>

      {/* Form modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          addLog("Form cancelled");
        }}
        title="Edit Profile"
        footer={
          <>
            <button
              className="md-btn md-btn-cancel"
              onClick={() => {
                setFormOpen(false);
                addLog("Form cancelled");
              }}
            >
              Cancel
            </button>
            <button
              className="md-btn md-btn-confirm"
              onClick={handleFormSubmit}
              disabled={!formName.trim() || !formEmail.trim()}
            >
              Save
            </button>
          </>
        }
      >
        <div className="md-form-group">
          <label className="md-form-label">Name</label>
          <input
            className="md-form-input"
            value={formName}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
        </div>
        <div className="md-form-group">
          <label className="md-form-label">Email</label>
          <input
            className="md-form-input"
            type="email"
            value={formEmail}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
        </div>
      </Modal>

      {/* Action log */}
      {log.length > 0 && (
        <div className="md-log">
          <p className="md-log-title">Event Log</p>
          <ul className="md-log-list">
            {log.map((entry, i) => (
              <li key={i} className="md-log-item">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModalDialog;
