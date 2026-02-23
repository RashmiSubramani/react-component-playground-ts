/*
  IMAGE SLIDER
  -------------
  Difficulty: Easy
  Concepts: useState<number>, useEffect with setInterval + cleanup,
            circular index logic, auto-play with clearInterval

  Two versions included:
  1. ImageSlider (default) — basic slider with Prev/Next arrows + auto-play
  2. ImageSliderWithTransition (below) — adds slide animation via CSS keyframes
     + direction state typed as union literal "next" | "prev"
*/

import { useState, useEffect } from "react";
import "./styles.css";

// Image URLs used by both versions
const images: string[] = [
  "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  "https://piktochart.com/wp-content/uploads/2023/04/large-29.jpg",
  "https://i.pinimg.com/originals/2b/66/01/2b66016d5a1e2d230ecce59f8e673382.png",
  "https://i.pinimg.com/736x/5f/09/47/5f0947219a7f446e804e7e0055089fad.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKMpEfmuwzKmwyl4reX0NW7-Ixgn1DCz6IvxSYpq_CQ&s",
];

// ─── Version 1: Basic Image Slider ──────────────────────────────

export default function ImageSlider() {
  const [active, setActive] = useState(0);

  // Circular: last index → wrap to 0
  const loadNextImage = () => {
    setActive((prev) => (prev + 1 > images.length - 1 ? 0 : prev + 1));
  };

  // Circular: index 0 → wrap to last
  const loadPrevImage = () => {
    setActive((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  // Auto-play: advance every 3 seconds, cleanup on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      loadNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="sliderContainer">
        <img
          onClick={loadPrevImage}
          className="arrowBtn arrowLeft"
          alt="left arrow"
          src="https://cdn0.iconfinder.com/data/icons/glyphpack/26/nav-arrow-left-512.png"
        />
        <img className="sliderImage" src={images[active]} alt="wallpaper" />
        <img
          onClick={loadNextImage}
          className="arrowBtn arrowRight"
          alt="right arrow"
          src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
        />
      </div>
    </div>
  );
}

// ─── Version 2: With Slide Transition ────────────────────────────
// Direction typed as union literal — only "next" or "prev" allowed

type SlideDirection = "next" | "prev";

export function ImageSliderWithTransition() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("next");

  const loadNextImage = () => {
    setDirection("next");
    setActive((prev) => (prev + 1 > images.length - 1 ? 0 : prev + 1));
  };

  const loadPrevImage = () => {
    setDirection("prev");
    setActive((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sliderContainerOverflow">
      {/* Sliding wrapper — key={active} forces re-mount to restart animation */}
      <div
        key={active}
        className={`slideWrapper ${
          direction === "next" ? "animate-slide-next" : "animate-slide-prev"
        }`}
      >
        <img className="sliderImageFull" src={images[active]} alt="slide" />
      </div>

      {/* Left Arrow */}
      <img
        onClick={loadPrevImage}
        className="arrowBtn arrowLeft"
        src="https://cdn0.iconfinder.com/data/icons/glyphpack/26/nav-arrow-left-512.png"
        alt="left arrow"
      />

      {/* Right Arrow */}
      <img
        onClick={loadNextImage}
        className="arrowBtn arrowRight"
        src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
        alt="right arrow"
      />
    </div>
  );
}
