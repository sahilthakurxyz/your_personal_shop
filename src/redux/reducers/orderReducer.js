import { createSlice } from "@reduxjs/toolkit";
const genericClearErrors = (state) => {
  state.error = null;
};
// Create a New Order
const orderCreateSlice = createSlice({
  name: "create order",
  initialState: {
    loading: false,
    error: null,
    order: {},
  },
  reducers: {
    createOrderRequest: (state) => {
      state.loading = false;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.order = null;
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: genericClearErrors,
  },
});
// Get All Orders
const myOrdersSlice = createSlice({
  name: "get orders",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },
  reducers: {
    myOrdersRequest: (state) => {
      state.loading = false;
    },
    myOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrdersFail: (state, action) => {
      state.orders = null;
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors2: genericClearErrors,
  },
});
// Get Single Order Detail
const orderDetailsSlice = createSlice({
  name: "order details",
  initialState: {
    loading: false,
    error: null,
    order: {},
  },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = false;
    },
    orderDetailssSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailsFail: (state, action) => {
      state.order = null;
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors3: genericClearErrors,
  },
});
// Get All the Orders That Admin Can Access
const adminAllOrders = createSlice({
  name: "admin orders",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },
  reducers: {
    adminAllOrdersRequest: (state) => {
      state.loading = true;
    },
    adminAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    adminAllOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminOrdersClearError: (state) => {
      state.error = null;
    },
  },
});
// Delete Single Order That Admin Can Access
const adminDeleteOrder = createSlice({
  name: "delete order",
  initialState: {
    loading: false,
    error: null,
    isDeleted: false,
  },
  reducers: {
    deleteOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderClearError: (state) => {
      state.error = null;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },
  },
});
// Update Single Order That Admin Can Access
const adminUpdateOrder = createSlice({
  name: "update orders",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateOrderRequest: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderClearError: (state) => {
      state.error = null;
    },
    updateOrderReset: (state) => {
      state.isUpdated = false;
    },
  },
});
export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearErrors,
} = orderCreateSlice.actions;
export const { myOrdersRequest, myOrdersSuccess, myOrdersFail, clearErrors2 } =
  myOrdersSlice.actions;
export const {
  orderDetailsRequest,
  orderDetailssSuccess,
  orderDetailsFail,
  clearErrors3,
} = orderDetailsSlice.actions;
export const {
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFail,
  adminOrdersClearError,
} = adminAllOrders.actions;
export const {
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  deleteOrderClearError,
  deleteOrderReset,
} = adminDeleteOrder.actions;
export const {
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  updateOrderClearError,
  updateOrderReset,
} = adminUpdateOrder.actions;
export const orderDetailsReducer = orderDetailsSlice.reducer;
export const orderReducer = orderCreateSlice.reducer;
export const myOrderReducer = myOrdersSlice.reducer;
export const adminAllOrdersReducer = adminAllOrders.reducer;
export const updateOrderReducer = adminUpdateOrder.reducer;
export const deleteOrderReducer = adminDeleteOrder.reducer;
