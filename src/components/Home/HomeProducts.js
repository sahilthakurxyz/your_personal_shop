import React, { useEffect, useState } from "react";
import styles from "./homeProducts.module.css";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import RatingStar from "../labels/RatingStar";
const HomeProducts = ({ product }) => {
  const { name, _id, discount, price, ratings, NumOfReviews } = product;
  const image = product.images[0].url;
  const [width, setWidth] = useState(window.innerWidth); // Initial width state

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth); // Concise resize handler

    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      // Cleanup function
      window.removeEventListener("resize", handleResize); // Remove listener on unmount
    };
  }, []); // Empty dependency array: runs only once on mount

  const calculateSize = () => (width <= 700 ? 14 : 13); // Improved size calculation
  const options = {
    size: calculateSize(), // Dynamic size based on width
    width: 120,
    display: "flex",
    alignItems: "center",
  };

  return (
    <div className={styles["homeProducts-main-container"]}>
      <Link to={`/product/${_id}`}>
        <div className={styles["product-container"]} key={_id}>
          <img src={image} alt={name} key={_id} className={styles["image"]} />
          <div className={styles["product-details"]}>
            <div className={styles["name"]}>{name}</div>
            <div className={styles["box-1"]}>
              <div className={styles["price"]}>
                <FaRupeeSign />
                {price}
              </div>
              <div className={styles["reviews"]}>
                <span>
                  <MdOutlineRateReview />
                </span>
                <span> {NumOfReviews}</span>
                <span className={styles["rev"]}>Reviws</span>
              </div>
            </div>
            <div className={styles["box-2"]}>
              <div className={styles["discount"]}>{`${discount}% off`}</div>
              <div className={styles["ratings-star"]}>
                <RatingStar {...options} rating={ratings} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeProducts;
