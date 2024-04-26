import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  productsReducer,
  productDetailReducer,
  productReviewReducer,
  adminProductsReducer,
  newProductReducer,
  deleteProductReducer,
  updateProductReducer,
  getAllReviewsReducer,
  deleteReviewReducer,
} from "../reducers/productReducer";
import {
  adminAllUsersReducer,
  getUserDetailsReducer,
  userProfileReducer,
  userReducer,
} from "../reducers/userReducer";
import { forgetReducer, profileReducer } from "../reducers/profileReducer";
import { addCartReducer } from "../reducers/cartReducer";
import {
  adminAllOrdersReducer,
  deleteOrderReducer,
  myOrderReducer,
  orderDetailsReducer,
  orderReducer,
  updateOrderReducer,
} from "../reducers/orderReducer";
import {
  createImageReducer,
  getBackgroundImagesReducer,
} from "../reducers/imagesReducer";
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgetPassword: forgetReducer,
    cart: addCartReducer,
    newOrder: orderReducer,
    getOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: productReviewReducer,
    adminProducts: adminProductsReducer,
    adminNewProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    adminAllOrders: adminAllOrdersReducer,
    adminOrderUpdate: updateOrderReducer,
    adminOrderDelete: deleteOrderReducer,
    adminAllUsers: adminAllUsersReducer,
    adminUserDetails: getUserDetailsReducer,
    adminUpdateDeleteUser: userProfileReducer,
    productReviews: getAllReviewsReducer,
    deleteReview: deleteReviewReducer,
    createImages: createImageReducer,
    backgroundImages: getBackgroundImagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
