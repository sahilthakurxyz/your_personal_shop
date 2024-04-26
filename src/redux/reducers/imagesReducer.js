import { createSlice } from "@reduxjs/toolkit";
const getBackgroundImages = createSlice({
  name: "images",
  initialState: {
    loading: false,
    error: null,
    backImages: [],
  },
  reducers: {
    getImageRequest: (state) => {
      state.loading = true;
    },
    getImageSuccess: (state, action) => {
      state.loading = false;
      state.backImages = action.payload;
    },
    getImageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getImageClearError: (state) => {
      state.error = null;
    },
  },
});
const createImage = createSlice({
  name: "create images",
  initialState: {
    loading: false,
    error: null,
    images: {},
    success: false,
  },
  reducers: {
    imageRequest: (state) => {
      state.loading = true;
    },
    imageSuccess: (state, action) => {
      state.loading = false;
      state.images = action.payload.backImages;
      state.success = action.payload.success;
    },
    imageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    imageClearError: (state) => {
      state.error = null;
    },
    imageReset: (state) => {
      state.success = false;
    },
  },
});
export const {
  getImageRequest,
  getImageSuccess,
  getImageFail,
  getImageClearError,
} = getBackgroundImages.actions;
export const {
  imageRequest,
  imageSuccess,
  imageFail,
  imageClearError,
  imageReset,
} = createImage.actions;
export const getBackgroundImagesReducer = getBackgroundImages.reducer;

export const createImageReducer = createImage.reducer;
