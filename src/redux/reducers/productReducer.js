import { createSlice } from "@reduxjs/toolkit";
// Get All Products
const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
    productCount: 0,
    productsPerPage: 10,
  },
  reducers: {
    allProductRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    allProductSuccess: (state, action) => {
      if (action.payload && action.payload.success && action.payload.products) {
        state.products = action.payload.products;
        state.loading = false;
        state.productCount = action.payload.productCount;
        state.productsPerPage = action.payload.productsPerPage;
        state.filterProductsCount = action.payload.filterProductsCount;
      } else {
        console.error(
          "Invalid payload structure for allProductSuccess:",
          action.payload
        );
      }
      return state;
    },

    allProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    allProductClearError: (state) => {
      state.error = null;
    },
  },
});
//  Get All Products That Only Admin Can Access
const adminProductsSlice = createSlice({
  name: "admin products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {
    adminProductsRequest: (state) => {
      state.loading = true;
    },
    adminProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    adminProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminProductsClearError: (state) => {
      state.error = null;
    },
  },
});
// Product Details Reducer
const productDetail = createSlice({
  name: "product detail",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {
    productDetailRequest: (state, action) => {
      state.loading = true;
      state.product = {};
    },
    productDetailSuccess: (state, action) => {
      if (action.payload && action.payload.success && action.payload.product) {
        state.loading = false;
        state.product = action.payload.product;
      } else {
        console.error(
          "Invalid payload structure for allProductSuccess:",
          action.payload
        );
      }
    },

    productDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductDetailErrors: (state) => {
      state.error = null;
    },
  },
});
// Create New Product That Only Admin Can Access
const createProductSlice = createSlice({
  name: "create product",
  initialState: {
    loading: false,
    error: null,
    success: false,
    product: {},
  },
  reducers: {
    newProductRequest: (state) => {
      console.log("created");
      state.loading = true;
    },
    newProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    newProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset: (state) => {
      state.success = false;
    },
    clearErrorsNewProduct: (state) => {
      state.error = null;
    },
  },
});
// Delete the Product That only Admin Can Access
const deleteProductSlice = createSlice({
  name: "delete product",
  initialState: {
    loading: false,
    error: null,
    isDeleted: false,
  },
  reducers: {
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorsDeleteProduct: (state) => {
      state.error = null;
    },
    deleteProductReset: (state) => {
      state.isDeleted = false;
    },
  },
});
const updateProductSlice = createSlice({
  name: "update product",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorsUpdateProduct: (state) => {
      state.error = null;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
    },
  },
});
// Review to Product Publically
const productReview = createSlice({
  name: "product review",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    productReviewRequest: (state, action) => {
      state.loading = true;
    },
    productReviewSuccess: (state, action) => {
      if (action.payload && action.payload.success) {
        state.loading = false;
        state.success = action.payload;
      } else {
        console.error(
          "Invalid payload structure for New Rewiew:",
          action.payload
        );
      }
    },
    productReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorsReview: (state) => {
      state.error = null;
    },
    resetReview: (state) => {
      state.success = false;
    },
    clearProductReview: (state) => {
      state.error = null;
    },
  },
});
const getAllReviews = createSlice({
  name: "product reviews",
  initialState: {
    loading: false,
    error: null,
    reviews: [],
  },
  reducers: {
    getReviewsRequest: (state) => {
      state.loading = true;
    },
    getReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    getReviewsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.reviews = [];
    },
    clearErrorsReviews: (state) => {
      state.error = null;
    },
  },
});
const deleteReview = createSlice({
  name: "product reviews",
  initialState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    deleteReviewRequest: (state) => {
      state.loading = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.isDeleted = action.payload;
    },
    deleteReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorDeleteReview: (state) => {
      state.error = null;
    },
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },
  },
});
// all product actions
export const {
  allProductRequest,
  allProductSuccess,
  allProductFail,
  allProductClearError,
} = productSlice.actions;
// admin all products action
export const {
  adminProductsSuccess,
  adminProductsRequest,
  adminProductsFail,
  adminProductsClearError,
} = adminProductsSlice.actions;
// product details actions
export const {
  clearProductDetailErrors,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} = productDetail.actions;
// admin create new Product actons
export const {
  newProductRequest,
  newProductSuccess,
  newProductFail,
  clearErrorsNewProduct,
  newProductReset,
} = createProductSlice.actions;
//  admin delete product actions
export const {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  clearErrorsDeleteProduct,
  deleteProductReset,
} = deleteProductSlice.actions;
// admin update product actions
export const {
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  clearErrorsUpdateProduct,
  updateProductReset,
} = updateProductSlice.actions;
// review product actions
export const {
  productReviewRequest,
  productReviewSuccess,
  productReviewFail,
  clearErrorsReview,
  resetReview,
  clearProductReview,
} = productReview.actions;
export const {
  getReviewsRequest,
  getReviewsSuccess,
  getReviewsFail,
  clearErrorsReviews,
} = getAllReviews.actions;
export const {
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  deleteReviewReset,
  clearErrorDeleteReview,
} = deleteReview.actions;
export const getAllReviewsReducer = getAllReviews.reducer;
export const deleteReviewReducer = deleteReview.reducer;
export const productsReducer = productSlice.reducer;
export const adminProductsReducer = adminProductsSlice.reducer;
export const productDetailReducer = productDetail.reducer;
export const newProductReducer = createProductSlice.reducer;
export const deleteProductReducer = deleteProductSlice.reducer;
export const updateProductReducer = updateProductSlice.reducer;
export const productReviewReducer = productReview.reducer;
