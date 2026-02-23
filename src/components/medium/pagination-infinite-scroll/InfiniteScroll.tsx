/*
  Infinite Scroll — IntersectionObserver + Paginated API
  --------------------------------------------------------
  Category: Medium

  Concepts:
  1. IntersectionObserver API — watch a sentinel element at the bottom
  2. useRef<HTMLDivElement>(null) — attach observer to sentinel
  3. useCallback for stable fetch function
  4. Pagination via skip/limit (dummyjson.com)
  5. Cleanup — disconnect observer on unmount
*/

import { useState, useEffect, useRef, useCallback } from "react";
import { FaRedo } from "react-icons/fa";
import "./styles.css";

// ─── Types ─────────────────────────────────────────────────────────

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// ─── Constants ─────────────────────────────────────────────────────

const PAGE_SIZE = 10;
const API_BASE = "https://dummyjson.com/products";

// ─── Component ─────────────────────────────────────────────────────

function InfiniteScroll() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Track current skip value — useRef so it doesn't trigger re-renders
  const skipRef = useRef(0);
  // Sentinel element that the observer watches
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ── Fetch next page ──
  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE}?limit=${PAGE_SIZE}&skip=${skipRef.current}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: ApiResponse = await res.json();

      setProducts((prev) => [...prev, ...data.products]);
      skipRef.current += data.products.length;

      // No more items when we've loaded everything
      if (skipRef.current >= data.total) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // ── IntersectionObserver — fires fetchMore when sentinel is visible ──
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When the sentinel scrolls into view, load more
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchMore]);

  return (
    <div className="is-container">
      <h2>Infinite Scroll</h2>
      <p className="is-subtitle">
        IntersectionObserver — loads more products as you scroll down
      </p>

      <div className="is-list">
        {products.map((p) => (
          <div key={p.id} className="is-card">
            <img className="is-card-img" src={p.thumbnail} alt={p.title} />
            <div className="is-card-body">
              <p className="is-card-title">{p.title}</p>
              <p className="is-card-desc">{p.description}</p>
            </div>
            <span className="is-card-price">${p.price}</span>
          </div>
        ))}
      </div>

      {/* Sentinel — observer watches this element */}
      <div ref={sentinelRef} className="is-sentinel" />

      {loading && (
        <div className="is-loader">
          <span className="is-spinner" />
          Loading more…
        </div>
      )}

      {error && (
        <div className="is-error">
          <p>Error: {error}</p>
          <button className="is-retry-btn" onClick={fetchMore}>
            <FaRedo size={10} /> Retry
          </button>
        </div>
      )}

      {!hasMore && (
        <p className="is-end">All {products.length} products loaded.</p>
      )}

      {products.length > 0 && hasMore && (
        <p className="is-count">{products.length} loaded</p>
      )}
    </div>
  );
}

export default InfiniteScroll;
