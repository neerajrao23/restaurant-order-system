import axios from "axios";
import { useState, useEffect } from "react";
import "./Menu.css";

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [menuItems, selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://restaurantordersystem-69v9.onrender.com/api/menu"
      );
      const availableItems = response.data.filter((item) => item.available);
      setMenuItems(availableItems);
      setError(null);
    } catch (err) {
      setError("Failed to load menu items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (selectedCategory === "All") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(
        menuItems.filter((item) => item.category === selectedCategory)
      );
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    // Show a brief success message
    const button = document.querySelector(`[data-item-id="${item._id}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Added! ✓";
      button.style.backgroundColor = "#28a745";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
      }, 1000);
    }
  };

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  return (
    <div className="menu-page">
      <div className="container">
        <div className="menu-header">
          <h1>Our Menu</h1>
          <p>Discover our delicious selection of authentic Italian dishes</p>
        </div>

        {error && (
          <div className="error">
            {error}
            <br />
            <small>Showing demo menu items for preview</small>
          </div>
        )}

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item._id} className="menu-item card">
              <div className="menu-item-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </div>
              <div className="menu-item-content">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    className="btn btn-primary btn-small"
                    data-item-id={item._id}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="no-items">
            <p>No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
