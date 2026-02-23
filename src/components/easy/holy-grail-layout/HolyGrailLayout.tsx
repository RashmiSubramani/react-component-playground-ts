/*
  HOLY GRAIL LAYOUT (CSS Grid)
  ------------------------------
  Difficulty: Easy
  Concepts: CSS Grid shorthand (grid: rows / columns),
            grid-column spanning, responsive media query,
            pure layout component (no state, no props)

  The "Holy Grail" is a classic web layout:
  header (full width) | left sidebar | main content | right sidebar | footer (full width)
  Achieved here with a single CSS Grid container.
*/

import "./styles.css";

export default function HolyGrailLayout() {
  return (
    <div className="hgl-parent">
      <header className="hgl-header">Header</header>
      <div className="hgl-left">Left</div>
      <main className="hgl-main">Main</main>
      <div className="hgl-right">Right</div>
      <footer className="hgl-footer">Footer</footer>
    </div>
  );
}
