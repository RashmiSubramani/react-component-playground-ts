/*
  API PAGINATION (Offset-based with dummyjson)
  -----------------------------------------------
  Difficulty: Easy
  Concepts: typed API response (Product, ProductsApiResponse),
            offset pagination (limit + skip),
            async/await in useEffect,
            ProductCard sub-component with typed props,
            page index ↔ display number conversion

  How it works:
  - Fetches PAGE_SIZE products per page using skip = pageIndex * PAGE_SIZE
  - Re-fetches whenever currentPageNumberIndex changes (useEffect dependency)
  - Page buttons rendered from total pages count
*/

import { useState, useEffect } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type Product = {
  id: number;
  title: string;
  thumbnail: string;
};

type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ProductCardProps = {
  image: string;
  title: string;
};

// ─── Constants ────────────────────────────────────────────────────

const PAGE_SIZE = 10;

// ─── ProductCard sub-component ────────────────────────────────────

function ProductCard({ image, title }: ProductCardProps) {
  return (
    <div className="ap-card">
      <img src={image} alt={title} />
      <div className="ap-card-title">{title}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────

function ApiPagination() {
  const [products, setProducts] = useState<Product[]>([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [currentPageNumberIndex, setCurrentPageNumberIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${
          currentPageNumberIndex * PAGE_SIZE
        }`,
      );
      const json = (await response.json()) as ProductsApiResponse;

      setProducts(json.products);
      setNoOfPages(Math.ceil(json.total / PAGE_SIZE));
    }

    fetchProducts();
  }, [currentPageNumberIndex]);

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="ap-container">
      {/* Pagination Controls */}
      <div className="ap-controls">
        <button
          className="ap-nav-btn"
          disabled={currentPageNumberIndex === 0}
          onClick={() => setCurrentPageNumberIndex((prev) => prev - 1)}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(noOfPages).keys()].map((pN) => (
          <span
            key={pN}
            onClick={() => setCurrentPageNumberIndex(pN)}
            className={`ap-page-no ${pN === currentPageNumberIndex ? "ap-active" : ""}`}
          >
            {pN + 1}
          </span>
        ))}

        <button
          className="ap-nav-btn"
          disabled={currentPageNumberIndex === noOfPages - 1}
          onClick={() => setCurrentPageNumberIndex((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Product Cards */}
      <div className="ap-card-wrapper">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ApiPagination;
