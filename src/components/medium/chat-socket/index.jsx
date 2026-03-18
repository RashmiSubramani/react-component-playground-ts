// Real-time Chat Application using Socket.IO + React
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./styles.css";

const SocketChat = () => {
  /* ----------------------- STATE VARIABLES ----------------------- */

  const [messages, setMessages] = useState([]); // Stores all chat messages

  // Current message input value
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(""); // Username of the current user
  const [connected, setConnected] = useState(false); // Connection status with the socket server
  const [error, setError] = useState(""); // Error messages related to connection
  const [userCount, setUserCount] = useState(0); // Number of active users in the chat
  const [typing, setTyping] = useState([]); // List of users who are currently typing

  /* ----------------------- REFS ----------------------- */

  const socketRef = useRef(null); // Stores socket instance (persists across renders)
  const messagesEndRef = useRef(null); // Used for auto-scrolling to latest message
  const typingTimeoutRef = useRef(null); // Timeout reference for typing indicator debounce

  /* ----------------------- EFFECTS ----------------------- */

  // Initialize socket when username is set
  useEffect(() => {
    if (username) {
      initializeSocket();
    }

    // Cleanup socket connection on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [username]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ----------------------- SOCKET SETUP ----------------------- */

  const initializeSocket = () => {
    try {
      // Create socket connection
      socketRef.current = io("http://localhost:5000", {
        timeout: 5000,
        query: { username }, // send username during handshake
      });

      // Successful connection
      socketRef.current.on("connect", () => {
        setConnected(true);
        setError("");
        console.log("Connected to server");
      });

      // Connection error
      socketRef.current.on("connect_error", (err) => {
        setConnected(false);
        setError(
          "Unable to connect to chat server. Make sure server is running on port 5000."
        );
        console.error("Connection error:", err);
      });

      // Disconnection event
      socketRef.current.on("disconnect", () => {
        setConnected(false);
        setError("Disconnected from server");
      });

      // Load previous chat messages
      socketRef.current.on("chat-history", (msgs) => {
        setMessages(msgs || []);
      });

      // Receive new message
      socketRef.current.on("receive-message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      // Update active user count
      socketRef.current.on("user-count", (count) => {
        setUserCount(count);
      });

      // Handle typing indicators
      socketRef.current.on("user-typing", (data) => {
        setTyping((prev) => {
          const filtered = prev.filter((u) => u !== data.username);
          return data.isTyping ? [...filtered, data.username] : filtered;
        });
      });

      // User joined notification
      socketRef.current.on("user-joined", (data) => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            username: "System",
            content: `${data.username} joined the chat`,
            timestamp: new Date().toISOString(),
            isSystem: true,
          },
        ]);
      });

      // User left notification
      socketRef.current.on("user-left", (data) => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            username: "System",
            content: `${data.username} left the chat`,
            timestamp: new Date().toISOString(),
            isSystem: true,
          },
        ]);
      });
    } catch (err) {
      setError("Failed to initialize chat connection");
      console.error("Socket initialization error:", err);
    }
  };

  /* ----------------------- HELPERS ----------------------- */

  // Scrolls chat to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Sends message to server
  const sendMessage = () => {
    if (!input.trim() || !connected || !socketRef.current) return;

    socketRef.current.emit("send-message", {
      username,
      content: input.trim(),
    });

    setInput("");

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socketRef.current.emit("typing", { username, isTyping: false });
  };

  // Handle Enter key for sending messages
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle input changes + typing indicator
  const handleInputChange = (e) => {
    setInput(e.target.value);

    if (!connected || !socketRef.current) return;

    socketRef.current.emit("typing", { username, isTyping: true });

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing", { username, isTyping: false });
    }, 3000);
  };

  // Set username on Enter
  const handleUsernameSubmit = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setUsername(e.target.value.trim());
    }
  };

  // Format message timestamp
  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  /* ----------------------- UI ----------------------- */

  // Username entry screen
  if (!username) {
    return (
      <div className="chat-container">
        <div className="username-setup">
          <h3>Join Real-time Chat</h3>
          <p>Enter your name to connect</p>
          <input
            type="text"
            placeholder="Your name"
            onKeyDown={handleUsernameSubmit}
            autoFocus
            maxLength={20}
          />
          <small>Press Enter to join</small>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div>
          <h3>Live Chat Room</h3>
          <small>Socket.IO powered</small>
        </div>
        <div className="connection-info">
          <div className={`status ${connected ? "connected" : "disconnected"}`}>
            {connected ? "🟢 Connected" : "🔴 Disconnected"}
          </div>
          {connected && <div>{userCount} users online</div>}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError("")}>×</button>
        </div>
      )}

      {/* Messages */}
      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id || `${msg.username}-${msg.timestamp}`}
            className={`message ${
              msg.username === username ? "own-message" : ""
            } ${msg.isSystem ? "system-message" : ""}`}
          >
            {!msg.isSystem && (
              <div className="message-header">
                <span>{msg.username}</span>
                <span>{formatTime(msg.timestamp)}</span>
              </div>
            )}
            <div>{msg.content}</div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing.length > 0 && (
          <div className="typing-indicator">
            {typing.length === 1
              ? `${typing[0]} is typing...`
              : `${typing.length} people are typing...`}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-section">
        <input
          type="text"
          placeholder={connected ? "Type your message..." : "Connecting..."}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={!connected}
        />
        <button onClick={sendMessage} disabled={!input.trim() || !connected}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SocketChat;
