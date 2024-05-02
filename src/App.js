import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import Home from "./components/Home/Home";
import MainLayout from "./MainLayout";
import ProductDetail from "./components/ProductsDetail/ProductDetail";
import Products from "./components/Products/Products";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Account from "./components/Authentication/Account";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Dashboard from "./components/Admin/Dashboard";
import Cart from "./components/cart/Cart";
import ProfileUpdate from "./components/Authentication/ProfileUpdate";
import MyOrders from "./components/orders/MyOrders";
import OrdersDetail from "./components/orders/OrdersDetail";
import PasswordUpdate from "./components/Authentication/PasswordUpdate";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/products/:keyword"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Account />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/password"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PasswordUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyOrders />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrdersDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {Object.keys(user).length > 0 && (
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={user.role === "admin" ? true : false}
                adminRoute={true}
              >
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
