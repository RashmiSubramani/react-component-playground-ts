/*
  PRODUCT DETAIL PAGE
  --------------------
  Fetches a single product by ID from the URL params.
  Concepts: useParams with typed params, useState<Product | null>,
            conditional rendering for loading state
*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Product } from "./types";

export default function ProductDetail() {
  // useParams returns Record<string, string | undefined>
  // Destructure the :id param from the route "/products/:id"
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data: Product) => setProduct(data));
  }, [id]);

  return (
    <div>
      <h2>Product Detail Page</h2>
      {product ? (
        <div>
          <img src={product.thumbnail} alt="Product" />
          <h3>{product.title}</h3>
          <h3>$ {product.price}</h3>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
