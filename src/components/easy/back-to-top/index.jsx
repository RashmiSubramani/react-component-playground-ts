import { useEffect, useState } from "react";
import "./styles.css";

function BackToTop() {
  // Controls visibility of the button
  const [isVisible, setIsVisible] = useState(false);

  /* ----------------------------------------
     Scroll Listener
     - Show button after scrolling 400px
     - Cleanup on unmount
  ---------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup to prevent memory leaks
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ----------------------------------------
     Scroll to top handler
  ---------------------------------------- */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="backToTop">
      <h1>Back To Top</h1>

      {/* Dummy content to enable scrolling */}
      {[...Array(40)].map((_, i) => (
        <p key={i}>This is a paragraph {i + 1}</p>
      ))}

      <div className="container">
        {isVisible && (
          <button
            className="backtotop-btn"
            onClick={scrollToTop}
            data-testid="back-to-top-btn"
          >
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
}

export default BackToTop;
