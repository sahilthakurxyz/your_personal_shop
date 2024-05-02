import React, { useState } from "react";
import styles from "./cartProducts.module.css";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addItemsCart,
  removeItemFromCart,
} from "../../redux/actions/cartAction";
const CartProducts = ({ item }) => {
  const {
    stock,
    price,
    discount,
    actualPrice,
    totalPrice,
    quantity,
    productId,
  } = item;

  const [qtyItem, setQtyItem] = useState(quantity);
  const dispatch = useDispatch();
  const onHandleQty = () => {
    const newQty = qtyItem;
    if (stock < newQty) {
      return;
    }
    dispatch(addItemsCart(productId, newQty));
  };

  const className =
    stock > 0 ? styles["check-stock"] : styles["check-notInStock"];

  const handleDelete = () => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <div className={styles["item-main-box"]}>
      <div className={styles["item-box"]}>
        <div>
          <div className={styles["image-box"]}>
            <img src={item.image} alt="name" />
          </div>
          <div className={styles["details-box"]}>
            <Link to={`/product/${productId}`} className={styles["link"]}>
              <p>{item.details}</p>
            </Link>
            <div className={styles["item-details"]}>
              <p className={className}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <div className={styles["qty"]}>Qty:{quantity}</div>
              <div>
                <p>Stock Available :{stock} </p>
              </div>
              <div className={styles["quantity"]}>
                <input
                  type="number"
                  value={qtyItem}
                  onChange={(e) => setQtyItem(e.target.value)}
                />
                <button onClick={onHandleQty}>Qty:Add</button>
              </div>
              <button className={styles["delete"]} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className={styles["price-box"]}>
          {discount > 0 && (
            <div className={styles["price-box-container"]}>
              <div className={styles["offerContainer"]}>
                <p>Deal of the day</p>
                <button
                  className={styles["discount"]}
                >{`${discount} % off`}</button>
              </div>
              <div className={styles["m-r-p"]}>
                <p>M.R.P</p>
                <div>
                  <FaRupeeSign className={styles["actuall-price-rupee-sign"]} />
                  <div>
                    <p>{actualPrice.toFixed(2)}</p>
                    <div className={styles["line"]}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles["priceContainer"]}>
            <FaRupeeSign />

            <p>{price.toFixed(2)}</p>
          </div>
          <div className={styles["result-gross-total"]}>
            <p>Total Pay: </p>
            <div>
              <FaRupeeSign />
              <p>{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
