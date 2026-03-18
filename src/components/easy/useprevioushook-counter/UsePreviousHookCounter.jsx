// 🧠 Why useRef?
// useRef persists values between renders
// Updating ref.current does NOT cause a re-render
// Perfect for storing “previous” values

// 🔄 Render Timeline (Very Important)
// Let’s walk through each render cycle.
// 🟢 Initial Render
// currentCount = 0

// What happens:
// useRef() → { current: undefined }
// useEffect is scheduled (not run yet)

// Hook returns:
// ref.current → undefined

// UI shows:
// Current Count: 0
// Previous Count: undefined

// 🔵 After Initial Render (Effect runs)
// ref.current = 0

// ⚠️ This happens after paint, not during render.

// 🟡 User clicks "Increment"
// setCurrentCount(1)

// ➡ React triggers re-render

// 🟣 Second Render
// currentCount = 1

// Before useEffect runs:
// ref.current still holds previous value
// ref.current = 0

// Hook returns:
// previousCount = 0

// UI shows:
// Current Count: 1
// Previous Count: 0

// 🔵 After Second Render (Effect runs)
// ref.current = 1

// 🔁 Repeat Forever
// Each time:
// Render uses old ref.current
// Effect updates it to new value
// Next render sees it as "previous"

import { useState } from "react";
import usePrevious from "./usePrevious";

export default function UsePreviousHookCounter() {
  const [currentCount, setCurrentCount] = useState(0);
  const previousCount = usePrevious(currentCount);

  return (
    <div className="App">
      <h2>Current Count: {currentCount}</h2>
      <h2>Previous Count: {previousCount}</h2>
      <button onClick={() => setCurrentCount(currentCount - 1)}>
        Decrement
      </button>
      <button onClick={() => setCurrentCount(0)}>Reset</button>
      <button onClick={() => setCurrentCount(currentCount + 1)}>
        Increment
      </button>
    </div>
  );
}
