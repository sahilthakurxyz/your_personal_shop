import React, { useState, useEffect, useMemo } from "react";
import styles from "./banner.module.css";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { getImages } from "../../redux/actions/imagesAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getImageClearError } from "../../redux/reducers/imagesReducer";

const Banner = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, backImages } = useSelector((state) => state.backgroundImages);
  const images = useMemo(
    () => (backImages.length > 0 ? backImages[0].images : []),
    [backImages]
  );
  const [currImageIndex, setCurrImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);
  useEffect(() => {
    if (error) {
      alert.error(getImageClearError());
    }
    dispatch(getImages());
  }, [dispatch, alert, error]);
  const handleNextImage = () => {
    setCurrImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className={styles["homeHeader"]}>
      {backImages && images.length > 0 && (
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${images && images[currImageIndex].url})`,
          }}
        >
          <div className={styles["left"]} onClick={handlePrevImage}>
            <FaAngleLeft />
          </div>
          <div className={styles["center"]}> </div>
          <div className={styles["right"]} onClick={handleNextImage}>
            <FaAngleRight />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
