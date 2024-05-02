import React, { Fragment, useEffect } from "react";
import styles from "./ordersDetails.module.css";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../redux/actions/orderAction";
import MetaData from "../labels/MetaData";
import ScreenVisual from "../labels/ScreenVisual";
import { Loader } from "../../basics/Spinner";
import { useAlert } from "react-alert";
import { clearErrors3 } from "../../redux/reducers/orderReducer";
const OrdersDetail = () => {
  const greenColor = styles["greenColor"];
  const redColor = styles["redColor"];
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { shippingInfo, orderItems } = order ? order : {};
  let address = "";
  if (shippingInfo) {
    address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors3());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      <MetaData title="Order Details" />
      <ScreenVisual />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles["orderDetails-order-container"]}>
          <div>
            <div className={styles["orderDetails-shipping-area"]}>
              <Typography>Shipping Info</Typography>
              {shippingInfo && (
                <div className={styles["orderDetails-shipping-area-box"]}>
                  <div>
                    <p>Name:</p>
                    <span>{user?.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo?.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span className={styles["address"]}>{address}</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles["orderDetails-shipping-area"]}>
              <Typography>Payment Info</Typography>
              <div className={styles["orderDetails-shipping-area-box"]}>
                {order?.paymentInfo && (
                  <div>
                    <p
                      className={
                        order.paymentInfo.status === "succeeded"
                          ? greenColor
                          : redColor
                      }
                    >
                      {order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID YET"}
                    </p>
                  </div>
                )}
                {order && order.taxPrice && (
                  <div>
                    <p>Amount:</p>

                    <span>
                      included Tax ({order.taxPrice.toFixed(0)}):{" "}
                      {order.totalPrice && order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles["orderDetails-cartItems-container"]}>
              <Typography>Cart Items:</Typography>
              <div className={styles["orderDetails-cartItems-box"]}>
                {order && orderItems ? (
                  orderItems.map((item) => (
                    <div key={item.productId}>
                      <img src={item.image} alt="" />
                      <Link className={styles["link"]}>
                        <div>
                          <MdOutlineDriveFileRenameOutline />
                          <p className={styles["name"]}>{item.name}</p>
                          <div className={styles["detail"]}>
                            <p className={styles["quantity"]}>
                              {item.quantity}
                            </p>{" "}
                            <p> X</p> <p>{item.price.toFixed(2)}</p> ={" "}
                            <p>{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>Cart is Empty</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className={styles["orderSummary"]}>
              <Typography>Order Status</Typography>
              <div>
                <p>
                  {order && order?.orderStatus === "Processing"
                    ? "Processing..."
                    : order?.orderStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrdersDetail;
