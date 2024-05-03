import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import LasyLoad from "./basics/LasyLoad.js";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { axiosInstance } from "./constants.js";
import NotFound from "./components/layouts/NotFound.js";
const About = React.lazy(() => import("./components/layouts/About.js"));
const Contact = React.lazy(() => import("./components/layouts/Contact.js"));
const Home = React.lazy(() => import("./components/Home/Home"));
const MainLayout = React.lazy(() => import("./MainLayout"));
const ProductDetail = React.lazy(() =>
  import("./components/ProductsDetail/ProductDetail")
);
const Products = React.lazy(() => import("./components/Products/Products"));
const Account = React.lazy(() => import("./components/Authentication/Account"));
const ProtectedRoute = React.lazy(() =>
  import("./components/route/ProtectedRoute")
);
const Dashboard = React.lazy(() => import("./components/Admin/Dashboard"));
const Cart = React.lazy(() => import("./components/cart/Cart"));
const ProfileUpdate = React.lazy(() =>
  import("./components/Authentication/ProfileUpdate")
);
const MyOrders = React.lazy(() => import("./components/orders/MyOrders"));
const OrdersDetail = React.lazy(() =>
  import("./components/orders/OrdersDetail")
);
const PasswordUpdate = React.lazy(() =>
  import("./components/Authentication/PasswordUpdate")
);
const Shipping = React.lazy(() => import("./components/cart/Shipping"));
const Menu = React.lazy(() => import("./components/layouts/Menu.js"));
const OrderConfirm = React.lazy(() =>
  import("./components/cart/OrderConfirm.js")
);

const Payment = React.lazy(() => import("./components/cart/Payment.js"));
const PaymentFailed = React.lazy(() =>
  import("./components/cart/PaymentFailed.js")
);
const Success = React.lazy(() => import("./components/cart/Success.js"));
const ForgetPassword = React.lazy(() =>
  import("./components/Authentication/ForgetPassword.js")
);
const ResetPassword = React.lazy(() =>
  import("./components/Authentication/ResetPassword.js")
);

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
            <Suspense fallback={<LasyLoad />}>
              <MainLayout>
                <Home />
              </MainLayout>
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<LasyLoad />}>
              <MainLayout>
                <ProductDetail />
              </MainLayout>
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<LasyLoad />}>
              <MainLayout>
                <Products />
              </MainLayout>
            </Suspense>
          }
        />
        <Route
          path="/products/:keyword"
          element={
            <Suspense fallback={<LasyLoad />}>
              <MainLayout>
                <Products />
              </MainLayout>
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<LasyLoad />}>
              <MainLayout>
                <Cart />
              </MainLayout>
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainLayout>
                  <Account />
                </MainLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/update/profile"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfileUpdate />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/update/password"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PasswordUpdate />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainLayout>
                  <MyOrders />
                </MainLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainLayout>
                  <OrdersDetail />
                </MainLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Menu />
                <Shipping />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Menu />
                <OrderConfirm />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/process/payment"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                )}
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/payment/failed"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainLayout>
                  <PaymentFailed />
                </MainLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/success"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainLayout>
                  <Success />
                </MainLayout>
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forget/password"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ForgetPassword />
            </Suspense>
          }
        />
        <Route
          path="/reset/password/:token"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ResetPassword />
            </Suspense>
          }
        />
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
        <Route
          path="/contact"
          element={
            <Suspense>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense>
              <About />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
