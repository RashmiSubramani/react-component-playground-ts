import React, { useState } from "react";
import "./styles.css";

export default function QuizApp() {
  let questions = [
    {
      id: 1,
      question: "What is the capital of Haryana?",
      options: ["Yamunanagar", "Panipat", "Gurgaon", "Chandigarh"],
      answer: "Chandigarh",
    },
    {
      id: 2,
      question: "What is the capital of Punjab?",
      options: ["Patiala", "Ludhiana", "Amritsar", "Chandigarh"],
      answer: "Chandigarh",
    },
    {
      id: 3,
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: "Delhi",
    },
    {
      id: 4,
      question: "What is the capital of Uttarakhand?",
      options: ["Roorkee", "Haridwar", "Dehradun", "Nanital"],
      answer: "Dehradun",
    },
    {
      id: 5,
      question: "What is capital of Uttar Pradesh?",
      options: ["GB Nagar", "Lucknow", "Prayagraj", "Agra"],
      answer: "Lucknow",
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [warning, setWarning] = useState(false);
  console.log(questions);
  if (!questions || questions.length === 0) {
    return <p>No quiz available</p>;
  }

  const current = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (warning) setWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setWarning(true);
      return;
    }

    if (selectedOption === current.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    } else {
      setQuizEnd(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setQuizEnd(false);
    setWarning(false);
  };

  const getOptionTestId = (index) => {
    return `option-${String.fromCharCode(65 + index)}`; // A, B, C, D
  };

  return (
    <div className="App">
      <h1 className="app-title">Quiz App</h1>

      {!quizEnd ? (
        <form className="question-container" onSubmit={handleSubmit}>
          <h3>Question {currentQuestionIndex + 1}</h3>

          <p data-testid="question">{current.question}</p>

          <div className="options">
            {current.options.map((opt, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={handleOptionChange}
                />
                <span data-testid={getOptionTestId(index)}>{opt}</span>
              </label>
            ))}
          </div>

          {warning && (
            <p className="warning" data-testid="warning">
              Please select an option
            </p>
          )}

          <button
            type="submit"
            className="submit-button"
            data-testid="submit-button"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="score-container">
          <h2 data-testid="score">
            Your Score: {score} / {questions.length}
          </h2>

          <button
            className="restart-button"
            data-testid="restart-button"
            onClick={resetQuiz}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// 1. App loads
//      question #1 shown
// 2. User selects option
//      selectedOption stores it
// 3. User clicks Submit
//      validate
//      check answer
//      increase score (if correct)
//      go to next question
// 4. After last question
//      show final score
// 5. User clicks Play Again
//      everything resets
//      quiz starts from first question
