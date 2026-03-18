// Counter.js
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  function onIncrement() {
    setCount((count) => count + 1);
  }

  function onDecrement() {
    setCount((count) => count - 1);
  }

  function onReset() {
    setCount(0);
  }

  return (
    <div>
      <h2>Counter: {count} </h2>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default Counter;
