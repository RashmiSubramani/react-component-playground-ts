import React, { useState } from "react";
import "./styles.css";

function ConfirmationModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  return (
    <div className="modal-container">
      <button
        className="open-modal-btn"
        onClick={() => setOpen(true)}
        data-testid="open-modal-button"
      >
        Open Confirmation Modal
      </button>

      {open && (
        <div className="modal-backdrop">
          <div className="modal-box" data-testid="confirmation-modal">
            <h2 className="modal-title" data-testid="modal-title">
              Confirm Action
            </h2>
            <p className="modal-message" data-testid="modal-message">
              Are you sure you want to proceed?
            </p>

            <div className="modal-buttons">
              <button
                className="confirm-btn"
                onClick={() => {
                  setStatus("Confirmed");
                  setOpen(false);
                }}
                data-testid="confirm-button"
              >
                Confirm
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setStatus("Cancelled");
                  setOpen(false);
                }}
                data-testid="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="action-status" data-testid="action-status">
        {status}
      </div>
    </div>
  );
}

export default ConfirmationModal;
