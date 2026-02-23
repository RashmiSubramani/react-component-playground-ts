/*
  ENTRY POINT
  -----------
  BrowserRouter wraps the entire app to enable routing.
  It uses the browser's History API (pushState) for clean URLs like /easy/accordion

  Other router types (for reference):
  - HashRouter    → URLs like /#/easy/accordion (useful when you can't configure server)
  - MemoryRouter  → No URL changes (useful for tests or React Native)
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter provides the routing context to the entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
