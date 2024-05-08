import React, { Fragment, useEffect } from "react";
import styles from "./myOrders.module.css";
import { MdOutlineLaunch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearError2, myOrders } from "../../redux/actions/orderAction";
import { DataGrid } from "@mui/x-data-grid";
import { useAlert } from "react-alert";
import { Box, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { LoginLoader } from "../../basics/Spinner";
import ScreenVisual from "../labels/ScreenVisual";
import MetaData from "../labels/MetaData";
import Header from "../layouts/Header";

const MyOrders = () => {
  const greenColor = styles["greenColor"];
  const redColor = styles["redColor"];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, orders } = useSelector((state) => state.getOrders);
  const { user } = useSelector((state) => state.user);
  const columns = [
    { field: "_id", headersName: "Product Id", minWidth: 200, flex: 0.2 },
    {
      field: "status",
      headersName: "Status",
      minWidth: 80,
      flex: 0.1,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? greenColor : redColor;
      },
    },
    {
      field: "itemQty",
      headersName: "Items Qty",
      minWidth: 80,
      flex: 0.1,
      type: "number",
    },
    {
      field: "amount",
      headersName: "Amount",
      minWidth: 250,
      flex: 0.2,
      type: "number",
    },
    {
      field: "actions",
      headersName: "Actions",
      minWidth: 160,
      flex: 0.2,
      type: "number",
      renderCell: (params) => {
        return (
          <Link to={params.row._id}>
            <MdOutlineLaunch />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        _id: item._id,
        status: item.orderStatus,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError2());
    }
  }, [dispatch, alert, error, loading]);
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <LoginLoader />
      ) : (
        <Fragment>
          <div className={styles["myOrder-main"]}>
            <Header />
            <ScreenVisual />
            <MetaData title={`${user.name}'s orders`} />
            <Box sx={{ height: 500, width: "100%", mt: 8 }}>
              <Typography sx={{ textAlign: "center", mt: 5, mb: 2 }}>
                Manage Orders
              </Typography>
              <div className={styles["myOrders-page"]}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(rows) => rows._id}
                  pageSizeOptions={[10, 100]}
                  disableRowSelectionOnClick
                  className={styles["data-grid-main-container"]}
                />
              </div>
              <Typography
                className={styles["heading-owner"]}
              >{`${user.name}'s Orders`}</Typography>
            </Box>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
