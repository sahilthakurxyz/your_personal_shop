import React, { Fragment, useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import ProductReviews from "./ProductReviews.js";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { GrSecure } from "react-icons/gr";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@material-ui/core";

import { addItemsCart } from "../../redux/actions/cartAction.js";
import { Rating } from "@mui/material";
import {
  clearProductDetailErrors,
  clearProductReview,
  resetReview,
} from "../../redux/reducers/productReducer.js";
import {
  createNewReview,
  getProductDetails,
} from "../../redux/actions/productAction.js";
import MetaData from "../labels/MetaData.js";
import RatingStar from "../labels/RatingStar.js";
import ScreenVisual from "../labels/ScreenVisual.js";
import { LoginLoader } from "../../basics/Spinner.js";

const ProductDetail = () => {
  const [width, setWidth] = useState(window.innerWidth); // Initial width state
  const { loading, product, error } = useSelector((state) => state.product);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const { name, _id, description, price, reviews, ratings, discount, stock } =
    product;
  const { user } = useSelector((state) => state.user);

  const className =
    stock > 0 ? styles["product-container"] : styles["product-redColor"];
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const onSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", reviewRating);
    myForm.set("comment", reviewContent);
    myForm.set("productId", id);
    myForm.set("profile", user.avatar?.url);
    dispatch(createNewReview(myForm));
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearProductDetailErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfull");
      dispatch(resetReview());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearProductReview());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, reviewError, alert, success]);

  // All local module object defined here
  const maxQuantity = Math.min(stock, 10);
  const quantityOptions = Array.from(
    { length: maxQuantity },
    (_, index) => index + 1
  );
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;
  const handleCartSubmit = () => {
    if (stock < 1) {
      alert.error("Out of Stock");
      return;
    }

    dispatch(addItemsCart(id, selectedQuantity));
    alert.success("add Items to cart");
  };
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
  const handleByNow = () => {
    if (stock < 1) {
      alert.error("Out of Stock");
      return;
    }
    alert.error("This Option is Not Available for Now");
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  // Handle All functions Here
  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value, 10));
  };
  const handleReviewOpenClose = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      {loading ? (
        <LoginLoader />
      ) : (
        <div className={className} key={_id}>
          <ScreenVisual />
          <MetaData title={`Explore [${name}] - Details, Reviews, and More`} />
          <div className={styles["product-details-container"]}>
            <div className={styles["product-details"]}>
              <div className={styles["product-details-left"]}>
                <div className={styles["carousel-container"]}>
                  <Slider {...settings}>
                    {product.images &&
                      product.images.map((item, i) => (
                        <div
                          key={item._id}
                          className={styles["carousel-slide"]}
                        >
                          <img
                            src={item.url}
                            alt={`${i} Slide`}
                            key={item._id}
                            className={`${styles["carousel-image"]} ${
                              currentSlide === i ? styles.active : ""
                            }`}
                          />
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
              <div className={styles["product-details-center"]}>
                <div className={styles["item-details-container"]}>
                  <div className={styles["cart_product_info"]}>
                    <p className={styles["name"]}>{name}</p>
                    <p className={styles["product_id"]}>{id}</p>
                    <div className={styles["price"]}>
                      <FaRupeeSign />
                      {price}
                      <span>
                        <IoPricetagOutline />
                      </span>
                    </div>
                  </div>
                  <div className={styles["items-details"]}>
                    <div className={styles["title-section-descripton"]}>
                      <span>Descripton</span> : {description}
                    </div>
                    <div className={styles["product_rating"]}>
                      <RatingStar {...options} rating={ratings} />

                      {reviews && reviews.length && (
                        <p>{`(${reviews.length} Reviews)`}</p>
                      )}
                    </div>
                  </div>
                  {discount > 0 ? (
                    <div className={styles["special_deals_container"]}>
                      <div className={styles["special_deal_box"]}>
                        <div className={styles["special_deal"]}>
                          <span>Deal of the Day</span>
                          {discount > 0 ? (
                            <div className={styles["price-tag"]}>
                              <div className={styles["original-price"]}>
                                <FaRupeeSign />
                                <p> {price}</p>
                              </div>
                              <div className={styles["cut-line"]}></div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles["product_price_off"]}>
                          {discount > 0 ? (
                            <p
                              className={styles["discount"]}
                            >{`${discount} % off `}</p>
                          ) : (
                            ""
                          )}
                          <div className={styles["product_price"]}>
                            <FaRupeeSign />
                            <p>
                              {discountedPrice
                                ? discountedPrice.toFixed(2)
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles["create-review"]}>
                    <p>
                      Your opinion matters! Write a review and let your voice be
                      heard.
                    </p>
                    <button onClick={handleReviewOpenClose}>
                      Tell Us What You Think
                    </button>
                  </div>
                  {stock > 0 && (
                    <Dialog
                      open={open}
                      aria-labelledby="simple-dialog-title"
                      onClose={handleReviewOpenClose}
                    >
                      <DialogTitle>Create Your Review</DialogTitle>
                      <DialogContent className={styles["reviews-container"]}>
                        <Rating
                          name="simple-controlled"
                          value={reviewRating}
                          onChange={(e, newValue) => setReviewRating(newValue)}
                        />
                        <textarea
                          id="review-textarea"
                          className={styles["reviews-textArea"]}
                          rows="5"
                          cols="20"
                          placeholder="Insert Your Review"
                          value={reviewContent}
                          onChange={(e) => {
                            setReviewContent(e.target.value);
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="secondary"
                          onClick={handleReviewOpenClose}
                        >
                          Cancel
                        </Button>
                        <Button color="primary" onClick={onSubmitHandler}>
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}
                </div>
              </div>
              <div className={styles["product_details_right"]}>
                <div className={styles["user_address"]}>
                  <div>
                    <FaLocationDot />
                  </div>
                  <p className={styles["address"]}>
                    delivering the product to you location in 5 days
                  </p>
                </div>
                {stock > 0 && (
                  <div className={styles["quantity-dropdown-container"]}>
                    <label htmlFor="quantity" className={styles.label}>
                      Select Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                      className={styles["dropdown"]}
                    >
                      {quantityOptions.map((quantity) => (
                        <option
                          key={quantity}
                          value={quantity}
                          className={styles["selected"]}
                        >
                          {quantity}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className={styles["total-price"]}>
                  <p>Your Total</p>
                  <div>
                    {discountedPrice && selectedQuantity
                      ? (discountedPrice * selectedQuantity).toFixed(2)
                      : "N/A"}
                  </div>
                </div>
                <div className={styles["stock-status"]}>
                  <span>Status: </span>
                  {"  "}
                  {stock > 0 ? (
                    <p className={styles["inStock"]}>In Stock</p>
                  ) : (
                    <p className={styles["outStock"]}>Out of Stock</p>
                  )}
                </div>
                <hr className={styles["lines"]} />
                <div className={styles["cart_buttons"]}>
                  <button
                    className={styles["add_to_cart"]}
                    onClick={handleCartSubmit}
                  >
                    Add to Cart
                  </button>
                  <button className={styles.buy_now} onClick={handleByNow}>
                    Buy Now
                  </button>
                </div>
                <div className={styles["secure-payment"]}>
                  <span>
                    <GrSecure style={{ fontSize: "17px", color: "#04145e" }} />
                  </span>
                  <span>secure payment method</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["review-container"]}>
            <div className={styles["review-heading"]}>Reviews</div>
            {reviews && reviews[0] ? (
              <div className={styles["product-reviews"]}>
                {reviews.map((reviewer) => (
                  <ProductReviews key={reviewer._id} review={reviewer} />
                ))}
              </div>
            ) : (
              <p className={styles["empty-review"]}>No Reviews Yet</p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetail;
