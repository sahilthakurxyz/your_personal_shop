import { axiosInstance } from "../../constants";
import {
  allProductRequest,
  allProductSuccess,
  allProductFail,
  adminProductsSuccess,
  adminProductsRequest,
  adminProductsFail,
  adminProductsClearError,
  productDetailSuccess,
  productDetailRequest,
  productDetailFail,
  clearProductDetailErrors,
  productReviewRequest,
  productReviewSuccess,
  productReviewFail,
  clearErrorsReview,
  newProductSuccess,
  newProductFail,
  newProductRequest,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  getReviewsRequest,
  getReviewsSuccess,
  getReviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} from "../reducers/productReducer";

import axios from "axios";
//  all products Action
export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 600000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch(allProductRequest());
      let reqLink = `/api/ecommerce/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        reqLink = `/api/ecommerce/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axiosInstance.get(reqLink);

      dispatch(allProductSuccess(data));
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 500
      ) {
        dispatch(allProductFail(error.response.data.message));
      } else {
        dispatch(allProductFail("An error occurred."));
      }
    }
  };
//Admin  all products Action
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axiosInstance.get(
      `/api/ecommerce/v1/admin/products`
    );

    dispatch(adminProductsSuccess(data.products));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};
export const clearAllErrors = () => async (dispatch) => {
  dispatch(adminProductsClearError());
};
// product details Action
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailRequest());
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/product/${id}`);
    dispatch(productDetailSuccess(data));
  } catch (error) {
    dispatch(productDetailFail(error.response.data.message));
  }
};
export const clearAllErrors2 = () => async (dispatch) => {
  dispatch(clearProductDetailErrors());
};
// Admin Create Product Action
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const { data } = await axiosInstance.post(
      `/api/ecommerce/v1/admin/product/new`,
      productData
    );
    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};
// Delete Product Action

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const { data } = await axiosInstance.delete(
      `/api/ecommerce/v1/admin/product/${id}`
    );
    dispatch(deleteProductSuccess(data.success));
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};
// Update Product Acion
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/admin/product/${id}`,
      productData
    );
    dispatch(updateProductSuccess(data.success));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};
//new Review Product Action
export const createNewReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(productReviewRequest());
    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/review`,
      reviewData
    );

    dispatch(productReviewSuccess(data));
  } catch (error) {
    dispatch(productReviewFail(error.response.data.message));
  }
};

export const clearReviewError = () => (dispatch) => {
  dispatch(clearErrorsReview());
};

// Get All Reviews of Product
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch(getReviewsRequest());
    const { data } = await axiosInstance.get(
      `/api/ecommerce/v1/reviews?id=${productId}`
    );

    dispatch(getReviewsSuccess(data.reviews));
  } catch (error) {
    dispatch(getReviewsFail(error.response.data.message));
  }
};
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    const { data } = await axiosInstance.delete(
      `/api/ecommerce/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch(deleteReviewSuccess(data.success));
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};
