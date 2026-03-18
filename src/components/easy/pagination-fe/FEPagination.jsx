import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

const LIMIT_PER_PAGE = 10;

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [allProducts, setAllProducts] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  async function fetchAllProducts() {
    const res = await fetch("https://dummyjson.com/products?limit=100"); // fetch all in one go
    const json = await res.json();

    setAllProducts(json.products);
    setNoOfPages(Math.ceil(json.products.length / LIMIT_PER_PAGE));
  }

  // FE pagination slice
  const start = currentPage * LIMIT_PER_PAGE;
  const end = start + LIMIT_PER_PAGE;
  const visibleProducts = allProducts.slice(start, end);

  return (
    <div>
      <div className="flex flex-wrap">
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

      <div className="p-10">
        {/* Prev */}
        {currentPage > 0 && (
          <span
            onClick={() => setCurrentPage((page) => page - 1)}
            className="cursor-pointer px-4"
          >
            Prev
          </span>
        )}

        {/* Page Numbers */}
        {[...Array(noOfPages).keys()].map((pageIndex) => (
          <span
            key={pageIndex}
            className={
              "text-xl p-4 cursor-pointer " +
              (pageIndex === currentPage && "font-bold underline")
            }
            onClick={() => setCurrentPage(pageIndex)}
          >
            {pageIndex + 1}
          </span>
        ))}

        {/* Next */}
        {currentPage < noOfPages - 1 && (
          <span
            onClick={() => setCurrentPage((page) => page + 1)}
            className="cursor-pointer px-4"
          >
            Next
          </span>
        )}
      </div>
    </div>
  );
}
