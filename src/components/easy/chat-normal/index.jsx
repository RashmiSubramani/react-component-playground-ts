// Simple Chat UI
import React, { useState } from "react";
import "./styles.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, username: "Alice", content: "Hello everyone!", time: "10:30 AM" },
    {
      id: 2,
      username: "Bob",
      content: "Hey Alice! How are you?",
      time: "10:31 AM",
    },
    { id: 3, username: "Charlie", content: "Good morning!", time: "10:32 AM" },
  ]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const sendMessage = () => {
    if (!input.trim() || !username.trim()) return;

    const newMessage = {
      id: Date.now(),
      username,
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleUsernameSubmit = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setUsername(e.target.value.trim());
    }
  };

  if (!username) {
    return (
      <div className="chat-container">
        <div className="username-setup">
          <h3>Enter your name to join chat</h3>
          <input
            type="text"
            placeholder="Your name"
            onKeyDown={handleUsernameSubmit}
            autoFocus
          />
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat Room</h3>
        <span className="user-info">Logged in as: {username}</span>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.username === username ? "own-message" : ""
            }`}
          >
            <div className="message-header">
              <span className="username">{msg.username}</span>
              <span className="time">{msg.time}</span>
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={!input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;