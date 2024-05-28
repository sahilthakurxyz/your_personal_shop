import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import LasyLoad from "./basics/LasyLoad.js";
import MainLayout from "./MainLayout";
import Home from "./components/Home/Home";
import NotFound from "./components/layouts/NotFound.js";
const About = React.lazy(() => import("./components/layouts/About.js"));
const Contact = React.lazy(() => import("./components/layouts/Contact.js"));
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

const PaymentRoute = React.lazy(() =>
  import("./components/cart/PaymentRoute.js")
);
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
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = localStorage.getItem("auth");

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
              <ProtectedRoute isAuthenticated={auth}>
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
              <ProtectedRoute isAuthenticated={auth}>
                <ProfileUpdate />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/update/password"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={auth}>
                <PasswordUpdate />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={auth}>
                <MyOrders />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={auth}>
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
              <ProtectedRoute isAuthenticated={auth}>
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
              <ProtectedRoute isAuthenticated={auth}>
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
              <ProtectedRoute isAuthenticated={auth}>
                <PaymentRoute />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/payment/failed"
          element={
            <Suspense fallback={<LasyLoad />}>
              <ProtectedRoute isAuthenticated={auth}>
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
              <ProtectedRoute isAuthenticated={auth}>
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
              <Suspense fallback={<LasyLoad />}>
                <ProtectedRoute
                  isAuthenticated={auth}
                  isAdmin={user.role === "admin" ? true : false}
                  adminRoute={true}
                >
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              </Suspense>
            }
          />
        )}
        <Route
          path="/contact"
          element={
            <Suspense fallback={<LasyLoad />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<LasyLoad />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LasyLoad />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
