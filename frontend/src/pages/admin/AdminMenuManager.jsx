import axios from "axios";
import { useState, useEffect } from "react";
import "./AdminMenuManager.css";

const AdminMenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Starters",
    image: "",
    available: true,
  });

  const categories = ["Starters", "Mains", "Desserts", "Drinks"];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://restaurantordersystem-69v9.onrender.com/api/menu"
      );
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      // Mock data for demo
      setMenuItems([
        {
          id: 1,
          name: "Bruschetta",
          description: "Toasted bread with fresh tomatoes, basil, and garlic",
          price: 8.99,
          category: "Starters",
          image: "/placeholder.svg?height=200&width=300",
          available: true,
        },
        {
          id: 2,
          name: "Caesar Salad",
          description:
            "Crisp romaine lettuce with parmesan cheese and croutons",
          price: 12.99,
          category: "Starters",
          image: "/placeholder.svg?height=200&width=300",
          available: true,
        },
        {
          id: 3,
          name: "Margherita Pizza",
          description:
            "Classic pizza with tomato sauce, mozzarella, and fresh basil",
          price: 16.99,
          category: "Mains",
          image: "/placeholder.svg?height=200&width=300",
          available: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const itemData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        id: editingItem ? editingItem._id : Date.now(),
      };

      if (editingItem) {
        // Update existing item
        await axios.put(
          `https://restaurantordersystem-69v9.onrender.com/api/menu/${editingItem._id}`,
          itemData
        );
      } else {
        // Add new item
        await axios.post(
          "https://restaurantordersystem-69v9.onrender.com/api/menu",
          itemData
        );
      }
      await fetchMenuItems();

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "Starters",
        image: "",
        available: true,
      });
      setShowAddForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      available: item.available,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(
          `https://restaurantordersystem-69v9.onrender.com/api/menu/${id}`
        );
        fetchMenuItems();
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  const toggleAvailability = async (id) => {
    try {
      const item = menuItems.find((item) => item._id === id);
      await axios.put(
        `https://restaurantordersystem-69v9.onrender.com/api/menu/${id}`,
        { available: !item.available }
      );
      fetchMenuItems();
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Starters",
      image: "",
      available: true,
    });
  };

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  return (
    <div className="admin-menu-manager">
      <div className="menu-manager-header">
        <h2>Menu Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i class="fa-solid fa-plus"></i> Add New Item
        </button>
      </div>

      {showAddForm && (
        <div className="menu-form-overlay">
          <div className="menu-form-modal">
            <div className="menu-form-header">
              <h3>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h3>
              <button className="close-btn" onClick={cancelForm}>
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="menu-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-input"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                  />
                  Available for ordering
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="menu-items-grid">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className={`menu-item-card ${!item.available ? "unavailable" : ""}`}
          >
            <div className="menu-item-image">
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
              {!item.available && (
                <div className="unavailable-overlay">Unavailable</div>
              )}
            </div>

            <div className="menu-item-content">
              <div className="menu-item-header">
                <h3>{item.name}</h3>
                <span className="menu-item-category">{item.category}</span>
              </div>

              <p className="menu-item-description">{item.description}</p>

              <div className="menu-item-footer">
                <span className="menu-item-price">
                  ${item.price.toFixed(2)}
                </span>

                <div className="menu-item-actions">
                  <button
                    className={`availability-btn ${
                      item.available ? "available" : "unavailable"
                    }`}
                    onClick={() => toggleAvailability(item._id)}
                    title={
                      item.available
                        ? "Mark as unavailable"
                        : "Mark as available"
                    }
                  >
                    {item.available ? (
                      <i class="fa-solid fa-xmark"></i>
                    ) : (
                      <i class="fa-solid fa-check"></i>
                    )}
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                    title="Edit item"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                    title="Delete item"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="no-items">
          <p>No menu items found. Add your first item to get started!</p>
        </div>
      )}
    </div>
  );
};

export default AdminMenuManager;
