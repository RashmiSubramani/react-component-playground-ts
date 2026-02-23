import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaTag } from "react-icons/fa";
import { removeItem, increment, decrement, applyDiscount, clearCart } from "./cartSlice";
import type { RootState, AppDispatch } from "./store";

const VALID_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  HALF: 50,
};

export default function CartPanel() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const [discountCode, setDiscountCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // Derived values
  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0,
  );
  const discountAmount = subtotal * (cart.discount / 100);
  const total = subtotal - discountAmount;
  const totalItems = cart.items.reduce((sum, i) => sum + i.qty, 0);

  // ChangeEvent<HTMLInputElement> — typed event from the discount code input
  function handleDiscountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDiscountCode(e.target.value);
    setCodeError("");
  }

  // KeyboardEvent<HTMLInputElement> — typed event for Enter key on discount input
  function handleDiscountKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleApplyDiscount();
  }

  function handleApplyDiscount(): void {
    const code = discountCode.trim().toUpperCase();
    if (VALID_CODES[code] !== undefined) {
      dispatch(applyDiscount(VALID_CODES[code]));
      setCodeError("");
      setDiscountCode("");
    } else {
      setCodeError("Invalid code. Try SAVE10, SAVE20, or HALF.");
    }
  }

  return (
    <div className="hrs-cart">
      <h3 className="hrs-section-title">
        <FaShoppingCart size={14} /> Cart ({totalItems})
      </h3>

      {cart.items.length === 0 ? (
        <p className="hrs-empty">Cart is empty.</p>
      ) : (
        <>
          <ul className="hrs-cart-list">
            {cart.items.map((item) => (
              <li key={item.product.id} className="hrs-cart-item">
                <span className="hrs-cart-img">{item.product.image}</span>
                <div className="hrs-cart-details">
                  <span className="hrs-cart-name">
                    {item.product.name}
                  </span>
                  <span className="hrs-cart-price">
                    ${(item.product.price * item.qty).toFixed(2)}
                  </span>
                </div>
                <div className="hrs-qty-controls">
                  <button
                    className="hrs-qty-btn"
                    onClick={() => dispatch(decrement(item.product.id))}
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="hrs-qty">{item.qty}</span>
                  <button
                    className="hrs-qty-btn"
                    onClick={() => dispatch(increment(item.product.id))}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
                <button
                  className="hrs-remove-btn"
                  onClick={() => dispatch(removeItem(item.product.id))}
                  aria-label={`Remove ${item.product.name}`}
                >
                  <FaTrash size={12} />
                </button>
              </li>
            ))}
          </ul>

          {/* Discount code */}
          <div className="hrs-discount-row">
            <FaTag size={12} />
            <input
              className="hrs-discount-input"
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={handleDiscountChange}
              onKeyDown={handleDiscountKeyDown}
            />
            <button
              className="hrs-btn hrs-apply-btn"
              onClick={handleApplyDiscount}
            >
              Apply
            </button>
          </div>
          {codeError && <p className="hrs-code-error">{codeError}</p>}

          {/* Totals */}
          <div className="hrs-totals">
            <div className="hrs-total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {cart.discount > 0 && (
              <div className="hrs-total-row hrs-discount-line">
                <span>Discount ({cart.discount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="hrs-total-row hrs-grand-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="hrs-btn hrs-clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            <FaTrash size={11} /> Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
