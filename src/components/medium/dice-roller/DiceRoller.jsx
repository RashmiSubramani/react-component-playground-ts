import React, { useState } from "react";
import "./styles.css";

function DiceRoller() {
  const [canRoll, setCanRoll] = useState(true);
  const [generatedNumber, setGeneratedNumber] = useState(null);

  function onRollDiceClick() {
    setCanRoll(false);
    //function to generate number and set it
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setGeneratedNumber(randomNumber);
  }
  return (
    <div className="wrapper">
      <h1>Dice Roller</h1>
      {/* Implement Dice Roller logic here */}
      <button onClick={onRollDiceClick}>Roll Dice</button>

      {canRoll ? <h2>Click to roll!</h2> : <h2>🎲 {generatedNumber}</h2>}
    </div>
  );
}

export default DiceRoller;
