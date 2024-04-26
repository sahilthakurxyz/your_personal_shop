import React, { Fragment, useEffect } from "react";
import styles from "./Account.module.css";
import MetaData from "../labels/MetaData";
import ScreenVisual from "../labels/ScreenVisual";
import { LoginLoader } from "../../basics/Spinner";
import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Account = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <LoginLoader />
      ) : (
        <Fragment>
          {isAuthenticated && (
            <div className={styles["profile-container"]}>
              <MetaData title={`${user.name}'s Profile`} />
              <ScreenVisual />
              <div className={styles["profile-container-left"]}>
                <div className={styles["profile-user-info"]}>
                  <p className={styles["left-heading"]}>Profile</p>
                  <img
                    src={user.avatar.url}
                    alt={"profile"}
                    className={styles["left-user-image"]}
                  />
                  <Link to="/update/profile">
                    <button className={styles["left-user-info-button"]}>
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
              <div className={styles["profile-container-right"]}>
                <div className={styles["profile-user-details"]}>
                  <div>
                    <h4 className={styles["details-heading"]}>Full Name</h4>
                    <p className={styles["details-text"]}>{user?.name}</p>
                  </div>
                  <div>
                    <h4 className={styles["details-heading"]}>Email</h4>
                    <p className={styles["details-text"]}>{user?.email} </p>
                  </div>
                  <div>
                    <h4 className={styles["details-heading"]}>Role</h4>
                    <p
                      className={
                        user.role === "admin"
                          ? styles["green"]
                          : styles["black"]
                      }
                    >
                      {user.role}{" "}
                    </p>
                  </div>
                  <div>
                    <h4 className={styles["details-heading"]}>Joined On </h4>
                    <p className={styles["details-text"]}>
                      {String(user?.createdAt).substring(0, 10)}
                    </p>
                  </div>
                  <div className={styles["profiles-buttons"]}>
                    <Link to="/orders">
                      <button className={styles["user-profile-button"]}>
                        My Orders
                      </button>
                    </Link>
                    <Link to="/update/password">
                      <button className={styles["user-profile-button"]}>
                        Change Password
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Account;
