/*
  IMAGE CAROUSEL (Prev/Next + Dot Indicators)
  ----------------------------------------------
  Difficulty: Easy
  Concepts: typed Image object, circular index wrapping,
            conditional rendering via active index,
            dot indicators with active state

  How it works:
  1. Shows one image at a time from a typed array
  2. Prev/Next buttons wrap around circularly
  3. Dot indicators show current position and allow direct navigation
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type CarouselImage = {
  src: string;
  alt: string;
};

// ─── Data ───────────────────────────────────────────────────────────

const images: CarouselImage[] = [
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel1.jpg",
    alt: "Nature",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel2.jpg",
    alt: "Beach",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel3.jpg",
    alt: "Yak",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel4.jpg",
    alt: "Hay",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel5.jpg",
    alt: "Plants",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel6.jpg",
    alt: "Building",
  },
];

// ─── Component ──────────────────────────────────────────────────────

function ImageCarousel() {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div>No images available.</div>;
  }

  function goPrev(): void {
    setActive((i) => (i - 1 < 0 ? images.length - 1 : i - 1));
  }

  function goNext(): void {
    setActive((i) => (i + 1 > images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="ic-carousel">
      <button className="ic-btn ic-prev" onClick={goPrev}>
        Prev
      </button>

      <img
        className="ic-image"
        src={images[active].src}
        alt={images[active].alt}
      />

      <button className="ic-btn ic-next" onClick={goNext}>
        Next
      </button>

      <div className="ic-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`ic-dot ${active === index ? "ic-dot-active" : ""}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
