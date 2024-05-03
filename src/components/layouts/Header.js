import React, { useState } from "react";
import styles from "./header.module.css";
import Menu from "./Menu";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import { useAlert } from "react-alert";
const Header = () => {
  const alert = useAlert();
  const [keyword, setKeyword] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim().length === 0) {
      alert.error("Please Enter Correctly");
      return;
    }
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <div className={styles["header-main-container"]}>
      <div>
        <Menu />
      </div>
      <div>
        <div className={styles["header-navigation-container"]}>
          <div className={styles["header-product-container"]}>
            <Link to="/products">
              <p>PRODUCTS</p>
            </Link>
          </div>
          <div>
            <form
              onSubmit={handleSubmitSearch}
              className={styles["header-input-container"]}
            >
              <input
                type="text"
                placeholder="Search ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button>Search</button>
            </form>
          </div>
          <div className={styles["header-cart-container"]}>
            <Link to="/cart">
              <AddShoppingCartIcon />
              <p>{cartItems?.length}</p>
            </Link>
          </div>
          <div className={styles["header-user-container"]}>
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
