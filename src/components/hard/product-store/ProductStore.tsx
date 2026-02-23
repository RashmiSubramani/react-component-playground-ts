/*
  PRODUCT STORE (Multi-Page with Routing)
  ------------------------------------------
  Difficulty: Medium
  Concepts: MemoryRouter for nested routing (avoids conflict with parent BrowserRouter),
            useParams<{ productId: string }> for typed route params,
            typed Product from dummyjson API,
            async/await with loading/error states,
            catch (err: unknown) narrowing,
            Link for client-side navigation

  Pages:
  - Home       → welcome message
  - Products   → fetches + lists all products with "View More" links
  - ProductDetails → fetches single product by ID from route params
*/

import { useState, useEffect } from "react";
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// ─── Home page ────────────────────────────────────────────────────

function Home() {
  return <div className="ps-home">Welcome to the Home Page</div>;
}

// ─── Products listing page ────────────────────────────────────────

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = (await response.json()) as ProductsApiResponse;
        setProducts(data.products);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ps-products">
      <h2>Product List</h2>

      <div className="ps-product-list">
        {products.map((product) => (
          <div key={product.id} className="ps-product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="ps-product-image"
            />

            <div className="ps-product-info">
              <h4>{product.title}</h4>
              <p>{product.description.slice(0, 100)}...</p>

              <Link
                to={`/products/${product.id}`}
                className="ps-view-more"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Product details page ─────────────────────────────────────────

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = (await response.json()) as Product;
        setProduct(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ps-detail">
      {product ? (
        <div className="ps-detail-info">
          <h3>{product.title}</h3>

          <img
            src={product.thumbnail}
            alt={product.title}
            className="ps-product-image"
          />

          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>

          <Link to="/products" className="ps-back-link">
            Back to Products
          </Link>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

// ─── Main layout (nav + routes) ───────────────────────────────────

function ProductStoreLayout() {
  return (
    <>
      <nav className="ps-navbar">
        <Link to="/" className="ps-nav-link">
          Home
        </Link>
        <Link to="/products" className="ps-nav-link">
          Products
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

// ─── Wrapper with MemoryRouter ────────────────────────────────────
// Uses MemoryRouter (not BrowserRouter) because this component is
// nested inside the parent app's BrowserRouter — can't nest two BrowserRouters

export default function ProductStore() {
  return (
    <MemoryRouter>
      <ProductStoreLayout />
    </MemoryRouter>
  );
}
