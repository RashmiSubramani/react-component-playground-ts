import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ─── Types ──────────────────────────────────────────────────────────

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  discount: number;
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
export const { addItem, removeItem, increment, decrement, applyDiscount, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
