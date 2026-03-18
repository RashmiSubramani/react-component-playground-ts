import React, { useState } from "react";
import {
  Trash,
  Delete,
  Equal,
  Percent,
  Divide,
  X,
  Minus,
  Plus,
  Radical,
} from "lucide-react";
import "./styles.css";

function Calculator() {
  const [expression, setExpression] = useState("");

  function handleClick(value) {
    setExpression((prev) => prev + value);
  }

  function clearAll() {
    setExpression("");
  }

  function backspace() {
    setExpression((prev) => prev.slice(0, -1));
  }

  function calculate() {
    try {
      let exp = expression;

      exp = exp.replace(/x/g, "*");
      exp = exp.replace(/÷/g, "/");
      exp = exp.replace(/√/g, "Math.sqrt");

      const result = eval(exp);
      setExpression(String(result));
    } catch (err) {
      setExpression("Error");
    }
  }

  return (
    <div className="calculator-container" data-testid="calc-container">
      <h1 className="title">Simple Calculator</h1>

      <input
        className="display"
        readOnly
        placeholder="Enter expression"
        value={expression}
        data-testid="calc-display"
      />

      <div className="button-grid">
        {/* Row 1 */}
        <button
          className="calc-btn clear-btn"
          onClick={clearAll}
          data-testid="btn-clear"
        >
          <Trash className="icon-clear" data-testid="icon-clear" />
        </button>

        <button
          className="calc-btn"
          onClick={() => handleClick("√(")}
          data-testid="btn-sqrt"
        >
          <Radical className="icon-sqrt" data-testid="icon-sqrt" />
        </button>

        <button
          className="calc-btn"
          onClick={() => handleClick("%")}
          data-testid="btn-modulus"
        >
          <Percent className="icon-percent" data-testid="icon-percent" />
        </button>

        <button
          className="calc-btn"
          onClick={() => handleClick("/")}
          data-testid="btn-divide"
        >
          <Divide className="icon-divide" data-testid="icon-divide" />
        </button>

        {/* Row 2 */}
        <button
          className="calc-btn"
          onClick={() => handleClick("7")}
          data-testid="btn-7"
        >
          7
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("8")}
          data-testid="btn-8"
        >
          8
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("9")}
          data-testid="btn-9"
        >
          9
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("*")}
          data-testid="btn-multiply"
        >
          <X className="icon-multiply" data-testid="icon-multiply" />
        </button>

        {/* Row 3 */}
        <button
          className="calc-btn"
          onClick={() => handleClick("4")}
          data-testid="btn-4"
        >
          4
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("5")}
          data-testid="btn-5"
        >
          5
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("6")}
          data-testid="btn-6"
        >
          6
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("-")}
          data-testid="btn-minus"
        >
          <Minus className="icon-minus" data-testid="icon-minus" />
        </button>

        {/* Row 4 */}
        <button
          className="calc-btn"
          onClick={() => handleClick("1")}
          data-testid="btn-1"
        >
          1
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("2")}
          data-testid="btn-2"
        >
          2
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("3")}
          data-testid="btn-3"
        >
          3
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("+")}
          data-testid="btn-plus"
        >
          <Plus className="icon-plus" data-testid="icon-plus" />
        </button>

        {/* Row 5 */}
        <button
          className="calc-btn"
          onClick={() => handleClick("0")}
          data-testid="btn-0"
        >
          0
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick(".")}
          data-testid="btn-dot"
        >
          .
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick("(")}
          data-testid="btn-open"
        >
          (
        </button>
        <button
          className="calc-btn"
          onClick={() => handleClick(")")}
          data-testid="btn-close"
        >
          )
        </button>

        {/* Row 6 */}
        <button
          className="calc-btn back-btn"
          onClick={backspace}
          data-testid="btn-back"
        >
          <Delete className="icon-backspace" data-testid="icon-backspace" />
        </button>

        <button
          className="calc-btn equal-btn"
          onClick={calculate}
          data-testid="btn-equal"
        >
          <Equal className="icon-equal" data-testid="icon-equal" />
        </button>
      </div>
    </div>
  );
}

export default Calculator;
