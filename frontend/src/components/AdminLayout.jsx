import { Navigate, Link, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <div className="admin-brand">
            <h2>
              <i class="fa-solid fa-utensils"></i> Admin Panel
            </h2>
          </div>

          <nav className="admin-nav">
            <Link
              to="/admin/menu"
              className={`admin-nav-link ${
                location.pathname === "/admin/menu" ? "active" : ""
              }`}
            >
              <i class="fa-solid fa-clipboard"></i> Menu Management
            </Link>
            <Link
              to="/admin/orders"
              className={`admin-nav-link ${
                location.pathname === "/admin/orders" ? "active" : ""
              }`}
            >
              <i class="fa-solid fa-box"></i> Orders
            </Link>
          </nav>

          <div className="admin-sidebar-footer">
            <Link to="/" className="admin-nav-link">
              Back to Restaurant
            </Link>
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-header">
            <h1>Restaurant Admin</h1>
            <div className="admin-user-info">Welcome, Admin</div>
          </div>

          <div className="admin-main">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
