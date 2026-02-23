/*
  HOOK: useReducer — Shopping Cart
  -----------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)
  Concepts: discriminated union action types, typed reducer function,
            lazy initializer (3rd arg), exhaustive switch, complex state transitions

  Patterns demonstrated:
  1. Discriminated union actions — each action has a unique `type` string + typed payload
  2. Typed reducer              — (state, action) => state with exhaustive switch
  3. Lazy initializer           — useReducer(reducer, arg, initFn) — 3rd arg runs once
  4. Complex transitions        — increment existing qty vs add new item, discount logic
  5. Derived values             — totals computed OUTSIDE reducer, not stored in state
  6. When to prefer useReducer  — multiple related state transitions that depend on previous state
*/

import { useReducer, useState } from "react";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaTag } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  discount: number; // percentage (0–100)
};

// ── Discriminated union: every action has a unique `type` + typed payload ──
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }      // product id
  | { type: "INCREMENT"; payload: number }         // product id
  | { type: "DECREMENT"; payload: number }         // product id
  | { type: "APPLY_DISCOUNT"; payload: number }    // percentage
  | { type: "CLEAR_CART" };

// ─── Constants ──────────────────────────────────────────────────────

const CATALOG: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "🎧" },
  { id: 2, name: "Mechanical Keyboard", price: 89.99, image: "⌨️" },
  { id: 3, name: "USB-C Hub", price: 34.99, image: "🔌" },
  { id: 4, name: "Webcam HD", price: 49.99, image: "📷" },
  { id: 5, name: "Mouse Pad XL", price: 19.99, image: "🖱️" },
  { id: 6, name: "Monitor Light", price: 39.99, image: "💡" },
];

const VALID_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  HALF: 50,
};

// ─── Reducer ────────────────────────────────────────────────────────

// Lazy initializer: runs ONCE to build the initial state.
// Useful when initial state needs computation (e.g. reading localStorage).
function initCart(_arg: null): CartState {
  return { items: [], discount: 0 };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        // Already in cart → increment qty
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, qty: i.qty + 1 }
              : i,
          ),
        };
      }
      // New item → add with qty 1
      return {
        ...state,
        items: [...state.items, { product: action.payload, qty: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload
            ? { ...i, qty: i.qty + 1 }
            : i,
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload
            ? { ...i, qty: Math.max(1, i.qty - 1) }
            : i,
        ),
      };

    case "APPLY_DISCOUNT":
      return { ...state, discount: action.payload };

    case "CLEAR_CART":
      return { items: [], discount: 0 };

    default: {
      // Exhaustive check: if we forget an action type, TypeScript errors here
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

// ─── Component ──────────────────────────────────────────────────────

function HookUseReducer() {
  // Pattern 3: Lazy initializer — useReducer(reducer, initialArg, initFunction)
  // `initCart` receives `null` and returns the initial CartState.
  // This is useful when init is expensive (e.g. parsing localStorage).
  const [cart, dispatch] = useReducer(cartReducer, null, initCart);
  const [discountCode, setDiscountCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // ── Derived values (computed, NOT in state) ──
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
      dispatch({ type: "APPLY_DISCOUNT", payload: VALID_CODES[code] });
      setCodeError("");
      setDiscountCode("");
    } else {
      setCodeError("Invalid code. Try SAVE10, SAVE20, or HALF.");
    }
  }

  return (
    <div className="hurd-container">
      <h2>Hook: useReducer</h2>
      <p className="hurd-subtitle">
        Shopping Cart — discriminated unions, typed reducer, lazy init
      </p>

      <div className="hurd-layout">
        {/* ── Product catalog ── */}
        <div className="hurd-catalog">
          <h3 className="hurd-section-title">Products</h3>
          <div className="hurd-products">
            {CATALOG.map((product) => {
              const inCart = cart.items.find((i) => i.product.id === product.id);
              return (
                <div key={product.id} className="hurd-product">
                  <span className="hurd-product-img">{product.image}</span>
                  <div className="hurd-product-info">
                    <span className="hurd-product-name">{product.name}</span>
                    <span className="hurd-product-price">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="hurd-btn hurd-add-btn"
                    onClick={() =>
                      dispatch({ type: "ADD_ITEM", payload: product })
                    }
                  >
                    <FaPlus size={10} />
                    {inCart ? `In Cart (${inCart.qty})` : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Cart ── */}
        <div className="hurd-cart">
          <h3 className="hurd-section-title">
            <FaShoppingCart size={14} /> Cart ({totalItems})
          </h3>

          {cart.items.length === 0 ? (
            <p className="hurd-empty">Cart is empty.</p>
          ) : (
            <>
              <ul className="hurd-cart-list">
                {cart.items.map((item) => (
                  <li key={item.product.id} className="hurd-cart-item">
                    <span className="hurd-cart-img">{item.product.image}</span>
                    <div className="hurd-cart-details">
                      <span className="hurd-cart-name">
                        {item.product.name}
                      </span>
                      <span className="hurd-cart-price">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                    <div className="hurd-qty-controls">
                      <button
                        className="hurd-qty-btn"
                        onClick={() =>
                          dispatch({
                            type: "DECREMENT",
                            payload: item.product.id,
                          })
                        }
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="hurd-qty">{item.qty}</span>
                      <button
                        className="hurd-qty-btn"
                        onClick={() =>
                          dispatch({
                            type: "INCREMENT",
                            payload: item.product.id,
                          })
                        }
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <button
                      className="hurd-remove-btn"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_ITEM",
                          payload: item.product.id,
                        })
                      }
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <FaTrash size={12} />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Discount code */}
              <div className="hurd-discount-row">
                <FaTag size={12} />
                <input
                  className="hurd-discount-input"
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={handleDiscountChange}
                  onKeyDown={handleDiscountKeyDown}
                />
                <button
                  className="hurd-btn hurd-apply-btn"
                  onClick={handleApplyDiscount}
                >
                  Apply
                </button>
              </div>
              {codeError && <p className="hurd-code-error">{codeError}</p>}

              {/* Totals */}
              <div className="hurd-totals">
                <div className="hurd-total-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="hurd-total-row hurd-discount-line">
                    <span>Discount ({cart.discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="hurd-total-row hurd-grand-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="hurd-btn hurd-clear-btn"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                <FaTrash size={11} /> Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HookUseReducer;
