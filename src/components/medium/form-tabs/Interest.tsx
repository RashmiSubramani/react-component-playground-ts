/*
  INTEREST TAB
  -------------
  Concepts: checkbox handling, typed event with e.target.checked & e.target.name,
            immutable array update (add/remove from array)
*/

import { type TabContentProps } from "./types";

export default function Interest({ data, setData, errors }: TabContentProps) {
  const { interests } = data;

  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => ({
      ...prev,
      // If checked → add to array, if unchecked → filter out
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((i) => i !== e.target.name),
    }));
  }

  return (
    <div className="profile">
      <label>Interest :</label>
      <label>
        <input
          type="checkbox"
          name="coding"
          checked={interests.includes("coding")}
          onChange={handleDataChange}
        />
        Coding
      </label>
      <label>
        <input
          type="checkbox"
          name="dance"
          checked={interests.includes("dance")}
          onChange={handleDataChange}
        />
        Dance
      </label>
      <label>
        <input
          type="checkbox"
          name="music"
          checked={interests.includes("music")}
          onChange={handleDataChange}
        />
        Music
      </label>

      {errors.interests && <span className="error">{errors.interests}</span>}
    </div>
  );
}
