/*
  COMPONENT PAGE
  ---------------
  Routing concept: useParams — READ DYNAMIC URL PARAMETERS

  When the URL is /easy/accordion:
    useParams() returns { difficulty: "easy", component: "accordion" }

  We use these params to look up the correct component from the registry
  and render it with React.lazy + Suspense for code splitting.

  Routing concept: Suspense
  React.lazy() returns a component that loads asynchronously.
  Suspense shows a fallback UI while the component's code is being downloaded.
  This means each component's JS is only loaded when you navigate to it,
  NOT all 50+ components at once on initial page load.
*/

import { Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { componentRegistry, type Difficulty } from "../routes/componentRegistry";

export default function ComponentPage() {
  // useParams extracts :difficulty and :component from the URL
  const { difficulty, component } = useParams<{
    difficulty: Difficulty;
    component: string;
  }>();

  // Find the matching component from our registry
  const entry = componentRegistry.find(
    (c) => c.difficulty === difficulty && c.path === component,
  );

  // If no match found, redirect to 404
  // Navigate component = declarative redirect (vs useNavigate which is imperative)
  if (!entry) {
    return <Navigate to="/404" replace />;
  }

  const LazyComponent = entry.component;

  return (
    <div>
      {/* Component header with metadata */}
      <div style={{ marginBottom: 24 }}>
        <h2>{entry.name}</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
          <span style={{
            padding: "2px 10px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
            background:
              entry.difficulty === "easy" ? "#d4edda" :
              entry.difficulty === "medium" ? "#fff3cd" :
              entry.difficulty === "hard" ? "#f8d7da" : "#e8daef",
            color:
              entry.difficulty === "easy" ? "#155724" :
              entry.difficulty === "medium" ? "#856404" :
              entry.difficulty === "hard" ? "#721c24" : "#6c3483",
          }}>
            {entry.difficulty.toUpperCase()}
          </span>
          {entry.concepts.map((c) => (
            <span key={c} className="concept-tag">{c}</span>
          ))}
        </div>
      </div>

      {/*
        Suspense wraps the lazy-loaded component.
        While the component's chunk is downloading, "Loading..." is shown.
        Once loaded, the actual component renders.
      */}
      <Suspense fallback={<p>Loading component...</p>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
