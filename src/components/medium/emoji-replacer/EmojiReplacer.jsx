import React, { useState, useMemo } from "react";
import "./styles.css";

// ✅ Provided Emoji Mapping — DO NOT MODIFY
export const emojiMap = {
  // Emotions
  happy: "😊",
  sad: "😢",
  love: "❤️",
  angry: "😠",
  surprised: "😲",
  laugh: "😂",
  cool: "😎",
  tired: "😴",
  excited: "🤩",
  bored: "🥱",
  scared: "😱",
  confused: "😕",
  wow: "😮",
  cry: "😭",
  nervous: "😬",
  calm: "😌",
  // Greetings
  hello: "👋",
  bye: "👋",
  goodnight: "🌙",
  night: "🌙",
  // Activities
  party: "🥳",
  dance: "💃",
  music: "🎵",
  sleep: "😴",
  work: "💼",
  study: "📚",
  // Weather & Nature
  sun: "☀️",
  rain: "🌧️",
  snow: "❄️",
  cloud: "☁️",
  fire: "🔥",
  tree: "🌳",
  flower: "🌸",
  // Food & Drink
  pizza: "🍕",
  burger: "🍔",
  coffee: "☕",
  cake: "🍰",
  apple: "🍎",
  beer: "🍺",
  // Animals
  dog: "🐶",
  cat: "🐱",
  bird: "🐦",
  fish: "🐟",
  horse: "🐴",
  // Objects & Symbols
  phone: "📱",
  laptop: "💻",
  heart: "❤️",
  star: "⭐",
  thumbs_up: "👍",
  thumbs_down: "👎",
  ok_hand: "👌",
  // Misc
  money: "💰",
  gift: "🎁",
  car: "🚗",
  bike: "🚲",
  airplane: "✈️",
  clock: "⏰",
};

// TODO: Implement this function
export function replaceWithEmojis(input) {
  // Replace whole words (case-insensitive) using the emojiMap
  // Return updated text with emojis
  if (!input) return "";

  // Escape words for regex and join them
  const keys = Object.keys(emojiMap).join("|");

  // Regex: whole words only, case-insensitive
  const regex = new RegExp(`\\b(${keys})\\b`, "gi");

  return input.replace(regex, (match) => emojiMap[match.toLowerCase()]);
}
/*
* Object.keys(emojiMap) → ["happy", "sad", "love"]
* .join("|") → "happy|sad|love"
This string will be used in a regex pattern

3️⃣ Create a regex to match those words

const regex = new RegExp(`\\b(${keys})\\b`, "gi");
Let’s decode this 👇
\\b
* Word boundary
* Ensures whole words only
* Prevents replacing partial words
✅ replaces "happy" ❌ does NOT replace "happiness"
(${keys})
* Means: match any one of these

happy OR sad OR love
"gi" flags
* g → global (replace all matches)
* i → case-insensitive (Happy, HAPPY, etc.)
So the regex becomes:

/\b(happy|sad|love)\b/gi
*/

export default function EmojiReplacer() {
  const [text, setText] = useState("");
  // Output is computed whenever input changes
  const output = useMemo(() => replaceWithEmojis(text), [text]);

  return (
    <div className="app-container">
      <h1>Emoji Replacer</h1>

      <textarea
        placeholder="Type words like 'happy', 'love', 'pizza'..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="input-textarea"
        className="input-textarea"
        rows={6}
      />

      <div className="button-row">
        <button
          className="clear-btn"
          onClick={() => setText("")}
          data-testid="clear-button"
        >
          Clear Text
        </button>
      </div>

      <h2>Output:</h2>
      <div className="output-box" data-testid="output-box">
        {/* TODO: Render replaced text using replaceWithEmojis */}
        {output}
      </div>
    </div>
  );
}
