const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Create a Socket.IO server and allow cross-origin requests
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store messages and users in-memory
const messages = [];
const connectedUsers = new Map(); // Map of socket.id -> username

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Get username from query
  const username = socket.handshake.query.username;
  console.log("Username from query:", username);

  if (username && username !== 'undefined') {
    connectedUsers.set(socket.id, username);
    console.log("Connected users:", Array.from(connectedUsers.values()));

    // Notify others that user joined
    socket.broadcast.emit("user-joined", { username });

    // Send current user count to all clients
    console.log("Emitting user count:", connectedUsers.size);
    io.emit("user-count", connectedUsers.size);
  } else {
    // Even if no username, send current user count
    socket.emit("user-count", connectedUsers.size);
  }

  // Send all previous messages to the newly connected client
  socket.emit("chat-history", messages);

  // Listen for 'send-message' events from the client
  socket.on("send-message", (msg) => {
    // Add timestamp, id, and store message
    const message = {
      ...msg,
      id: Date.now() + Math.random(), // Simple unique ID
      timestamp: new Date().toISOString()
    };
    messages.push(message);

    // Limit message history to last 100 messages
    if (messages.length > 100) {
      messages.shift();
    }

    // Broadcast this message to **all connected clients**, including sender
    io.emit("receive-message", message);
  });

  // Handle typing indicators
  socket.on("typing", (data) => {
    socket.broadcast.emit("user-typing", data);
  });

  // Triggered when a client disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    const username = connectedUsers.get(socket.id);
    if (username) {
      connectedUsers.delete(socket.id);
      console.log("User", username, "removed. Remaining users:", Array.from(connectedUsers.values()));

      // Notify others that user left
      socket.broadcast.emit("user-left", { username });

      // Send updated user count to all clients
      console.log("Emitting user count after disconnect:", connectedUsers.size);
      io.emit("user-count", connectedUsers.size);
    }
  });

  // Handle user reconnection
  socket.on("error", (error) => {
    console.log("Socket error:", error);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

server.listen(5000, () => console.log("🚀 Chat server running on port 5000"));
