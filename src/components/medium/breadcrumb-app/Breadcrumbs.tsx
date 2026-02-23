/*
  BREADCRUMBS (Dynamic, URL-based)
  ---------------------------------
  Reads the current URL path via useLocation(), splits it into segments,
  and renders a clickable breadcrumb trail.

  Example: /products/42 → Home / products / 42

  Concepts: useLocation (typed Location object), string split + filter,
            accumulating breadcrumb path, isLast conditional rendering
*/

import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  // Split pathname into segments, filter out empty strings
  // "/products/42" → ["products", "42"]
  const pathnames: string[] = location.pathname.split("/").filter((x) => x);

  // Accumulates the path as we iterate: "", "/products", "/products/42"
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast: boolean = index === pathnames.length - 1;

        // Last segment is plain text (current page), others are links
        return isLast ? (
          <span key={breadcrumbPath}> / {name}</span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            / <Link to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
}
