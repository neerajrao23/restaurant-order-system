import AdminLayout from "./components/AdminLayout";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMenuManager from "./pages/admin/AdminMenuManager";
import AdminOrders from "./pages/admin/AdminOrders";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="app-wrapper">
      <div className="main-content">
        <Router>
          <div className="App">
            <Routes>
              {/* Customer Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar cartItemsCount={getTotalItems()} />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/menu"
                element={
                  <>
                    <Navbar cartItemsCount={getTotalItems()} />
                    <Menu addToCart={addToCart} />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cart"
                element={
                  <>
                    <Navbar cartItemsCount={getTotalItems()} />
                    <Cart
                      cartItems={cartItems}
                      updateCartItemQuantity={updateCartItemQuantity}
                      removeFromCart={removeFromCart}
                      getTotalPrice={getTotalPrice}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/checkout"
                element={
                  <>
                    <Navbar cartItemsCount={getTotalItems()} />
                    <Checkout
                      cartItems={cartItems}
                      getTotalPrice={getTotalPrice}
                      clearCart={clearCart}
                    />
                    <Footer />
                  </>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/login"
                element={
                  <AdminLogin
                    setIsAdminAuthenticated={setIsAdminAuthenticated}
                    isAuthenticated={isAdminAuthenticated}
                  />
                }
              />
              <Route
                path="/admin/*"
                element={
                  <>
                    <AdminLayout
                      isAuthenticated={isAdminAuthenticated}
                      setIsAuthenticated={setIsAdminAuthenticated}
                    >
                      <Routes>
                        <Route path="menu" element={<AdminMenuManager />} />
                        <Route path="orders" element={<AdminOrders />} />
                      </Routes>
                    </AdminLayout>
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
