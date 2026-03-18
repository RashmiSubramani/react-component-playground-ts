import React, { useState } from "react";

const ZigzagString = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  function onSubmit() {
    let splitString = value.split(",");
    let res = "";
    for (let i = 0; i < splitString.length; i++) {
      if (i % 2 === 0) {
        res = res + splitString[i];
      } else {
        res += splitString[i].split("").reverse().join("");
      }
      setResult(res);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter strings like one,two,three"
        data-testid="input-box"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="inputBox"
      />
      <button data-testid="submit-button" onClick={onSubmit} className="subBtn">
        Submit
      </button>
      <p data-testid="output-result" className="outputText">
        Output: {result}
      </p>
    </div>
  );
};

export default ZigzagString;
