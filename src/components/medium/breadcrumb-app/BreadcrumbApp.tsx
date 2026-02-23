/*
  BREADCRUMB APP (Dynamic Breadcrumbs with Routing)
  ---------------------------------------------------
  Difficulty: Medium
  Concepts: MemoryRouter (isolated routing), useLocation for path parsing,
            useParams with typed params, typed API responses,
            dynamic breadcrumb generation from URL segments

  Why MemoryRouter?
  This component lives INSIDE the main app's BrowserRouter.
  You can't nest two BrowserRouters — so we use MemoryRouter to give
  this demo its own isolated routing context without conflicting with the parent.

  Architecture:
  BreadcrumbApp (MemoryRouter wrapper)
    ├── Breadcrumbs   — reads useLocation().pathname, splits into segments
    ├── Home          — fetches trending products, links to /products/:id
    ├── ProductListing — fetches all products, grid layout
    └── ProductDetail  — fetches single product by useParams().id
*/

import { MemoryRouter, Routes, Route } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Home from "./Home";
import ProductListing from "./ProductListing";
import ProductDetail from "./ProductDetail";
import "./styles.css";

export default function BreadcrumbApp() {
  return (
    // MemoryRouter keeps routing in memory — doesn't touch the browser URL bar
    <MemoryRouter>
      <div className="breadcrumbApp">
        <h1>RoadsideCoder Store</h1>
        <Breadcrumbs />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
}
