import React, { Fragment } from "react";
import styles from "./confirmOrder.module.css";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import ScreenVisual from "../labels/ScreenVisual";
import MetaData from "../labels/MetaData";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const subTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const payTotalAmount = subTotal + shippingCharges + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      payTotalAmount,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order Details" />
      <CheckoutSteps activeStep={1} />
      <ScreenVisual />
      <div className={styles["confirm-order-container"]}>
        <div>
          <div className={styles["confirm-shipping-area"]}>
            <Typography>Shipping Info</Typography>
            <div className={styles["confirm-shipping-area-box"]}>
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span className={styles["address"]}>{address}</span>
              </div>
            </div>
          </div>
          <div className={styles["confrim-cartItems-container"]}>
            <Typography>Cart Items:</Typography>
            <div className={styles["confirm-cartItems-box"]}>
              {cartItems ? (
                cartItems.map((item) => (
                  <div key={item.productId}>
                    <img src={item.image} alt="" />
                    <Link className={styles["link"]}>
                      <div>
                        <div className={styles["product-name"]}>
                          <MdOutlineDriveFileRenameOutline />
                          <p className={styles["name"]}>{item.name}</p>
                        </div>
                        <div className={styles["detail"]}>
                          <p className={styles["quantity"]}>{item.quantity}</p>
                          <p className={styles["p-tag"]}> X</p>{" "}
                          <p className={styles["p-tag"]}>
                            {item.price.toFixed(1)}
                          </p>{" "}
                          ={" "}
                          <p className={styles["p-tag"]}>
                            {item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div>Cart is Empty</div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className={styles["orderSummary"]}>
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax.toFixed(1)}</span>
              </div>
            </div>

            <div className={styles["orderSummaryTotal"]}>
              <p>
                <b>Total:</b>
              </p>
              <span>₹{payTotalAmount.toFixed(2)}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderConfirm;
