import React, { useState } from "react";
import "./styles.css";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [category, setCategory] = useState("");
  const [calculatedBMI, setCalculatedBMI] = useState(null);

  const calculateBMI = () => {
    //convert to numbers
    const w = Number(weight);
    const h = Number(height);

    if (w > 0 && h > 0) {
      // To check if they are non-negative
      const bmi = w / (h / 100) ** 2;
      const roundedBMI = parseFloat(bmi.toFixed(1)); //round off to 1 decimal
      setCalculatedBMI(roundedBMI);
      setCategory(getCategory(bmi));
    }
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setCalculatedBMI(null);
    setCategory("");
  };

  return (
    <div className="wrapper">
      <h2>BMI Calculator</h2>

      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight (kg)"
      />

      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height (cm)"
      />

      <button onClick={calculateBMI}>Calculate BMI</button>
      <button onClick={reset}>Reset</button>

      {calculatedBMI !== null && (
        <div>
          <h3>Your BMI: {calculatedBMI}</h3>
          <p>Category: {category}</p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
