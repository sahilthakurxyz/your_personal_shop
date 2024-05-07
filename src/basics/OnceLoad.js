import React from "react";
import styles from "./spinner.module.css";
const OnceLoad = () => {
  return (
    <div className={styles["once-load-container"]}>
      <div className={styles["once-load-loader"]}></div>
      <p>Please wait...</p>
      <div className={styles["once-load-box"]}>
        <p>
          Behind the scenes magic! We're gathering the information you need for
          a fantastic experience. This is a one-time wait of about some seconds
          on your first visit. Thanks for your patience! The loading time
          depends on your internet connection and browser. We appreciate your
          patience.
        </p>
      </div>
    </div>
  );
};

export default OnceLoad;
