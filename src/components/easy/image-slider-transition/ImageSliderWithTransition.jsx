import { useState, useEffect } from "react";
import "./styles.css";

export const ImageSliderWithTransition = () => {
  const images = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://piktochart.com/wp-content/uploads/2023/04/large-29.jpg",
    "https://i.pinimg.com/originals/2b/66/01/2b66016d5a1e2d230ecce59f8e673382.png",
    "https://i.pinimg.com/736x/5f/09/47/5f0947219a7f446e804e7e0055089fad.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKMpEfmuwzKmwyl4reX0NW7-Ixgn1DCz6IvxSYpq_CQ&s",
  ];
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next"); // ⬅ added

  useEffect(() => {
    const interval = setInterval(() => {
      loadNextImage(); // automatically load next image after 3 seconds
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const loadNextImage = () => {
    setDirection("next");
    setActive((active) => (active + 1 > images.length - 1 ? 0 : active + 1)); //If we are in last index, when we click next, we should go to first image
  };
  const loadPrevImage = () => {
    setDirection("prev");
    setActive((active) => (active - 1 < 0 ? images.length - 1 : active - 1)); // If we are in first image and we click left, we need to go to last image
  };

  return (
    <div className="relative w-[800px] mx-auto overflow-hidden">
      {/* Sliding Wrapper */}
      <div
        key={active}
        className={`transition-all duration-700 transform ${
          direction === "next"
            ? "translate-x-0 animate-slide-next"
            : "translate-x-0 animate-slide-prev"
        }`}
      >
        <img className="w-full rounded-lg" src={images[active]} alt="slide" />
      </div>

      {/* Left Arrow */}
      <img
        onClick={loadPrevImage}
        className="absolute top-1/2 left-2 -translate-y-1/2 w-14 h-14 cursor-pointer bg-white/60 p-2 rounded-full shadow"
        src="https://cdn0.iconfinder.com/data/icons/glyphpack/26/nav-arrow-left-512.png"
        alt="left arrow"
      />

      {/* Right Arrow */}
      <img
        onClick={loadNextImage}
        className="absolute top-1/2 right-2 -translate-y-1/2 w-14 h-14 cursor-pointer bg-white/60 p-2 rounded-full shadow"
        src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
        alt="right arrow"
      />
    </div>
  );
};

/* <div
  className={`slide slide-transition ${
    direction === "next" ? "slide-next" : "slide-prev"
  }`}
>

.slide {
  transform: translateX(0);
}

.slide-transition {
  transition: all 700ms ease;
} */

/* Next slide animation */
// .slide-next {
//   animation: slideNext 700ms ease;
// }

/* Previous slide animation */
// .slide-prev {
//   animation: slidePrev 700ms ease;
// }

// @keyframes slideNext {
//   from {
//     transform: translateX(100%);
//   }
//   to {
//     transform: translateX(0);
//   }
// }

// @keyframes slidePrev {
//   from {
//     transform: translateX(-100%);
//   }
//   to {
//     transform: translateX(0);
//   }
// }
