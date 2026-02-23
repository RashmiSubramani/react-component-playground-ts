/*
  APP — ROUTE DEFINITIONS
  ========================
  This file defines ALL routes for the app.

  ┌─────────────────────────────────────────────────────────────────────┐
  │  REACT ROUTER CONCEPTS COVERED                                      │
  │                                                                     │
  │  1. BrowserRouter    → wraps app in main.tsx (uses History API)     │
  │  2. Routes / Route   → define which component renders at which URL  │
  │  3. Layout Route     → shared UI (sidebar) with <Outlet />          │
  │  4. Index Route      → default child route (renders at exact "/")   │
  │  5. Dynamic Params   → :difficulty/:component in the URL            │
  │  6. Catch-all Route  → path="*" for 404 pages                      │
  │  7. NavLink          → active-aware <a> tag (in RootLayout)         │
  │  8. Link             → client-side navigation (in HomePage)         │
  │  9. useNavigate      → programmatic navigation (in NotFound)        │
  │  10. useParams       → read URL params (in ComponentPage)           │
  │  11. Outlet          → where child routes render (in RootLayout)    │
  │  12. Suspense + lazy → code splitting / lazy loading components     │
  └─────────────────────────────────────────────────────────────────────┘

  ROUTE STRUCTURE:
  /                          → HomePage (index route)
  /:difficulty/:component    → ComponentPage (dynamic route)
  /*                         → NotFound (catch-all)
*/

import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ComponentPage from "./pages/ComponentPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    /*
      Routes = container for all Route definitions.
      React Router matches the current URL against these routes
      top-down and renders the FIRST match.
    */
    <Routes>
      {/*
        Layout Route (no "path" needed when it's the root wrapper).
        RootLayout renders the sidebar + <Outlet />.
        All child routes below render INSIDE that <Outlet />.
      */}
      <Route element={<RootLayout />}>

        {/*
          Index Route — renders when parent path matches exactly.
          URL: /
          "index" means "I'm the default child"
        */}
        <Route index element={<HomePage />} />

        {/*
          Dynamic Route — :difficulty and :component are URL PARAMETERS.
          URL examples: /easy/accordion, /medium/todo-list, /hard/data-table

          These params are accessed inside ComponentPage via useParams().
          The colon (:) prefix tells React Router "this segment is a variable".
        */}
        <Route path=":difficulty/:component" element={<ComponentPage />} />

        {/*
          Catch-all Route — matches anything not matched above.
          The "*" (splat) captures all remaining URL segments.
          MUST be last — React Router matches top-down.
        */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
