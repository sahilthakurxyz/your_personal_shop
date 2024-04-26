import React from "react";
import styles from "./searchProducts.module.css";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import RatingStar from "../labels/RatingStar";
const SearchProducts = ({ product }) => {
  const { brand, description, ratings, price, discount, images, _id } = product;
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;
  const options = {
    size: 17,
    width: 120,
    display: "flex",
    alignItems: "center",
  };

  return (
    <Link style={{ textDecoration: "none" }} to={`/product/${_id}`}>
      <div className={styles["product-details-container"]}>
        <div className={styles["product-Image"]}>
          <img
            src={images[0].url}
            alt={images[0].public_url}
            key={images[0]._id}
            className={styles.image}
          />
        </div>
        <div className={styles["product-details-info"]}>
          <p className={styles["brand-name"]}>{brand}</p>

          <div className={styles["description"]}>{description}</div>
          <div className={styles["ratings"]}>
            <RatingStar {...options} rating={ratings} />
          </div>

          <div className={styles["product-price"]}>
            <div>
              <p className={styles["mrp"]}>M.R.P</p>
              <FaRupeeSign style={{ fontSize: "14px" }} />
              <p className={styles["price"]}>{price.toFixed(2)}</p>
              <div className={styles["cut-line"]}></div>
            </div>

            <div className={styles["discounted-price"]}>
              <FaRupeeSign />
              <p>{discountedPrice.toFixed(2)}</p>
            </div>
            <div className={styles["discount"]}>
              <p>({discount} % discount)</p>
            </div>
          </div>
          {/* <div className={styles["total-price"]}>
              {discount > 0 ? (
                <div>
                  <p>M.R.P</p>
                  <div>
                    <FaRupeeSign />
                    <p>{price.toLocaleString()}</p>
                    <span className={styles["cut-line"]}></span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles["discount"]}>
              <p>({discount})</p>
            </div>
            <div className={styles["discount-price"]}>
              <FaRupeeSign className={styles["discount-price-rupee-sign"]} />
              <p className={styles["discount-price-digit"]}>
                {discountedPrice.toLocaleString()}
              </p>
            </div> */}
        </div>
      </div>
    </Link>
  );
};

export default SearchProducts;
