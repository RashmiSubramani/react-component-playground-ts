import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// ─── Store ──────────────────────────────────────────────────────────

// configureStore: sets up Redux DevTools + thunk middleware automatically
const store = configureStore({
  reducer: { cart: cartReducer },
});

// Typed hooks — avoids casting on every useSelector/useDispatch call
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
