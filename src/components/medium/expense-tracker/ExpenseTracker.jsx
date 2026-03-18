import React, { useState } from "react";
import "./styles.css";

const ExpenseTracker = () => {
  // Initilize useState using transactions, title, amount, type, showForm and search
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("income");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //create filteredTransactions
  const filteredTransactions = transactions.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Calculate balance using totalIncome and totalExpense

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpanse = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpanse;

  const handleAddTransaction = () => {
    // complete logic to create a new transaction object
    // update the state and reset form fields
    if (!title || !amount) return;
    let newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
    };
    setTransactions([...transactions, newTransaction]);
    setTitle("");
    setAmount("");
    setType("income");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    // implement delete logic
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <div className="balance">
          <h3 data-testid="balance-amount">Balance: ₹{balance}</h3>
        </div>

        <button
          className="toggle-form-button"
          data-testid="toggle-form-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Open Form"}
        </button>
      </div>

      <div className="form">
        {showForm && (
          <>
            <input
              type="text"
              data-testid="title-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              data-testid="amount-input"
              placeholder="Amount"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              data-testid="type-select"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button data-testid="add-button" onClick={handleAddTransaction}>
              Add Transaction
            </button>
          </>
        )}
      </div>

      <div className="summary">
        <div data-testid="income-amount">Income: ₹{totalIncome}</div>
        <div data-testid="expenses-amount">Expense: ₹{totalExpanse}</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="transactions">
        {filteredTransactions.map((item) => {
          return (
            <li
              key={item.id}
              className={item.type}
              data-testid="transaction-item"
            >
              <span>
                {item.title}: ₹{item.amount}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                data-testid="delete-button"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>

      {filteredTransactions.length === 0 && (
        <div data-testid="no-transactions" className="no-transactions">
          No transactions found
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
