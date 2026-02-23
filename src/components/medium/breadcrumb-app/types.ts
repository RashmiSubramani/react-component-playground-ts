/*
  BREADCRUMB APP — Shared Types
  ------------------------------
  Product type from dummyjson.com API, used across Home, ProductListing, ProductDetail
*/

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

// API response shape from dummyjson.com/products
export type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
