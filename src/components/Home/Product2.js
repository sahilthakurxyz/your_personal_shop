import React, { useEffect, useState } from "react";
import styles from "./product1.module.css";
import { Link } from "react-router-dom";
import RatingStar from "../labels/RatingStar";
const Product2 = ({ product }) => {
  const [width, setWidth] = useState(window.innerWidth); // Initial width state

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth); // Concise resize handler

    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      // Cleanup function
      window.removeEventListener("resize", handleResize); // Remove listener on unmount
    };
  }, []); // Empty dependency array: runs only once on mount

  const calculateSize = () => (width <= 700 ? 11 : 11); // Improved size calculation

  const { _id, images, name, ratings } = product; // Destructuring for concise formatting

  const options = {
    size: calculateSize(), // Dynamic size based on width
    width: 120,
    display: "flex",
    alignItems: "center",
  };

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
            <div className={styles["product-rating"]}>
              <RatingStar {...options} rating={ratings} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product2;
