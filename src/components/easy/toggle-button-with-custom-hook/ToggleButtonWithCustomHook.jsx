import { useState } from "react";

// ✅ Complete the custom hook below
function useToggle(initialValue = false) {
  // your code here
  const [isOn, setIsOn] = useState(false);

  function toggle() {
    setIsOn((prev) => !prev);
  }

  return [isOn, toggle];
}

export default function ToggleButtonWIthCustomHook() {
  // ✅ Use the custom hook inside this component
  const [isOn, toggle] = useToggle(false);

  return (
    /* your toggle function for the onClick method */
    <button data-testid="toggle-button" onClick={toggle}>
      {/* Render "ON" or "OFF" based on state */}
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
