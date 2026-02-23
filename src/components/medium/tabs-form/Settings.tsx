/*
  SETTINGS TAB
  -------------
  Concepts: radio button handling, typing radio change event,
            union type for theme ("dark" | "light")
*/

import { type TabContentProps } from "./types";

export default function Settings({ data, setData }: TabContentProps) {
  const { theme } = data;

  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Cast to FormData["theme"] since radio value is always a string,
    // but we know it's either "dark" or "light" from the JSX below
    setData((prev) => ({
      ...prev,
      theme: e.target.value as "dark" | "light",
    }));
  }

  return (
    <div>
      <label>
        <input
          type="radio"
          name="theme"
          checked={theme === "dark"}
          value="dark"
          onChange={handleDataChange}
        />
        Dark
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          checked={theme === "light"}
          value="light"
          onChange={handleDataChange}
        />
        Light
      </label>
    </div>
  );
}
