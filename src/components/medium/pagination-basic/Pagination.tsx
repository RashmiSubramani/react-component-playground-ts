/*
  PAGINATION (Offset / API-based) — asked in Interviews
  -------------------------------------------------------
  Difficulty: Medium
  Concepts: typing API response (ProductsApiResponse), useState<Product[]>,
            async/await with typed fetch, offset calculation,
            conditional rendering for Prev/Next edge cases

  How offset pagination works:
  | currentPageNumberIndex | skip          | UI page |
  | ---------------------- | ------------- | ------- |
  | 0                      | 0 * 10 = 0    | Page 1  |
  | 1                      | 1 * 10 = 10   | Page 2  |
  | 2                      | 2 * 10 = 20   | Page 3  |

  Steps:
  i)    Fetch products with limit + skip query params
  ii)   Add pagination UI (Prev / page numbers / Next)
  iii)  Highlight current page
  iv)   Edge cases: hide Prev on first page, hide Next on last page
*/

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { type Product, type ProductsApiResponse } from "./types";
import "./styles.css";

const LIMIT_PER_PAGE = 10;

// Single state object — one setState call instead of two, avoids cascading renders
type PageData = {
  products: Product[];
  total: number;
};

export default function Pagination() {
  const [currentPageNumberIndex, setCurrentPageNumberIndex] = useState(0);
  const [pageData, setPageData] = useState<PageData>({
    products: [],
    total: 0,
  });

  // Derived value — computed from state, NOT stored in state
  const noOfPages = Math.ceil(pageData.total / LIMIT_PER_PAGE);

  useEffect(() => {
    async function fetchProducts() {
      const data = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT_PER_PAGE}&skip=${
          currentPageNumberIndex * LIMIT_PER_PAGE
        }`,
      );
      // Typed API response — gives autocomplete for .products, .total, etc.
      const json: ProductsApiResponse = await data.json();
      // Single setState — no cascading renders
      setPageData({ products: json.products, total: json.total });
    }

    fetchProducts();
  }, [currentPageNumberIndex]);

  return (
    <div>
      <div className="productsGrid">
        {pageData.products.map((product) => {
          const { id, title, discountPercentage, price, thumbnail } = product;
          return (
            <ProductCard
              key={id}
              id={id}
              title={title}
              price={price}
              thumbnail={thumbnail}
              discountPercentage={discountPercentage}
            />
          );
        })}
      </div>

      <div className="paginationControls">
        {/* Prev — hidden on first page to prevent skip = -10 (invalid) */}
        {currentPageNumberIndex > 0 && (
          <span
            className="navButton"
            onClick={() => setCurrentPageNumberIndex((prev) => prev - 1)}
          >
            Prev
          </span>
        )}

        {/* Page numbers */}
        {[...Array(noOfPages).keys()].map((pN) => (
          <span
            className={`pageNumber ${pN === currentPageNumberIndex ? "pageNumberActive" : ""}`}
            key={pN}
            onClick={() => setCurrentPageNumberIndex(pN)}
          >
            {/* +1 because currentPageNumberIndex is 0-based but UI shows 1-based */}
            {pN + 1}
          </span>
        ))}

        {/* Next — hidden on last page to prevent skip beyond total
        noOfPages - 1 - because we are using 0 indexing - prevents overflow
        
        noOfPages = 5          // pages: 0,1,2,3,4
        currentPageNumberIndex = 4 // last page

        User clicks Next :
        setCurrentPageNumberIndex(p => p + 1);
        // 4 → 5

        Now your API request breaks :
        skip = currentPageNumberIndex * LIMIT_PER_PAGE
        skip = 5 * 10 = 50
        But total items = 50
        /products?limit=10&skip=50

        */}
        {currentPageNumberIndex < noOfPages - 1 && (
          <span
            className="navButton"
            onClick={() => setCurrentPageNumberIndex((prev) => prev + 1)}
          >
            Next
          </span>
        )}
      </div>
    </div>
  );
}

/*
  ── ALTERNATIVE: Frontend Pagination ────────────────────────────────

  Fetches ALL products in one API call, then slices on the frontend.
  Good when dataset is small; avoids repeated network requests.

  import { useEffect, useState } from "react";
  import { ProductCard } from "./ProductCard";
  import { type Product, type ProductsApiResponse } from "./types";
  import "./styles.css";

  const LIMIT_PER_PAGE = 10;

  export default function PaginationFrontend() {
    const [currentPage, setCurrentPage] = useState(0);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [noOfPages, setNoOfPages] = useState(0);

    useEffect(() => {
      fetchAllProducts();
    }, []);

    async function fetchAllProducts() {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const json: ProductsApiResponse = await res.json();
      setAllProducts(json.products);
      setNoOfPages(Math.ceil(json.products.length / LIMIT_PER_PAGE));
    }

    // FE pagination — slice the full array based on current page
    const start = currentPage * LIMIT_PER_PAGE;
    const end = start + LIMIT_PER_PAGE;
    const visibleProducts: Product[] = allProducts.slice(start, end);

    return (
      <div>
        <div className="productsGrid">
          {visibleProducts.map((product) => {
            const { id, title, discountPercentage, price, thumbnail } = product;
            return (
              <ProductCard
                key={id}
                id={id}
                title={title}
                price={price}
                thumbnail={thumbnail}
                discountPercentage={discountPercentage}
              />
            );
          })}
        </div>

        <div className="paginationControls">
          {currentPage > 0 && (
            <span
              onClick={() => setCurrentPage((page) => page - 1)}
              className="navButton"
            >
              Prev
            </span>
          )}

          {[...Array(noOfPages).keys()].map((pageIndex) => (
            <span
              key={pageIndex}
              className={`pageNumber ${pageIndex === currentPage ? "pageNumberActive" : ""}`}
              onClick={() => setCurrentPage(pageIndex)}
            >
              {pageIndex + 1}
            </span>
          ))}

          {currentPage < noOfPages - 1 && (
            <span
              onClick={() => setCurrentPage((page) => page + 1)}
              className="navButton"
            >
              Next
            </span>
          )}
        </div>
      </div>
    );
  }
*/
