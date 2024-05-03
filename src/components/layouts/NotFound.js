import React from "react";
import styles from "./notFound.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <p className={styles["looking-something"]}>looking for something?</p>
        <p className={styles["sorry"]}>
          We're sorry. The Web address you entered is not a functioning page on
          our site
        </p>
        <div className={styles["page"]}>
          <CancelIcon />
          <p>Page Not Found</p>
        </div>
        <div className={styles["home-page"]}>
          <p>Go to Our </p> <Link to="/">Home</Link>
          <span>Page</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
