/*
  Autocomplete / Typeahead — Debounced API search with keyboard navigation
  -------------------------------------------------------------------------
  Category: Medium

  Concepts:
  1. Debounced API call (setTimeout + cleanup in useEffect)
  2. Keyboard navigation (ArrowUp / ArrowDown / Enter / Escape)
  3. Highlight matched text in suggestions
  4. Click-outside to close dropdown (useRef + useEffect)
  5. Loading / no-results states
*/

import { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./styles.css";

// ─── Types ─────────────────────────────────────────────────────────

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

type ApiResponse = {
  products: Product[];
};

// ─── Highlight matched text ────────────────────────────────────────

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="ac-highlight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

// ─── Component ─────────────────────────────────────────────────────

function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Product | null>(null);
  const [focused, setFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * NOTE :
    Technically, you could try to derive the dropdown visibility just from results (e.g., results.length > 0), but it won’t fully cover all UX cases cleanly. Here’s why:

    1️⃣ When results alone is not enough
    User presses Escape → You want the dropdown to close, but results still exists.
    User clicks outside → Dropdown should hide, but results still has items.
    Input is empty → results might be empty, but you might want dropdown closed even if a previous search had results.
    So if you rely only on results, you lose control over visibility events like:
    Escape key
    Click outside
    Focus / blur behavior
   */

  // ── Debounced API fetch ──
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setActiveIndex(-1);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=8`,
        );
        if (!res.ok) throw new Error("fetch failed");
        const data: ApiResponse = await res.json();
        setResults(data.products);
        setIsOpen(data.products.length > 0 || query.trim().length > 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // ── Click outside to close ──
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Scroll active option into view ──
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const options = listRef.current.querySelectorAll<HTMLElement>(".ac-option");
    if (options[activeIndex]) {
      options[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // ── Select an item ──
  const selectItem = useCallback((product: Product) => {
    setSelected(product);
    setQuery(product.title);
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  // ── Clear ──
  const handleClear = useCallback(() => {
    setQuery("");
    setSelected(null);
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  // ChangeEvent<HTMLInputElement> — typed event from the search input
  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setSelected(null);
  }

  // ── Keyboard navigation ──
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if (e.key === "ArrowDown" && results.length > 0) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          selectItem(results[activeIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  return (
    <div className="ac-container">
      <h2>Autocomplete</h2>
      <p className="ac-subtitle">
        Debounced API search, keyboard navigation, highlight matched text
      </p>

      {/* Search input + dropdown */}
      <div className="ac-wrapper" ref={wrapperRef}>
        <div
          className={`ac-input-row ${focused ? "ac-input-row-focused" : ""}`}
        >
          <FaSearch className="ac-search-icon" size={13} />
          <input
            ref={inputRef}
            className="ac-input"
            placeholder="Search products…"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => {
              setFocused(true);
              if (results.length > 0 && query.trim()) setIsOpen(true);
            }}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
          />
          {loading && <span className="ac-spinner" />}
          {query && !loading && (
            <button
              className="ac-clear-btn"
              onClick={handleClear}
              aria-label="Clear"
            >
              <FaTimes size={13} />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div ref={listRef} className="ac-dropdown" role="listbox">
            {results.length === 0 && !loading ? (
              <div className="ac-no-results">No results for "{query}"</div>
            ) : (
              results.map((product, i) => (
                <div
                  key={product.id}
                  className={`ac-option ${i === activeIndex ? "ac-option-active" : ""}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent blur before click
                    selectItem(product);
                  }}
                >
                  <img
                    className="ac-option-img"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  <div className="ac-option-info">
                    <div className="ac-option-name">
                      <HighlightMatch text={product.title} query={query} />
                    </div>
                    <div className="ac-option-category">{product.category}</div>
                  </div>
                  <span className="ac-option-price">${product.price}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Selected product card */}
      {selected && (
        <div className="ac-selected">
          <img
            className="ac-selected-img"
            src={selected.thumbnail}
            alt={selected.title}
          />
          <div className="ac-selected-info">
            <p className="ac-selected-name">{selected.title}</p>
            <p className="ac-selected-meta">{selected.category}</p>
          </div>
          <span className="ac-selected-price">${selected.price}</span>
        </div>
      )}

      <p className="ac-hint">
        Try "phone", "laptop", "shirt" — use Arrow keys + Enter to select
      </p>
    </div>
  );
}

export default Autocomplete;
