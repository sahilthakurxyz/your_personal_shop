import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./home.module.css";
import Product1 from "./Product1.js";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productAction.js";
import { useAlert } from "react-alert";
import MetaData from "../labels/MetaData.js";
import Banner from "./Banner.js";
import RatingStar from "../labels/RatingStar.js";
import Product2 from "./Product2.js";
import HomeProducts from "./HomeProducts.js";
import { allProductClearError } from "../../redux/reducers/productReducer.js";
import OnceLoad from "../../basics/OnceLoad.js";
import { debounce } from "lodash";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  const { loading, products, error } = useSelector(
    (state) => state.products,
    shallowEqual
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(allProductClearError());
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!products) return {};

    const discountProductsArray = products
      .filter((product) => product.discount >= 15)
      .slice(0, 4);
    const highRatingProductsArray = products
      .filter((product) => product.ratings > 3)
      .slice(0, 4);
    const filterLaptopProductsArray = products
      .filter((product) => product.category === "Laptop")
      .slice(0, 4);
    const filterProductCategory = {
      Watches: products.filter((product) => product.category === "Watches"),
      Clothes: products.filter((product) => product.category === "Clothes"),
      Footwear: products.filter((product) => product.category === "Footwear"),
      Backpack: products.filter((product) => product.category === "Backpack"),
    };

    return {
      discountProductsArray,
      highRatingProductsArray,
      filterLaptopProductsArray,
      filterProductCategory,
    };
  }, [products]);

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 300);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateSize = useCallback(() => (width <= 700 ? 14 : 13), [width]);

  const options = {
    size: calculateSize(),
    width: 120,
    display: "flex",
    alignItems: "center",
  };

  return (
    <Fragment>
      <MetaData title="Discover Amazing Deals at Your Ultimate Shopping Destination" />
      {loading ? (
        <OnceLoad />
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
                {filteredProducts.discountProductsArray.length >= 4 ? (
                  <div className={styles["products"]}>
                    {filteredProducts.discountProductsArray.map(
                      (product, index) => (
                        <Product1 key={index} product={product} />
                      )
                    )}
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
                {filteredProducts.highRatingProductsArray.length >= 4 ? (
                  <div className={styles["products"]}>
                    {filteredProducts.highRatingProductsArray
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
                {Object.keys(filteredProducts.filterProductCategory).length >=
                4 ? (
                  <div className={styles["products"]}>
                    {Object.values(filteredProducts.filterProductCategory)
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
                {filteredProducts.filterLaptopProductsArray.length >= 4 ? (
                  <div className={styles["products"]}>
                    {filteredProducts.filterLaptopProductsArray.map(
                      (product, index) => (
                        <Product1 product={product} key={index} />
                      )
                    )}
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
