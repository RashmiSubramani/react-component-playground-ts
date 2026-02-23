/*
  HOOK: Redux Store — Shopping Cart (Same App, Redux Toolkit)
  ---------------------------------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)
  Concepts: createSlice with typed state + reducers, configureStore,
            useSelector with typed RootState, useDispatch with AppDispatch,
            PayloadAction generic, Provider scoped to component

  This is the SAME shopping cart as HookUseReducer, rebuilt with Redux Toolkit.
  Compare the two side-by-side to understand when to use each:
  - useReducer → local, component-scoped state (simpler, no setup)
  - Redux      → global, shared state across many components (more boilerplate,
                  but scales with DevTools, middleware, persistence)

  Key Redux Toolkit patterns:
  1. createSlice       — defines reducer + actions in one place (Immer under the hood)
  2. configureStore    — creates store with good defaults (thunk, devtools, serializability)
  3. useSelector       — reads store state (re-renders when selected value changes)
  4. useDispatch       — returns typed dispatch function
  5. PayloadAction<T>  — typed action payload (replaces discriminated union boilerplate)
  6. Provider scoped   — store wrapped at component level (self-contained demo)
*/

import { useState } from "react";
import { createSlice, configureStore, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
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
  discount: number;
};

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

// ─── Redux Slice ────────────────────────────────────────────────────

// createSlice combines the reducer + action creators in one declaration.
// Under the hood, Immer allows "mutating" syntax that produces immutable updates.
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], discount: 0 } as CartState,
  reducers: {
    // PayloadAction<Product> → action.payload is typed as Product
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id,
      );
      if (existing) {
        // Immer lets us mutate directly — it produces an immutable update
        existing.qty += 1;
      } else {
        state.items.push({ product: action.payload, qty: 1 });
      }
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (i) => i.product.id !== action.payload,
      );
    },

    increment(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (i) => i.product.id === action.payload,
      );
      if (item) item.qty += 1;
    },

    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (i) => i.product.id === action.payload,
      );
      if (item) item.qty = Math.max(1, item.qty - 1);
    },

    applyDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload;
    },

    clearCart(state) {
      state.items = [];
      state.discount = 0;
    },
  },
});

// Auto-generated action creators (no manual discriminated unions needed)
const { addItem, removeItem, increment, decrement, applyDiscount, clearCart } =
  cartSlice.actions;

// ─── Store ──────────────────────────────────────────────────────────

// configureStore: sets up Redux DevTools + thunk middleware automatically
const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

// Typed hooks — avoids casting on every useSelector/useDispatch call
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// ─── Cart UI (consumes store via hooks) ─────────────────────────────

function CartApp() {
  // useSelector: reads a slice of the store. Component re-renders when this value changes.
  const cart = useSelector((state: RootState) => state.cart);
  // useDispatch: returns the typed dispatch function
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
    <div className="hrs-container">
      <h2>Hook: Redux Store</h2>
      <p className="hrs-subtitle">
        Same Shopping Cart — powered by Redux Toolkit (createSlice + configureStore)
      </p>

      <div className="hrs-layout">
        {/* ── Product catalog ── */}
        <div className="hrs-catalog">
          <h3 className="hrs-section-title">Products</h3>
          <div className="hrs-products">
            {CATALOG.map((product) => {
              const inCart = cart.items.find(
                (i) => i.product.id === product.id,
              );
              return (
                <div key={product.id} className="hrs-product">
                  <span className="hrs-product-img">{product.image}</span>
                  <div className="hrs-product-info">
                    <span className="hrs-product-name">{product.name}</span>
                    <span className="hrs-product-price">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="hrs-btn hrs-add-btn"
                    onClick={() => dispatch(addItem(product))}
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
      </div>
    </div>
  );
}

// ─── Wrapper: scoped Provider ───────────────────────────────────────

// The Provider is scoped to THIS component only — the Redux store
// doesn't leak into the rest of the app. In a real app you'd wrap
// Provider around your entire <App /> in main.tsx instead.
function HookReduxStore() {
  return (
    <Provider store={store}>
      <CartApp />
    </Provider>
  );
}

export default HookReduxStore;
