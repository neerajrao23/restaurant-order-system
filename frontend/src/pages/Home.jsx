import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="restaurant-logo">
              <i class="fa-solid fa-utensils"></i>
            </div>
            <h1 className="restaurant-name">Welcome to Bella Vista</h1>
            <p className="restaurant-tagline">
              Authentic Italian Cuisine in the Heart of the City
            </p>
            <div className="instruction-box">
              <h3>How to Order</h3>
              <p>
                Browse our digital menu and place your order directly from your
                table. Our friendly waitstaff will serve your delicious meal
                shortly!
              </p>
            </div>
            <Link to="/menu" className="btn btn-primary btn-large">
              Start Ordering <i class="fa-solid fa-utensils"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i class="fa-solid fa-mobile-screen"></i>
              </div>
              <h3>Easy Ordering</h3>
              <p>Seamlessly order from your table using our digital menu</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i class="fa-solid fa-plate-wheat"></i>
              </div>
              <h3>Fresh Ingredients</h3>
              <p>
                All dishes prepared with the finest, locally-sourced ingredients
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <h3>Quick Service</h3>
              <p>
                Your order will be prepared and served promptly by our staff
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
