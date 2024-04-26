import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearErrors,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  clearErrors2,
  orderDetailsRequest,
  orderDetailssSuccess,
  orderDetailsFail,
  clearErrors3,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFail,
  adminOrdersClearError,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
} from "../reducers/orderReducer";
import { attachTokenToRequests, axiosInstance } from "../../constants";

//create new order
export const createNewOrder = (order) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(createOrderRequest());
    const { data } = await axiosInstance.post(
      `/api/ecommerce/v1/order/new`,
      order
    );
    dispatch(createOrderSuccess(data && data));
  } catch (error) {
    dispatch(createOrderFail(error.response?.data.message));
  }
};
export const clearError = () => (dispatch) => {
  dispatch(clearErrors());
};
// get All orders
export const myOrders = () => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(myOrdersRequest());
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/orders/me`);
    dispatch(myOrdersSuccess(data?.orders));
  } catch (error) {
    dispatch(myOrdersFail(error.response?.data.message));
  }
};
export const clearError2 = () => (dispatch) => {
  dispatch(clearErrors2());
};
// Get Single Order Detail
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequest());
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/order/${id}`);
    dispatch(orderDetailssSuccess(data?.order));
  } catch (error) {
    dispatch(orderDetailsFail(error.response?.data.message));
  }
};

export const clearError3 = () => (dispatch) => {
  dispatch(clearErrors3());
};
// Get All Orders only Asmin can Access
export const adminOrders = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/admin/orders`);
    dispatch(adminAllOrdersSuccess(data?.orders));
  } catch (error) {
    dispatch(adminAllOrdersFail(error.response?.data.message));
  }
};

export const adminOrdersClear = () => (dispatch) => {
  dispatch(adminOrdersClearError());
};

// Delete the Order Only Admin can Access
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axiosInstance.delete(
      `/api/ecommerce/v1/admin/order/${id}`
    );
    dispatch(deleteOrderSuccess(data?.success));
  } catch (error) {
    dispatch(deleteOrderFail(error.response?.data.message));
  }
};
// Update the Order Status
export const updateOrder = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/admin/order/${id}`,
      productData
    );
    dispatch(updateOrderSuccess(data?.success));
  } catch (error) {
    dispatch(updateOrderFail(error.response?.data.message));
  }
};
// Update the Order Only Admin can Access
