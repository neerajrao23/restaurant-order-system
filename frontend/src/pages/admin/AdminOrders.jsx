"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const orderStatuses = [
    "all",
    "pending",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, searchTerm]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://restaurantordersystem-69v9.onrender.com/api/orders"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Mock data for demo
      const mockOrders = [
        {
          id: "ORD-001",
          customerName: "John Doe",
          phone: "555-0123",
          items: [
            { name: "Margherita Pizza", quantity: 1, price: 16.99 },
            { name: "Caesar Salad", quantity: 1, price: 12.99 },
          ],
          total: 32.26,
          status: "pending",
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          tableNumber: "A5",
        },
        {
          id: "ORD-002",
          customerName: "Jane Smith",
          phone: "555-0124",
          items: [
            { name: "Spaghetti Carbonara", quantity: 1, price: 18.99 },
            { name: "House Wine", quantity: 2, price: 6.99 },
          ],
          total: 34.61,
          status: "preparing",
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          tableNumber: "B3",
        },
        {
          id: "ORD-003",
          customerName: "Mike Johnson",
          phone: "555-0125",
          items: [
            { name: "Grilled Salmon", quantity: 1, price: 24.99 },
            { name: "Tiramisu", quantity: 1, price: 7.99 },
            { name: "Italian Soda", quantity: 2, price: 3.99 },
          ],
          total: 44.28,
          status: "ready",
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          tableNumber: "C1",
        },
        {
          id: "ORD-004",
          customerName: "Sarah Wilson",
          phone: "555-0126",
          items: [
            { name: "Bruschetta", quantity: 2, price: 8.99 },
            { name: "Chocolate Lava Cake", quantity: 1, price: 8.99 },
          ],
          total: 28.61,
          status: "completed",
          timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
          tableNumber: "A2",
        },
      ];
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customerName?.toLowerCase().includes(lowerSearch) ||
          order._id?.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://restaurantordersystem-69v9.onrender.com/api/orders/${orderId}`,
        { status: newStatus }
      );
      await fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return isNaN(date)
      ? "Invalid Date"
      : date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ffc107";
      case "preparing":
        return "#17a2b8";
      case "ready":
        return "#fd7e14";
      case "completed":
        return "#28a745";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getTimeElapsed = (timestamp) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - orderTime) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h2>Order Management</h2>
        <div className="orders-stats">
          <div className="stat-item">
            <span className="stat-number">
              {orders.filter((o) => o.status === "pending").length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {orders.filter((o) => o.status === "preparing").length}
            </span>
            <span className="stat-label">Preparing</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {orders.filter((o) => o.status === "ready").length}
            </span>
            <span className="stat-label">Ready</span>
          </div>
        </div>
      </div>

      <div className="orders-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by customer name, order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="status-filters">
          {orderStatuses.map((status) => (
            <button
              key={status}
              className={`filter-btn ${
                statusFilter === status ? "active" : ""
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status === "all"
                ? "All Orders"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="orders-grid">
        {filteredOrders.map((order) => (
          <div key={order._id} className={`order-card ${order.status}`}>
            <div className="order-header">
              <div className="order-info">
                <h3 className="order-id">{order._id}</h3>
                <div className="order-time">{formatTime(order.createdAt)}</div>
                <div className="time-elapsed">
                  {getTimeElapsed(order.createdAt)}
                </div>
              </div>

              <div className="order-status-section">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
                {order.tableNumber && (
                  <div className="table-number">Table {order.tableNumber}</div>
                )}
              </div>
            </div>

            <div className="customer-info">
              <div className="customer-name">{order.customerName}</div>
              <div className="customer-phone">{order.phone}</div>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">
                    {item.itemId?.name || "Unnamed Item"}
                  </span>
                  <span className="item-details">
                    x{item.quantity} -{" "}
                    {formatCurrency((item.itemId?.price || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                Total:{" "}
                {formatCurrency(
                  order.items.reduce(
                    (sum, item) =>
                      sum + (item.itemId?.price || 0) * item.quantity,
                    0
                  )
                )}
              </div>

              <div className="order-actions">
                {order.status === "pending" && (
                  <button
                    className="action-btn preparing"
                    onClick={() => updateOrderStatus(order._id, "preparing")}
                  >
                    Start Preparing
                  </button>
                )}

                {order.status === "preparing" && (
                  <button
                    className="action-btn ready"
                    onClick={() => updateOrderStatus(order._id, "ready")}
                  >
                    Mark Ready
                  </button>
                )}

                {order.status === "ready" && (
                  <button
                    className="action-btn completed"
                    onClick={() => updateOrderStatus(order._id, "completed")}
                  >
                    Mark Served
                  </button>
                )}

                {["pending", "preparing"].includes(order.status) && (
                  <button
                    className="action-btn cancelled"
                    onClick={() => updateOrderStatus(order._id, "cancelled")}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-orders">
          <p>No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
