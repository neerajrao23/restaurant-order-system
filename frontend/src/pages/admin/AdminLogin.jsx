import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = ({ setIsAdminAuthenticated, isAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/menu" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://restaurantordersystem-69v9.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("adminToken", data.token);
      setIsAdminAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1>
              <i class="fa-solid fa-utensils"></i> Admin Login
            </h1>
            <p>Access the restaurant management system</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary admin-login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="admin-login-demo">
            <p>
              <strong>For Credentials:</strong>
            </p>
            <p>
              Contact: <code>Author</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
