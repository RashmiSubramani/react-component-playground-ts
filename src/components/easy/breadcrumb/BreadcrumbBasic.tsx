/*
  BREADCRUMB (Basic)
  -------------------
  Difficulty: Easy
  Concepts: typed array of objects (BreadcrumbItem[]), conditional rendering
            with isLast check, aria-label for accessibility

  How it works:
  - Items array defines the breadcrumb trail
  - All items except the last are rendered as clickable links with ">" separator
  - The last item is rendered as bold text (current page)
  - Early return if items array is empty
*/

import { FaChevronRight } from "react-icons/fa";
import "./styles.css";

// Type for each breadcrumb item
type BreadcrumbItem = {
  label: string;
  path: string;
};

export default function BreadcrumbBasic() {
  const items: BreadcrumbItem[] = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Mobiles", path: "/mobiles" },
  ];

  if (!items.length) return null;

  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast: boolean = index === items.length - 1;

        return (
          <span key={item.path || index}>
            {!isLast ? (
              <>
                <a href={item.path}>{item.label}</a>
                <span style={{ margin: "0 6px" }}><FaChevronRight size={12} /></span>
              </>
            ) : (
              <strong className="current">{item.label}</strong>
            )}
          </span>
        );
      })}
    </nav>
  );
}
