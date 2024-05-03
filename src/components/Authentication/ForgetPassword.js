import React, { Fragment, useEffect, useState } from "react";
import styles from "./forgetPassword.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { MdAttachEmail } from "react-icons/md";

import { forgetPassword } from "../../redux/actions/userAction";
import { clearError } from "../../redux/reducers/profileReducer";
import { ButtonSpinner } from "../../basics/Spinner";
import MetaData from "../labels/MetaData";
const ForgetPassword = () => {
  const { error, loading, message } = useSelector(
    (state) => state.forgetPassword
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleforgetPasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgetPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  });
  return (
    <Fragment>
      <MetaData title="Forget Password" />
      <div className={styles["forgetPassword-container"]}>
        <div className={styles["forgetPassword-box"]}>
          <div className={styles["forgetPassword-heading"]}>
            Forget Password
          </div>
          <form
            className={styles["forgetPassword-form"]}
            onSubmit={handleforgetPasswordSubmit}
          >
            <div className={styles["forget-password"]}>
              <MdAttachEmail />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
              />
            </div>
            <button
              type="submit"
              className={styles["submit-btn-forgetPassword"]}
            >
              {loading ? (
                <ButtonSpinner border={"#1515eb"} borderTop={"red"} />
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;
