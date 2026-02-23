/*
  HOME PAGE
  ----------
  Fetches trending products (first 6) and displays them in a grid.
  Concepts: typed API response, useState<Product[]>, Link for navigation
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Product, type ProductsApiResponse } from "./types";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data: ProductsApiResponse) => {
        setTrendingProducts(data.products.slice(0, 6));
      });
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <span>Trending Products</span>
      <div className="productGrid">
        {trendingProducts.map((product) => (
          <div key={product.id} className="productCard">
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/products">
        <button className="viewAllBtn">View All Products</button>
      </Link>
    </div>
  );
}
