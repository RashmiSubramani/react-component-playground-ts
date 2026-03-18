import { useEffect, useState } from "react";

import "./styles.css";

export default function PushNotification() {
  const [toasts, setToasts] = useState([]); //[{id:1, message:"sample"}]

  // Ask permission on app load
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = () => {
    const message = "You have a new message 🚀";

    // 1️⃣ In-app toast
    setToasts((prev) => [...prev, { id: Date.now(), message }]);

    // 2️⃣ Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("React App", {
        body: message,
        icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
      });
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">
      <h2>Push Notification Demo</h2>
      <button className="toastButton" onClick={showNotification}>
        Send Notification
      </button>

      <div className="toast-container">
        {toasts.map((toast) => (
          <NotificationToast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

const NotificationToast = ({ message, onClose }) => {
  //Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast" role="alert" aria-live="assertive">
      <span className="toastMessage">{message}</span>
      <button
        className="toastButton"
        onClick={onClose}
        aria-label="Close notification"
      >
        ✖
      </button>
    </div>
  );
};
