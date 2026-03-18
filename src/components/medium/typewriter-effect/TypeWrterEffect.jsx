import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

// List of messages that will be displayed with the typewriter effect
const messages = [
  "Hello, welcome to the typewriter effect!",
  "This demonstrates useEffect and setInterval in React.",
  "Watch as each character appears one by one.",
  "You can skip the animation if you're impatient!",
  "Thanks for watching the typewriter in action!",
];

export function TypeWriterMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // State to keep track of which message is currently displayed
  const [displayedText, setDisplayedText] = useState(""); // State to hold the text that is currently typed/shown
  const [isTyping, setIsTyping] = useState(false); // State to track if the typing animation is in progress
  const [showSkip, setShowSkip] = useState(false); // State to control visibility of the "Skip" button

  // Memoize the current message to avoid recalculating it on every render
  const currentMessage = useMemo(
    () => messages[currentMessageIndex],
    [currentMessageIndex]
  );

  // Function to start typing the current message
  const startTyping = () => {
    setIsTyping(true); // Start typing animation
    setDisplayedText(""); // Reset displayed text
    setShowSkip(true); // Show the skip button while typing
  };

  // Function to skip the typing animation and show the full message
  const skipTyping = () => {
    setIsTyping(false); // Stop typing animation
    setDisplayedText(currentMessage); // Show full message immediately
    setShowSkip(false); // Hide skip button
  };

  // Function to go to the next message
  const nextMessage = () => {
    const nextIndex = (currentMessageIndex + 1) % messages.length; // Wrap around messages
    setCurrentMessageIndex(nextIndex);
    setDisplayedText(""); // Reset displayed text for the new message
    setIsTyping(false); // Ensure typing is stopped initially
    setShowSkip(false); // Hide skip button for new message
  };

  // useEffect to handle the typing animation
  useEffect(() => {
    if (!isTyping) return; // Only run effect if typing is active

    // Set up an interval to add one character at a time
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        // Check if full message has been typed
        if (prev.length >= currentMessage.length) {
          setIsTyping(false); // Stop typing animation
          setShowSkip(false); // Hide skip button
          return prev; // Return full message
        }
        // Otherwise, add one more character to displayed text
        return currentMessage.slice(0, prev.length + 1);
      });
    }, 100); // 100ms delay between each character

    // Clean up the interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isTyping, currentMessage]);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      {/* Display the message with typing effect */}
      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {/* Show blinking cursor while typing */}
        {isTyping && <span className="cursor">|</span>}
      </div>

      {/* Controls to interact with the typewriter */}
      <div className="controls">
        <button onClick={startTyping} disabled={isTyping}>
          Start Typing
        </button>

        {/* Show skip button only while typing */}
        {showSkip && <button onClick={skipTyping}>Skip</button>}

        <button onClick={nextMessage} disabled={isTyping}>
          Next Message
        </button>
      </div>

      {/* Info about the current message number */}
      <div className="message-info">
        <p>
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
      </div>
    </div>
  );
}
