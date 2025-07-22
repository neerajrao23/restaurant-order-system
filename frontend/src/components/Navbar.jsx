import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartItemsCount }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <i class="fa-solid fa-utensils"></i> Bella Vista
          </Link>

          <div className="navbar-links">
            <Link
              to="/"
              className={`navbar-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`navbar-link ${
                location.pathname === "/menu" ? "active" : ""
              }`}
            >
              Menu
            </Link>
            <Link
              to="/cart"
              className={`navbar-link cart-link ${
                location.pathname === "/cart" ? "active" : ""
              }`}
            >
              <i class="fa-solid fa-cart-shopping"></i> Cart
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
