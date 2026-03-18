import React, { useState } from "react";
// import './styles.css'

function MortgageCalculator() {
  const [result, setResult] = useState(null);
  const [loanAmount, setLoanAmount] = useState(null);
  const [annualInterestRate, setAnnualInterestRate] = useState(null);
  const [loanTerm, setLoanTerm] = useState(null);

  function calculateMonthlyPayment() {
    const principal = Number(loanAmount);
    const interest = Number(annualInterestRate);
    const term = Number(loanTerm);

    if (principal <= 0 || interest <= 0 || term <= 0) {
      setResult("Invalid input");
      return;
    }

    const monthlyInterestRate = interest / 100 / 12;
    const numOfPayments = term * 12;

    const monthly =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numOfPayments));

    setResult(monthly.toFixed(2));
  }

  return (
    <div>
      {/* Implement Mortgage Calculator logic here */}
      <h1>Mortgage Calculator</h1>
      <div>
        <label for="loanAmount">Loan Amount (INR):</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>

      <div>
        <label for="annualInterestRate">Annual Interest Rate (%):</label>
        <input
          type="number"
          id="annualInterestRate"
          name="annualInterestRate"
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(e.target.value)}
        />
      </div>

      <div>
        <label for="loanTerm">Loan Term (Years):</label>
        <input
          type="number"
          id="loanTerm"
          name="loanTerm"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
      </div>

      <button onClick={calculateMonthlyPayment}>Calculate</button>
      {result != null && (
        <div aria-label="result" data-testid="result">
          Monthly Payment: {result}
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;
