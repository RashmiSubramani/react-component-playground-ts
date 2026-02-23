/*
  PROFILE TAB
  ------------
  Concepts: typing props with shared type, typing event + dynamic key,
            conditional error rendering
*/

import { type TabContentProps } from "./types";

export default function Profile({ data, setData, errors }: TabContentProps) {
  const { name, age, email } = data;

  // "item" is typed as keyof FormData — so only valid keys are allowed
  // e is typed as ChangeEvent for an input element
  function handleDataChange(
    e: React.ChangeEvent<HTMLInputElement>,
    item: "name" | "age" | "email",
  ) {
    setData((prev) => ({
      ...prev,
      [item]: e.target.value,
    }));
  }

  return (
    <div className="profile">
      <label>Name :</label>
      <input
        type="text"
        value={name}
        onChange={(e) => handleDataChange(e, "name")}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <label>Age :</label>
      <input
        type="number"
        value={age}
        onChange={(e) => handleDataChange(e, "age")}
      />
      {errors.age && <span className="error">{errors.age}</span>}

      <label>Email :</label>
      <input
        type="email"
        value={email}
        onChange={(e) => handleDataChange(e, "email")}
      />
      {errors.email && <span className="error">{errors.email}</span>}
    </div>
  );
}
