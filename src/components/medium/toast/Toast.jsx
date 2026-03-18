import React, { useState, useEffect } from "react";

const Toast = ({ message, type, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const backgroundColor =
    type === "success" ? "green" : type === "error" ? "red" : "blue"; // info = blue

  return (
    <div
      style={{
        padding: "10px 20px",
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        fontSize: "14px",
        zIndex: 1000,
        width: "200px",
      }}
      data-testid="toast"
    >
      {message}
    </div>
  );
};

export default Toast;
