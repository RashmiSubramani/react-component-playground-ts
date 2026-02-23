/*
  404 NOT FOUND PAGE
  -------------------
  Routing concept: CATCH-ALL / WILDCARD ROUTE

  Defined as: <Route path="*" element={<NotFound />} />

  The "*" (splat/wildcard) matches ANY path that hasn't been matched
  by a more specific route. Always place it LAST in your route definitions.

  useNavigate() is used for PROGRAMMATIC navigation — navigate from code
  instead of from a <Link> click. Common uses:
  - Redirect after form submission
  - Redirect after login
  - "Go back" button
*/

import { useNavigate } from "react-router-dom";

export default function NotFound() {
  // useNavigate returns a function to navigate programmatically
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h2>404</h2>
      <p>This page doesn't exist.</p>

      <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
        {/* navigate(-1) = go back one step in history (like browser back button) */}
        <button onClick={() => navigate(-1)}>Go Back</button>

        {/* navigate("/") = go to home page */}
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );
}
