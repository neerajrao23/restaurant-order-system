import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cartItems, getTotalPrice, clearCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    tableNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!customerInfo.tableNo.trim()) {
      setError("Please enter your table number");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const orderData = {
      customerName: customerInfo.name.trim(),
      tableNumber: customerInfo.tableNo.trim(),
      items: cartItems.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      })),
      total: getTotalPrice() * 1.08, // Including tax
    };
    try {
      await axios.post(
        "https://restaurantordersystem-69v9.onrender.com/api/orders",
        orderData
      );
      setSuccess(true);

      // Redirect to menu
      setTimeout(() => {
        clearCart();
        navigate("/menu");
      }, 8000);
    } catch (err) {
      setError("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>No items to checkout</h2>
            <p>Please add items to your cart before proceeding to checkout.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/menu")}
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">
              <i class="fa-solid fa-square-check"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you, {customerInfo.name}! Your order has been received.</p>
            <p>Our staff will prepare and serve your meal shortly.</p>
            <p className="redirect-message">
              Redirecting to menu in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order details</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <div className="card">
              <h3>Customer Information</h3>
              <form onSubmit={handleSubmitOrder}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tableNo" className="form-label">
                    Table Number *
                  </label>
                  <input
                    type="text"
                    id="tableNo"
                    name="tableNo"
                    value={customerInfo.tableNo}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your table number"
                    required
                  />
                </div>

                {error && <div className="error">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-success submit-order-btn"
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          <div className="order-summary-section">
            <div className="card">
              <h3>Order Summary</h3>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="order-item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax (8%):</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="order-note">
                <p>
                  <strong>Note:</strong> Your order will be prepared fresh and
                  served by our waitstaff. Please remain at your table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
