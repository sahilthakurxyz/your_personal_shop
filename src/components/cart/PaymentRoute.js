import React, { Fragment, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../constants.js";
import Payment from "./Payment.js";

const PaymentRoute = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/ecommerce/v1/stripeApiKey`
      );
      setStripeApiKey(data?.stripeKey);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response, "error response to get Stripe");
      } else {
        console.log(`Error Fetching Stripe API Key ${error}`);
      }
    }
  };
  useEffect(() => {
    getStripeApiKey();
  }, []);
  return (
    <Fragment>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
    </Fragment>
  );
};

export default PaymentRoute;
