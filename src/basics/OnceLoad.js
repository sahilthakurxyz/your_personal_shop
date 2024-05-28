import React from "react";
import styles from "./spinner.module.css";
const OnceLoad = () => {
  return (
    <div className={styles["once-load-container"]}>
      <div className={styles["once-load-spinner"]}></div>
      <p>Loading...</p>
      <div className={styles["once-load-box"]}>
        <p>
          Please wait while we prepare everything for you. This may take a
          moment, but we're working hard to ensure you have a great experience.
        </p>
      </div>
    </div>
  );
};

export default OnceLoad;
