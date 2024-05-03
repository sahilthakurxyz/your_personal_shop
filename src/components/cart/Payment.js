import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./payment.module.css";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FaRegCreditCard } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdVpnKey } from "react-icons/md";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { clearError, createNewOrder } from "../../redux/actions/orderAction";
import { attachTokenToRequests, axiosInstance } from "../../constants";
import MetaData from "../labels/MetaData";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.payTotalAmount * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.payTotalAmount,
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      //   attachTokenToRequests();
      const { data } = await axiosInstance.post(
        "/api/ecommerce/v1/payment/process",
        paymentData
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error("Payment Failed");
        navigate("/payment/failed", {
          state: { errorMessage: result.error.message },
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert.success(`Payment ${result.paymentIntent.status}`);
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createNewOrder(order));
          navigate("/success");
        } else {
          alert.error("there is an issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);
  const [continueToggle, setContinueToggle] = useState(false);
  const [toPayment, setToPayment] = useState(false);
  const toggleToPayment = () => {
    setToPayment(true);
  };
  const toggleToContiue = () => {
    setContinueToggle(true);
  };
  return (
    <Fragment>
      <div className={styles["container"]}>
        {!continueToggle && (
          <div className={styles["continue-payment"]}>
            <div className={styles["guidelines"]}>
              <p className={styles["guidelines-text"]}>
                Please ensure that all the information provided is accurate.
              </p>
              <p className={styles["guidelines-text"]}>
                Payments made in test mode will not be processed or charged.
              </p>
              <p className={styles["guidelines-text"]}>
                Contact customer support for any assistance or queries.
              </p>
              <p>
                <a href="https://docs.stripe.com/testing#regulatory-cards">
                  This Link for Payment details
                </a>
              </p>
            </div>
            <button
              className={styles["toggle-button"]}
              onClick={toggleToContiue}
            >
              Continue for Payment
            </button>
          </div>
        )}
        {continueToggle && !toPayment && (
          <div className={styles["toggleTo-payment"]}>
            <div className={styles["dynamic-div"]}>
              <button
                className={styles["cross-button"]}
                onClick={toggleToPayment}
              >
                X
              </button>
              <p>
                This is test mode payment. It is just for testing purposes
                before we launch our payment method publicly.
              </p>
            </div>
          </div>
        )}
      </div>
      {toPayment && (
        <>
          <MetaData title="Payment Details" />
          <CheckoutSteps activeStep={2} />
          <div className={styles["payment-main-container"]}>
            <form
              className={styles["payment-form"]}
              onSubmit={handleFormSubmit}
            >
              <Typography>Cart Info</Typography>
              <div>
                <FaRegCreditCard />
                <CardNumberElement className={styles["paymentInput"]} />
              </div>
              <div>
                <CiCalendarDate />
                <CardExpiryElement className={styles["paymentInput"]} />
              </div>
              <div>
                <MdVpnKey />
                <CardCvcElement className={styles["paymentInput"]} />
              </div>
              <input
                type="submit"
                ref={payBtn}
                value={`Pay - ${
                  orderInfo && Math.round(orderInfo.payTotalAmount)
                }`}
                className={styles["paymet-form-button"]}
              />
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Payment;
