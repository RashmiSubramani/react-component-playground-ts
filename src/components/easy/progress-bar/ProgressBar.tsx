/*
  PROGRESS BAR
  -------------
  Difficulty: Easy
  Concepts: typing props, useState<number>, useEffect with cleanup-free timeout,
            inline styles with CSSProperties, ARIA accessibility attributes

  Steps to build:
  i)   Create UI — outer and inner containers
  ii)  Give dynamic width via transform: `translateX(${percentage - 100}%)`
  iii) Edge case: low percentages need dark text — color: percentage < 5 ? "black" : "white"
  iv)  Accessibility — role="progressbar" + aria-* attributes
  v)   Animation — translateX + CSS transition for smooth fill
  vi)  Since translateX shifts the bar left, text-align: right pushes content to the visible end
  vii) Initially animatedProgress = 0, after 100ms it's set to the real value → triggers transition
*/

import { useEffect, useState } from "react";
import "./styles.css";

// ─── Props type for the individual Progress bar ────────────────
type ProgressProps = {
  percentage: number;
};

// Demo component showing multiple progress bars at different percentages
export default function ProgressBar() {
  const bars: number[] = [
    1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100,
  ];

  return (
    <>
      {bars.map((bar, index) => (
        <Progress percentage={bar} key={index} />
      ))}
    </>
  );
}

// Individual progress bar component
function Progress({ percentage }: ProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState<number>(0);

  // Initially animatedProgress is 0; after 100ms delay it's set to the real
  // value, which triggers the CSS transition for a smooth fill animation
  useEffect(() => {
    setTimeout(() => setAnimatedProgress(percentage), 100);
  }, [percentage]);

  return (
    <div className="wrapper">
      {/* Outer container — defines progress bar boundaries */}
      <div className="outer">
        {/* Inner container — fills based on percentage with smooth animation */}
        <div
          className="inner"
          style={{
            // width: `${percentage}%`, //If we use animatedProgress here, it is not a performant way as browser needs to repaint again and again. So to do in better way, use animations. and ui will not jitter when you use animation
            transform: `translateX(${animatedProgress - 100}%)`, // translateX(-25%) moves the bar 25% left → visually shows 75% filled
            color: animatedProgress < 5 ? "black" : "white", // Dark text for low percentages
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
}
