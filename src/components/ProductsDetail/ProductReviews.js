import React, { useEffect, useState } from "react";

import styles from "./ProductReview.module.css";

import RatingStar from "../labels/RatingStar";

const ProductReviews = ({ review }) => {
  const { name, rating, comment } = review;
  const [width, setWidth] = useState(window.innerWidth); // Initial width state
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth); // Concise resize handler

    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      // Cleanup function
      window.removeEventListener("resize", handleResize); // Remove listener on unmount
    };
  }, []); // Empty dependency array: runs only once on mount

  const calculateSize = () => (width <= 700 ? 10 : 13); // Improved size calculation
  const options = {
    size: calculateSize(), // Dynamic size based on width
    width: 70,
    display: "flex",
    alignItems: "center",
  };
  return (
    <div className={styles["product-reviews"]}>
      <div className={styles["reviews-user_info"]}>
        <div className={styles["review-user-image-container"]}>
          {review && <img src={review.profile} alt={name} />}
        </div>
        <p className={styles["user-name"]}>{name}</p>
        <RatingStar rating={rating} {...options} />
        <p className={styles["comments"]}>{comment}</p>
      </div>
    </div>
  );
};

export default ProductReviews;
