import React, { Fragment } from "react";
import styles from "./cart.module.css";
import { FaRupeeSign } from "react-icons/fa";
import CartProducts from "./CartProducts.js";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import ScreenVisual from "../labels/ScreenVisual";
import MetaData from "../labels/MetaData";
const Cart = () => {
  let subtotal = 0;
  let subtotalPrice = 0;
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  cartItems.map((item) => {
    subtotal += Number(item.quantity);
    subtotalPrice += item.totalPrice;
    return "";
  });
  const checkoutHandle = () => {
    if (cartItems.length === 0) {
      alert.error("Please add Items in your Cart");
      return;
    }
    navigate("/login", { state: { redirect: "/shipping" } });
  };
  return (
    <Fragment>
      <MetaData title="Cart Products" />
      <ScreenVisual />
      <div className={styles["cart-mainContainer"]}>
        <div className={styles["cart-container"]}>
          <div className={styles["cart-items-main"]}>
            <div className={styles["cart-header-main"]}>
              <p className={styles["heading"]}>
                {cartItems.length
                  ? "Shopping Cart"
                  : "Your Shopping Cart is Empty"}
              </p>
              <p className={styles["price"]}>Price</p>
            </div>
            <div className={styles["cart-items-box"]}>
              {cartItems.length ? (
                cartItems.map((item) => (
                  <CartProducts key={item.productId} item={item} />
                ))
              ) : (
                <div className={styles["no-products-available"]}>
                  <div className={styles["no-product-message"]}>
                    <MdOutlineRemoveShoppingCart />
                    <p>No Products are added in your Shopping Cart </p>
                  </div>
                  <div className={styles["text"]}>
                    <p>
                      Your cart is empty! Time to fill it up with some amazing
                      finds. Explore <Link to="/products">our collection</Link>{" "}
                      and discover cool stuff that will elevate your experience.
                      Happy shopping!
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className={styles["sub-total"]}>
              <p>Subtotal</p>
              <p>({subtotal} items)</p>
              <div>
                <FaRupeeSign />
                <p>{subtotalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={styles["cart-subTotal-main"]}>
            <div className={styles["cart-subtotal-container"]}>
              {subtotalPrice > 8000 && (
                <div className={styles["cart-subtotal-first"]}>
                  <FaCheckCircle />
                  <div>
                    <p>
                      Congratulations! Your order qualifies for FREE Delivery.
                    </p>
                  </div>
                </div>
              )}
              <div className={styles["pay-subtotal"]}>
                <p>Subtotal</p>
                <p>({subtotal} items):</p>
                <div>
                  <FaRupeeSign />
                  <p>{subtotalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className={styles["cart-button-proceed"]}>
                <button onClick={checkoutHandle}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
