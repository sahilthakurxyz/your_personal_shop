import React from "react";
import styles from "./product1.module.css";
import { Link } from "react-router-dom";
const Product1 = ({ product }) => {
  const { _id, images, name, discount } = product;
  return (
    <div className={styles["product-main-container"]}>
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <div className={styles["product-container"]}>
          <img
            src={images[0].url}
            alt={name}
            className={styles["product-image"]}
          />
          <div className={styles["product-details"]}>
            <p className={styles["product-name"]}>{name}</p>
            <p className={styles["product-discount"]}>{`${discount}% off`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product1;
