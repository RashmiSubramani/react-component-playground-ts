import { useState } from "react";
import "./styles.css";

function RockPaperScissor() {
  const choices = ["rock", "paper", "scissor"];
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("Press Any One");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  function PlayGame(choice) {
    // Computer random choice
    const randomChoice = choices[Math.floor(Math.random() * 3)];

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);

    // Game logic
    if (choice === randomChoice) {
      setResult("It's a Tie");
    } else if (
      (choice === "rock" && randomChoice === "scissor") ||
      (choice === "paper" && randomChoice === "rock") ||
      (choice === "scissor" && randomChoice === "paper")
    ) {
      setResult("You Win");
      setPlayerScore((s) => s + 1); // correct score increment
    } else {
      setResult("You Lose");
      setComputerScore((s) => s + 1); // correct score increment
    }
  }

  function Reset() {
    setPlayerChoice(null);
    setComputerChoice(null);
    setPlayerScore(0);
    setComputerScore(0);
    setResult("Press Any One");
  }

  return (
    <div className="rockPaperScissor">
      <h1>Rock Paper Scissor</h1>
      <p>
        A two-player hand game where each player chooses rock, paper, or
        scissors.
      </p>

      <div className="container">
        <div className="choices">
          <button data-testid="btn-rock" onClick={() => PlayGame("rock")}>
            👊
          </button>
          <button data-testid="btn-paper" onClick={() => PlayGame("paper")}>
            🖐️
          </button>
          <button data-testid="btn-scissor" onClick={() => PlayGame("scissor")}>
            ✌️
          </button>
        </div>
        <div className="rockPaperScissor-result">
          <p data-testid="player-choice">
            You Chose: <b>{playerChoice}</b>
          </p>
          <p data-testid="computer-choice">
            Computer Choose : <b>{computerChoice}</b>
          </p>
          <p className="win-result" data-testid="result">
            {result}
          </p>
        </div>

        <div className="rockPaperScissor-scores">
          <h3 className="playerScore" data-testid="player-score">
            Player Score : <span>{playerScore}</span>
          </h3>
          <h3 className="computerScore" data-testid="computer-score">
            Computer Score : <span>{computerScore}</span>
          </h3>
        </div>

        <div className="reset-scores">
          <button onClick={Reset} data-testid="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default RockPaperScissor;
