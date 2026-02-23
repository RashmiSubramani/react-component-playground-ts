/*
  HOOK: useEffect — Product Explorer (Fetch + Debounce Search + Sort + Filter)
  -------------------------------------------------------------------------------
  Category: Advanced Topics (React Hooks Deep Dive)
  Concepts: useEffect for API fetch, cleanup with AbortController,
            debounced search via setTimeout + cleanup, multiple independent effects,
            dependency array patterns, loading/error state

  Patterns demonstrated:
  1. Effect with empty deps []       — fetch data on mount
  2. Effect with deps [query]        — debounced search (setTimeout + cleanup)
  3. Cleanup function                — AbortController to cancel stale fetches,
                                       clearTimeout for debounce
  4. Multiple effects in one component — separation of concerns
  5. Effect dependency pitfalls      — comments explain WHY each dep is needed
*/

import { useState, useEffect } from "react";
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaFilter, FaSpinner } from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
};

type ApiResponse = {
  products: Product[];
};

type SortField = "title" | "price" | "rating";
type SortOrder = "asc" | "desc";

// ─── Component ──────────────────────────────────────────────────────

function HookUseEffect() {
  // ── State ──
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterCategory, setFilterCategory] = useState("all");

  // ChangeEvent<HTMLInputElement> — typed event from the search input
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  // ChangeEvent<HTMLSelectElement> — typed event from the category filter
  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilterCategory(e.target.value);
  }

  // ChangeEvent<HTMLSelectElement> — typed event from the sort field select
  function handleSortFieldChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortField(e.target.value as SortField);
  }

  // ── Pattern 1: Effect with empty deps — fetch on mount ──
  // Runs ONCE when the component mounts.
  // The AbortController lets us cancel the fetch if the component
  // unmounts before the response arrives (prevents state updates on unmounted components).
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts(): Promise<void> {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://dummyjson.com/products?limit=30&select=id,title,description,price,category,thumbnail,rating",
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: ApiResponse = await res.json();
        setProducts(data.products);
      } catch (err: unknown) {
        // AbortError is expected when we cancel — don't treat it as an error
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    // Cleanup: cancel the fetch if component unmounts
    return () => controller.abort();
  }, []); // Empty deps → runs once on mount

  // ── Pattern 2: Effect with deps — debounced search ──
  // Every time searchQuery changes, we START a 400ms timer.
  // If searchQuery changes again before the timer fires, the
  // cleanup function clears the old timer (debounce!).
  // This prevents firing a search on every single keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    // Cleanup: clear the timer if searchQuery changes before it fires
    return () => clearTimeout(timer);
  }, [searchQuery]); // Re-runs whenever searchQuery changes

  // ── Pattern 3: Effect for document title sync ──
  // Keeps the browser tab title in sync with the result count.
  // Separate from the other effects — each effect handles ONE concern.
  useEffect(() => {
    const count = getFilteredAndSorted().length;
    document.title = `Products (${count})`;

    // Cleanup: restore original title on unmount
    return () => {
      document.title = "Building Components";
    };
  }); // No deps → runs after EVERY render (title always reflects current count)

  // ── Derived data: filter + sort (pure computation, no effect needed) ──
  function getFilteredAndSorted(): Product[] {
    let result = products;

    // Filter by category
    if (filterCategory !== "all") {
      result = result.filter((p) => p.category === filterCategory);
    }

    // Filter by debounced search query
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      let cmp: number;
      if (sortField === "title") {
        cmp = a.title.localeCompare(b.title);
      } else if (sortField === "price") {
        cmp = a.price - b.price;
      } else {
        cmp = a.rating - b.rating;
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }

  // ── Extract unique categories from fetched data ──
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  const displayed = getFilteredAndSorted();

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div className="hue-container">
      <h2>Hook: useEffect</h2>
      <p className="hue-subtitle">
        Product Explorer — API fetch, debounced search, sort &amp; filter
      </p>

      {/* ── Controls ── */}
      <div className="hue-controls">
        {/* Search with debounce */}
        <div className="hue-search">
          <FaSearch size={14} className="hue-search-icon" />
          <input
            className="hue-input"
            type="text"
            placeholder="Search products... (debounced 400ms)"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="hue-filters-row">
          {/* Category filter */}
          <div className="hue-filter">
            <FaFilter size={12} />
            <select
              className="hue-select"
              value={filterCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort field */}
          <div className="hue-filter">
            <select
              className="hue-select"
              value={sortField}
              onChange={handleSortFieldChange}
            >
              <option value="title">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Sort order toggle */}
          <button
            className="hue-sort-btn"
            onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
            aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
          >
            {sortOrder === "asc" ? <FaSortAmountUp size={14} /> : <FaSortAmountDown size={14} />}
          </button>
        </div>
      </div>

      {/* ── Loading / Error / Empty ── */}
      {loading && (
        <div className="hue-status">
          <FaSpinner size={20} className="hue-spinner" /> Loading products...
        </div>
      )}

      {error && <div className="hue-error">Error: {error}</div>}

      {!loading && !error && displayed.length === 0 && (
        <p className="hue-empty">No products match your search.</p>
      )}

      {/* ── Product cards ── */}
      {!loading && !error && displayed.length > 0 && (
        <>
          <p className="hue-count">
            Showing {displayed.length} of {products.length} products
          </p>

          <div className="hue-grid">
            {displayed.map((product) => (
              <div key={product.id} className="hue-card">
                <img
                  className="hue-thumb"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="hue-card-body">
                  <h4 className="hue-card-title">{product.title}</h4>
                  <span className="hue-category">{product.category}</span>
                  <p className="hue-desc">{product.description}</p>
                  <div className="hue-card-footer">
                    <span className="hue-price">${product.price.toFixed(2)}</span>
                    <span className="hue-rating">★ {product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HookUseEffect;
