import { useState } from "react";
import "./styles.css";

export default function BillingCounter() {
  const [counterCount, setCounterCount] = useState("");
  const [counters, setCounters] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [lastAssigned, setLastAssigned] = useState(null);
  const [initialized, setInitialized] = useState(false);

  /* ------------------------------------------
     Initialize counters
  ------------------------------------------ */
  const initializeCounters = () => {
    const count = parseInt(counterCount, 10);
    if (isNaN(count) || count <= 0) return;

    // Create empty queues for each counter
    setCounters(Array.from({ length: count }, () => []));
    setInitialized(true);
  };

  /* ------------------------------------------
     Add customer to the least loaded counter
  ------------------------------------------ */
  const handleAdd = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return;

    // Calculate total items in each counter
    const totals = counters.map((queue) =>
      queue.reduce((sum, item) => sum + item, 0)
    );

    // Find counter with minimum load
    const minTotal = Math.min(...totals);
    const counterIndex = totals.indexOf(minTotal);

    // Add customer to that counter
    const updatedCounters = counters.map((queue, idx) =>
      idx === counterIndex ? [...queue, qty] : queue
    );

    setCounters(updatedCounters);
    setQuantity("");
    setLastAssigned(counterIndex + 1);
  };

  return (
    <div className="billing-container" data-testid="billing-container">
      <h2 data-testid="heading">Billing Counter System</h2>

      {/* ---------------- Counter Setup ---------------- */}
      {!initialized ? (
        <div className="input-section" data-testid="counter-input-section">
          <input
            data-testid="counter-input"
            type="number"
            placeholder="Number of counters"
            value={counterCount}
            onChange={(e) => setCounterCount(e.target.value)}
          />
          <button data-testid="set-counter-button" onClick={initializeCounters}>
            Set Counters
          </button>
        </div>
      ) : (
        <>
          {/* ---------------- Customer Input ---------------- */}
          <div className="input-section" data-testid="customer-input-section">
            <input
              data-testid="quantity-input"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button data-testid="add-customer-button" onClick={handleAdd}>
              Add Customer
            </button>
          </div>

          {/* ---------------- Assignment Message ---------------- */}
          {lastAssigned && (
            <div className="assigned-msg" data-testid="assignment-msg">
              Customer assigned to Counter {lastAssigned}
            </div>
          )}

          {/* ---------------- Counters Display ---------------- */}
          <div className="counter-wrapper" data-testid="counter-wrapper">
            {counters.map((queue, index) => (
              <div
                key={index}
                className="counter"
                data-testid={`counter-${index}`}
              >
                <h4 data-testid="counter-heading">Counter {index + 1}</h4>

                <div className="queue" data-testid={`queue-${index}`}>
                  {queue.map((qty, idx) => (
                    <div
                      key={idx}
                      className="customer-box"
                      data-testid="customer-box"
                    >
                      {qty}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
