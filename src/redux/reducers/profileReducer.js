import { createSlice } from "@reduxjs/toolkit";
const genericRequestReducer = (state) => {
  state.loading = true;
};
const genericSuccessReducer = (state, action) => {
  state.loading = false;
  state.isUpdated = action.payload;
};
const genericFailReducer = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const genericResetReducer = (state) => {
  state.isUpdated = false;
};
const profileSlice = createSlice({
  name: "update user profile & Password",
  initialState: {
    isUpdated: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateProfileRequest: genericRequestReducer,
    updatePasswordRequest: genericRequestReducer,
    updateProfileSuccess: genericSuccessReducer,
    updatePasswordSuccess: genericSuccessReducer,
    updateProfileFail: genericFailReducer,
    updatePasswordFail: genericFailReducer,
    updateProfileReset: genericResetReducer,
    updatePasswordReset: genericResetReducer,
    updateClearError: (state) => {
      state.error = null;
    },
  },
});
//  Forgot & Reset Password Reducers
const genericForgetPasswordRequest = (state) => {
  state.loading = true;
};
const genericForgetPasswordFail = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const forgetSlice = createSlice({
  name: "forget password",
  initialState: {
    loading: false,
    error: null,
    message: null,
    success: null,
  },
  reducers: {
    forgetPasswordRequest: genericForgetPasswordRequest,
    resetPasswordRequest: genericForgetPasswordRequest,
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    forgetPasswordFail: genericForgetPasswordFail,
    resetPasswordFail: genericForgetPasswordFail,

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileReset,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updatePasswordReset,
  updateClearError,
} = profileSlice.actions;
export const {
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearError,
} = forgetSlice.actions;
export const profileReducer = profileSlice.reducer;
export const forgetReducer = forgetSlice.reducer;
