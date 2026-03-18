import { useState, useEffect } from "react";
import "./styles.css";

function TemperatureConvertor() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Enable button only if all values are filled
    if (inputValue && fromUnit && toUnit) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValue, fromUnit, toUnit]);

  function convertTemperature() {
    const value = parseFloat(inputValue);

    let convertedValue;

    // Convert input to Celsius first
    let tempInCelsius;
    if (fromUnit === "Celsius") tempInCelsius = value;
    else if (fromUnit === "Fahrenheit") tempInCelsius = (value - 32) * (5 / 9);
    else if (fromUnit === "Kelvin") tempInCelsius = value - 273.15;

    // Convert Celsius to target unit
    if (toUnit === "Celsius") convertedValue = tempInCelsius;
    else if (toUnit === "Fahrenheit")
      convertedValue = tempInCelsius * (9 / 5) + 32;
    else if (toUnit === "Kelvin") convertedValue = tempInCelsius + 273.15;

    setResult(
      `${inputValue} ${fromUnit} is ${convertedValue.toFixed(2)} ${toUnit}`
    );
  }

  return (
    <div className="temperatureConvertor">
      <h1>Temperature Convertor</h1>
      <p>
        Enter a value and convert it between Celsius, Fahrenheit, and Kelvin.
      </p>

      <form className="tempForm" onSubmit={(e) => e.preventDefault()}>
        <div className="inputs">
          {/* Input */}
          <input
            data-testid="temperature-input"
            type="number"
            id="temperatureUnit"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trim())}
            placeholder="Enter temperature"
          />

          {/* From Unit */}
          <select
            id="fromUnit"
            data-testid="from-unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            <option value="">From Unit</option>
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>

          {/* To Unit */}
          <select
            id="toUnit"
            data-testid="to-unit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            <option value="">To Unit</option>
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>

          {/* Convert Button */}
          <button
            data-testid="convert-button"
            id="convert-btn"
            disabled={isDisabled}
            onClick={convertTemperature}
          >
            Convert
          </button>
        </div>

        <div>
          <p id="result">{result}</p>
        </div>
      </form>
    </div>
  );
}

export default TemperatureConvertor;
