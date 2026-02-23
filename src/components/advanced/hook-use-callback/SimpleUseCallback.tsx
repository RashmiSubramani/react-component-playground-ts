// Imagine a parent has a counter and a child component that adds items. You want child to not re-render unnecessarily.
// Clicking Parent Counter re-renders parent.
// Without useCallback, Child re-renders every parent render.
// With useCallback, Child only re-renders when handleAdd changes → stable.
//
// | Hook          | What it does               | When to use                                |
// | ------------- | -------------------------- | ------------------------------------------ |
// | `useCallback` | Memoize **functions**      | Passing callbacks to `React.memo` children |

import React, { useState, useCallback, memo } from "react";

type ChildProps = {
  onAdd: () => void;
};

const Child = memo(({ onAdd }: ChildProps) => {
  console.log("Child rendered");
  return <button onClick={onAdd}>Add Item</button>;
});

export default function UseCallbackExample() {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  // Stable function → child sees the same reference
  const handleAdd = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  return (
    <div>
      <h2>useCallback Example</h2>

      <button onClick={() => setCounter((c) => c + 1)}>
        Parent Counter: {counter}
      </button>

      <p>Items: {items.join(", ")}</p>

      <Child onAdd={handleAdd} />
    </div>
  );
}
