import React, { useState } from "react";
import "./styles.css";
const recipesData = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: 2,
    name: "Vegetarian Stir-Fry",
    cuisine: "Asian",
    image: "https://cdn.dummyjson.com/recipe-images/2.webp",
    rating: 4.7,
    reviewCount: 26,
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies",
    cuisine: "American",
    image: "https://cdn.dummyjson.com/recipe-images/3.webp",
    rating: 4.9,
    reviewCount: 13,
  },
  {
    id: 4,
    name: "Chicken Alfredo Pasta",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/4.webp",
    rating: 4.9,
    reviewCount: 82,
  },
  {
    id: 5,
    name: "Mango Salsa Chicken",
    cuisine: "Mexican",
    image: "https://cdn.dummyjson.com/recipe-images/5.webp",
    rating: 4.9,
    reviewCount: 63,
  },
  {
    id: 6,
    name: "Quinoa Salad with Avocado",
    cuisine: "Mediterranean",
    image: "https://cdn.dummyjson.com/recipe-images/6.webp",
    rating: 4.4,
    reviewCount: 59,
  },
  {
    id: 7,
    name: "Tomato Basil Bruschetta",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/7.webp",
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: 8,
    name: "Beef and Broccoli Stir-Fry",
    cuisine: "Asian",
    image: "https://cdn.dummyjson.com/recipe-images/8.webp",
    rating: 4.7,
    reviewCount: 58,
  },
  {
    id: 9,
    name: "Caprese Salad",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/9.webp",
    rating: 4.6,
    reviewCount: 82,
  },
  {
    id: 10,
    name: "Shrimp Scampi Pasta",
    cuisine: "Italian",
    image: "https://cdn.dummyjson.com/recipe-images/10.webp",
    rating: 4.3,
    reviewCount: 5,
  },
];

const RecipeFilterApp = () => {
  const [minRating, setMinRating] = useState(4);
  const [cart, setCart] = useState([]);

  const filteredRecipes = recipesData.filter(
    (recipe) => recipe.rating >= minRating
  );

  const averageRating =
    filteredRecipes.reduce((sum, recipe) => sum + recipe.rating, 0) /
    (filteredRecipes.length || 1);

  const addToCart = (recipe) => {
    setCart((prevCart) => [...prevCart, recipe]);
  };

  const totalCartItems = cart.length;

  return (
    <div className="app-container">
      <h2>🍽️ Recipe Explorer</h2>
      <div className="filter-cart-section">
        <div>
          <label htmlFor="ratingFilter">Filter by Rating: </label>
          <select
            id="ratingFilter"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
          >
            <option value={4.0}>4.0+</option>
            <option value={4.3}>4.3+</option>
            <option value={4.5}>4.5+</option>
            <option value={4.7}>4.7+</option>
            <option value={4.9}>4.9</option>
          </select>
        </div>

        <h3 className="cart-items">🛒 Cart Items: {totalCartItems}</h3>
      </div>

      <h3>
        Average Rating: {averageRating.toFixed(2)} ({filteredRecipes.length}{" "}
        recipes)
      </h3>

      <div className="recipe-cards-container">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-card-img"
              width={100}
            />
            <h4>{recipe.name}</h4>
            <div>Cuisine: {recipe.cuisine}</div>
            <div>
              Rating: {recipe.rating} ({recipe.reviewCount} reviews)
            </div>
            <button className="cartButton" onClick={() => addToCart(recipe)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilterApp;
