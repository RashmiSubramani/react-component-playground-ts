import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { addItem, type Product } from "./cartSlice";
import type { RootState, AppDispatch } from "./store";

const CATALOG: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "🎧" },
  { id: 2, name: "Mechanical Keyboard", price: 89.99, image: "⌨️" },
  { id: 3, name: "USB-C Hub", price: 34.99, image: "🔌" },
  { id: 4, name: "Webcam HD", price: 49.99, image: "📷" },
  { id: 5, name: "Mouse Pad XL", price: 19.99, image: "🖱️" },
  { id: 6, name: "Monitor Light", price: 39.99, image: "💡" },
];

export default function ProductCatalog() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="hrs-catalog">
      <h3 className="hrs-section-title">Products</h3>
      <div className="hrs-products">
        {CATALOG.map((product) => {
          const inCart = cartItems.find(
            (i) => i.product.id === product.id,
          );
          return (
            <div key={product.id} className="hrs-product">
              <span className="hrs-product-img">{product.image}</span>
              <div className="hrs-product-info">
                <span className="hrs-product-name">{product.name}</span>
                <span className="hrs-product-price">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <button
                className="hrs-btn hrs-add-btn"
                onClick={() => dispatch(addItem(product))}
              >
                <FaPlus size={10} />
                {inCart ? `In Cart (${inCart.qty})` : "Add"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
