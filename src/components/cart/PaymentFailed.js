import React from "react";
import styles from "./payment.module.css";
import { Link, useLocation } from "react-router-dom";
import { MdSmsFailed } from "react-icons/md";
const PaymentFailed = () => {
  const location = useLocation();
  return (
    <div className={styles["fail-main-container"]}>
      <div>
        <MdSmsFailed />
        <p>{location.state.errorMessage}</p>
        <button>
          <Link to="/order/confirm">try again</Link>
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
