import React, { Fragment, useEffect, useMemo, useState } from "react";

import styles from "./home.module.css";
import Product1 from "./Product1.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productAction.js";
import { useAlert } from "react-alert";
import MetaData from "../labels/MetaData.js";
import Banner from "./Banner.js";
import RatingStar from "../labels/RatingStar.js";
import Product2 from "./Product2.js";
import HomeProducts from "./HomeProducts.js";
import { allProductClearError } from "../../redux/reducers/productReducer.js";
import { LoginLoader } from "../../basics/Spinner.js";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [filterProductCategory, setFilterProductCategory] = useState([]);
  const { loading, products, error } = useSelector((state) => state.products);
  const discountProductsArray = useMemo(
    () =>
      products
        ? products.filter((product) => product.discount >= 15).slice(0, 4)
        : [],
    [products]
  );
  const highRatingProductsArray = useMemo(
    () => (products ? products.filter((product) => product.ratings > 3) : []),
    [products]
  );
  const filterLaptopProductsArray = useMemo(
    () =>
      products
        ? products.filter((product) => product.category === "Laptop")
        : [],
    [products]
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(allProductClearError());
    }
  }, [dispatch, error, alert]);
  useEffect(() => {
    if (!products) return; // Early exit if no products

    setFilterProductCategory({
      Watches: products.filter((product) => product.category === "Watches"),
      Clothes: products.filter((product) => product.category === "Clothes"),
      Footwear: products.filter((product) => product.category === "Footwear"),
      Backpack: products.filter((product) => product.category === "Backpack"),
    });
  }, [products]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const options = {
    rating: 3.5,
    size: 17,
    width: 120,
    display: "flex",
    alignItems: "center",
  };

  return (
    <Fragment>
      <MetaData title="Discover Amazing Deals at Your Ultimate Shopping Destination" />
      {loading ? (
        <LoginLoader />
      ) : (
        <div className={styles["home-main-container"]}>
          <Banner />
          {/* First Container */}
          <div className={styles["home-container-1"]}>
            <div className={styles["today-best-deal"]}>
              <p>Today's Best Deals</p>
            </div>
            <div className={styles["products-container-main"]}>
              <div className={styles["products-container"]}>
                <div className={styles["heading"]}>
                  <p>Save Up to 50%</p>
                </div>
                {discountProductsArray && discountProductsArray.length >= 4 ? (
                  <div className={styles["products"]}>
                    {discountProductsArray.slice(0, 4).map((product, index) => (
                      <Product1 key={index} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className={styles["no-products"]}>
                    <p>No Products Available</p>
                  </div>
                )}
              </div>
              <div className={styles["products-container"]}>
                <div className={styles["heading"]}>
                  <p>Top Rated</p>
                  <RatingStar {...options} />
                </div>
                {highRatingProductsArray &&
                highRatingProductsArray.length >= 4 ? (
                  <div className={styles["products"]}>
                    {highRatingProductsArray
                      .slice(0, 4)
                      .map((product, index) => (
                        <Product2 key={index} product={product} />
                      ))}
                  </div>
                ) : (
                  <div className={styles["no-products"]}>
                    <p>No Products Available</p>
                  </div>
                )}
              </div>
              <div className={styles["products-container"]}>
                <div className={styles["heading"]}>
                  <p>Up To 20% to 50% off | For Men </p>
                </div>
                {filterProductCategory &&
                Object.keys(filterProductCategory).length >= 4 ? (
                  <div className={styles["products"]}>
                    {Object.values(filterProductCategory)
                      .flat()
                      .slice(0, 4)
                      .map((product, index) => (
                        <Product1 key={index} product={product} />
                      ))}
                  </div>
                ) : (
                  <div className={styles["no-products"]}>
                    <p>No Products Available</p>
                  </div>
                )}
              </div>
              <div className={styles["products-container"]}>
                <div className={styles["heading"]}>
                  <p>Save Up to 50%</p>
                </div>
                {filterLaptopProductsArray &&
                filterLaptopProductsArray.length >= 4 ? (
                  <div className={styles["products"]}>
                    {filterLaptopProductsArray
                      .slice(0, 4)
                      .map((product, index) => (
                        <Product1 product={product} key={index} />
                      ))}
                  </div>
                ) : (
                  <div className={styles["no-products"]}>
                    <p>No Products Available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Second Container */}
          <div className={styles["home-container-2"]}>
            <div className={styles["shop-all-products"]}>
              <p> Shop All Products in One Place</p>
            </div>
            <div className={styles["all-products"]}>
              {products &&
                products.map((product) => (
                  <HomeProducts key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
