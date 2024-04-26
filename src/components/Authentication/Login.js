import React, { Fragment, useEffect, useState } from "react";
import styles from "./login.module.css";
import MetaData from "../labels/MetaData";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { ButtonSpinner } from "../../basics/Spinner";
import { loginClearError } from "../../redux/reducers/userReducer";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const redirect = location.state?.redirect || "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(loginClearError());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, redirect, navigate, isAuthenticated]);
  return (
    <Fragment>
      <div className={styles["login-container"]}>
        <MetaData title="Access Your Account" />
        <div className={styles["login-box"]}>
          <div className={styles["login-heading"]}>LOGIN </div>
          <form className={styles["login-form"]} onSubmit={handleLoginSubmit}>
            <div className={styles["login-email"]}>
              <MdAttachEmail />
              <input
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
                value={loginEmail}
                required
                placeholder="Enter Email"
              />
            </div>
            <div className={styles["login-password"]}>
              <RiLockPasswordFill />
              <input
                type={visible ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password..."
              />
              <div
                className={styles["login-password-eye"]}
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <Link to="/forget/password">Forget Password ?</Link>
            <button type="submit" className={styles["submit-btn-login"]}>
              {loading ? (
                <ButtonSpinner border={"#1515eb"} borderTop={"red"} />
              ) : (
                "login"
              )}
            </button>
            <Link to="/register">
              You Don't have an Account ? <span>Register</span>
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
