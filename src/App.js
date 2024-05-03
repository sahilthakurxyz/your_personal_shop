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
import { useEffect, useState } from "react";
import Account from "./components/Authentication/Account";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Dashboard from "./components/Admin/Dashboard";
import Cart from "./components/cart/Cart";
import ProfileUpdate from "./components/Authentication/ProfileUpdate";
import MyOrders from "./components/orders/MyOrders";
import OrdersDetail from "./components/orders/OrdersDetail";
import PasswordUpdate from "./components/Authentication/PasswordUpdate";
import Shipping from "./components/cart/Shipping";
import Menu from "./components/layouts/Menu.js";
import OrderConfirm from "./components/cart/OrderConfirm.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { attachTokenToRequests, axiosInstance } from "./constants.js";
import Payment from "./components/cart/Payment.js";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getStripeApiKey = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/ecommerce/v1/stripeApiKey`
      );
      setStripeApiKey(data?.stripeKey);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response);
      } else {
        console.log(`Error Fetching Stripe API Key ${error}`);
      }
    }
  };
  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
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
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Menu />
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <Menu />
              <OrderConfirm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
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
