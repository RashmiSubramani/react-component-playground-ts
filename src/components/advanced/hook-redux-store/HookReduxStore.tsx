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

import { Provider } from "react-redux";
import store from "./store";
import ProductCatalog from "./ProductCatalog";
import CartPanel from "./CartPanel";
import "./styles.css";

// ─── Wrapper: scoped Provider ───────────────────────────────────────

// The Provider is scoped to THIS component only — the Redux store
// doesn't leak into the rest of the app. In a real app you'd wrap
// Provider around your entire <App /> in main.tsx instead.
function HookReduxStore() {
  return (
    <Provider store={store}>
      <div className="hrs-container">
        <h2>Hook: Redux Store</h2>
        <p className="hrs-subtitle">
          Same Shopping Cart — powered by Redux Toolkit (createSlice + configureStore)
        </p>
        <div className="hrs-layout">
          <ProductCatalog />
          <CartPanel />
        </div>
      </div>
    </Provider>
  );
}

export default HookReduxStore;
