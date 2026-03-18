import React, { useState } from "react";

// ✅ Export this so it can be tested
export const checkPasswordStrength = (password) => {
  let criteriaMet = 0;
  if (password.length >= 8) criteriaMet++;
  if (/[A-Z]/.test(password)) criteriaMet++;
  if (/[a-z]/.test(password)) criteriaMet++;
  if (/\d/.test(password)) criteriaMet++;
  if (/[^A-Za-z0-9]/.test(password)) criteriaMet++;

  if (criteriaMet === 0) return "Weak Password";
  if (criteriaMet === 1) return "Level 1";
  if (criteriaMet === 2 || criteriaMet === 3) return "Level 2";
  if (criteriaMet === 4 || criteriaMet === 5) return "Level 3";
};

const PasswordStrength = () => {
  const [inputValue, setInputValue] = useState("");
  const [strength, setStrength] = useState(null);

  function handleCheckStrength() {
    const result = checkPasswordStrength(inputValue);
    setStrength(result);
  }

  return (
    <div>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleCheckStrength}>Check Strength</button>
      {strength && <div>Strength: {strength}</div>}
    </div>
  );
};

export default PasswordStrength;
