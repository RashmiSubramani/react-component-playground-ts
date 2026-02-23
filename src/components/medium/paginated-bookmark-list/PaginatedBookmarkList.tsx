/*
  PAGINATED BOOKMARK LIST (Filter + Pagination)
  ------------------------------------------------
  Difficulty: Easy
  Concepts: typed Article object, bookmark toggle via immutable map,
            derived filtered list, client-side pagination with slice,
            checkbox filter resets page to 1, Math.max/min page clamping

  How it works:
  1. 23 dummy articles with id, title, content, bookmarked flag
  2. Click the star to bookmark/unbookmark an article
  3. Toggle "Show only bookmarked" checkbox to filter
  4. Prev/Next pagination (5 articles per page)
  5. Changing the filter resets to page 1
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type Article = {
  id: number;
  title: string;
  content: string;
  bookmarked: boolean;
};

// ─── Constants ──────────────────────────────────────────────────────

const ARTICLES_PER_PAGE = 5;

// ─── Helpers ────────────────────────────────────────────────────────

function generateDummyArticles(count: number): Article[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Article ${i + 1}`,
    content: `This is the content of article ${i + 1}.`,
    bookmarked: false,
  }));
}

// ─── Component ──────────────────────────────────────────────────────

function PaginatedBookmarkList() {
  const [articles, setArticles] = useState<Article[]>(() =>
    generateDummyArticles(23),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  function toggleBookmark(id: number): void {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, bookmarked: !article.bookmarked }
          : article,
      ),
    );
  }

  function getFilteredArticles(): Article[] {
    return showOnlyBookmarked
      ? articles.filter((a) => a.bookmarked)
      : articles;
  }

  const filtered = getFilteredArticles();
  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = filtered.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE,
  );

  return (
    <div className="pbl-container">
      <div className="pbl-header">
        <h2>Articles</h2>

        <label className="pbl-filter-label" htmlFor="pbl-bookmark-filter">
          <input
            id="pbl-bookmark-filter"
            type="checkbox"
            checked={showOnlyBookmarked}
            onChange={() => {
              setShowOnlyBookmarked((prev) => !prev);
              setCurrentPage(1);
            }}
          />
          Show only bookmarked
        </label>
      </div>

      {currentArticles.length === 0 ? (
        <p className="pbl-empty">No articles to display.</p>
      ) : (
        currentArticles.map((article) => (
          <div key={article.id} className="pbl-card">
            <h3>
              {article.title}
              <span
                className={`pbl-star ${article.bookmarked ? "pbl-star-active" : ""}`}
                onClick={() => toggleBookmark(article.id)}
                role="button"
                aria-label={`Bookmark toggle for ${article.title}`}
              >
                ★
              </span>
            </h3>
            <p>{article.content}</p>
          </div>
        ))
      )}

      {/* Prev/Next buttons are disabled at boundaries, so no clamping needed */}
      <div className="pbl-pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedBookmarkList;
