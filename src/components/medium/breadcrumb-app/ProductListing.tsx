/*
  PRODUCT LISTING PAGE
  ---------------------
  Fetches all products, renders a grid with links to detail pages.
  Concepts: typed fetch response, Link with dynamic path
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Product, type ProductsApiResponse } from "./types";

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data: ProductsApiResponse) => setProducts(data.products));
  }, []);

  return (
    <div>
      <h2>Product Listing</h2>
      <div className="productGrid">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
