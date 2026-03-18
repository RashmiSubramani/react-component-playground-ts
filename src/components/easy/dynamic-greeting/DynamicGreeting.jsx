import React, { useState, useEffect } from "react";

export default function DynamicGreeting() {
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Set immediately so message is not empty at first render
    const now = new Date();
    setTime(now);
    updateGreeting(now);

    const timer = setInterval(() => {
      const current = new Date();
      setTime(current);
      updateGreeting(current);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function updateGreeting(now) {
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) {
      setMessage("Good Morning! ☀️");
    } else if (hours >= 12 && hours < 17) {
      setMessage("Good Afternoon! 🌤️");
    } else if (hours >= 17 && hours < 21) {
      setMessage("Good Evening! 🌆");
    } else {
      setMessage("Good Night! 🌙");
    }
  }

  const formatTimeUnit = (unit) => String(unit).padStart(2, "0");
  return (
    <div
      className="modal-content"
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      <div>
        <div data-testid="greeting">{message}</div>
        <div data-testid="time" className="updated-time">
          {`${formatTimeUnit(time.getHours())}:${formatTimeUnit(
            time.getMinutes()
          )}:${formatTimeUnit(time.getSeconds())}`}
        </div>
      </div>
    </div>
  );
}
