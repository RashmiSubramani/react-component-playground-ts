/*
  PRODUCT CARD
  -------------
  Shared presentational component used by both pagination approaches.
  Concepts: typing props via shared type file
*/

import { type ProductCardProps } from "./types";
import "./styles.css";

export function ProductCard({
  id,
  title,
  discountPercentage,
  price,
  thumbnail,
}: ProductCardProps) {
  return (
    <div className="productCard">
      <img src={thumbnail} alt="product" />
      <h1 className="productTitle">
        {id}-{title}
      </h1>
      <h2 className="productPrice">Rs {price}</h2>
      <h3 className="productDiscount">{discountPercentage}% offer</h3>
    </div>
  );
}
