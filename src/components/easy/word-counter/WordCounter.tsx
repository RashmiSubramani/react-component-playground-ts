/*
  WORD COUNTER (Live Frequency Analysis)
  -----------------------------------------
  Difficulty: Easy
  Concepts: Record<string, number> frequency map, regex cleaning,
            Object.entries + sort for ranked output, useEffect on text change,
            typed [string, number] tuple array for display

  How it works:
  1. User types text in a textarea
  2. On every change, text is cleaned (lowercase, remove non-alpha)
  3. Words are split and counted into a frequency map
  4. Results are sorted by frequency (descending) and displayed
*/

import { useState, useEffect } from "react";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type WordFrequency = [string, number];

// ─── Component ──────────────────────────────────────────────────────

function WordCounter() {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState<WordFrequency[]>([]);

  // ChangeEvent<HTMLTextAreaElement> — typed event from the textarea
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  useEffect(() => {
    // 1. Clean the input → lowercase + remove non-alphabets + trim spaces
    const cleaned = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .trim();

    // If cleaned text is empty → no words to count
    if (!cleaned) {
      setFrequencies([]);
      return;
    }

    // 2. Split into words (split on one or more spaces)
    const words = cleaned.split(/\s+/);

    // 3. Count frequency using a simple object
    const freq: Record<string, number> = {};
    for (const w of words) {
      freq[w] = (freq[w] || 0) + 1;
    }

    // 4. Convert object to array and sort by frequency (descending)
    const sorted: WordFrequency[] = Object.entries(freq).sort(
      (a, b) => b[1] - a[1],
    );

    // 5. Update state → UI will show results
    setFrequencies(sorted);
  }, [text]);

  return (
    <div className="wc-container">
      <h2>Word Counter</h2>

      <textarea
        className="wc-textarea"
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
      />

      {frequencies.length > 0 && (
        <div className="wc-results">
          <h3>Word Frequencies</h3>
          <ul className="wc-list">
            {frequencies.map(([word, count]) => (
              <li key={word} className="wc-item">
                <span className="wc-word">{word}</span>
                <span className="wc-count">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WordCounter;
