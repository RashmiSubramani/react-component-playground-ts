/*
  PAGINATION — Shared Types
  --------------------------
  Used by both Pagination.tsx and ProductCard.tsx
*/

// Shape of a product from dummyjson.com API
export type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};

// API response shape from dummyjson.com/products
export type ProductsApiResponse = {
  products: Product[];
  total: number; // total items available (used to calculate page count)
  skip: number;
  limit: number;
};

// Props for the ProductCard component — picks only the fields we render
export type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};
