import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  error: null,
  isAuthenticated: false, // Check if user is authenticated
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    registerClearError: (state) => {
      state.error = null;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
      state.isAuthenticated = false;
    },
    loginClearError: (state) => {
      state.error = null;
    },
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    loadUserClearError: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = {};
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutClearError: (state) => {
      state.error = null;
    },
  },
});
// Get ALl User Only Admin Can Access
const adminAllUsers = createSlice({
  name: "all users",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAllUsersClearError: (state) => {
      state.error = null;
    },
  },
});
// Get User Details only Admin Can Access
const getUserDetailSlice = createSlice({
  name: "user details",
  initialState: {
    loading: false,
    error: null,
    user: {},
  },
  reducers: {
    userDetailsRequest: (state) => {
      state.loading = true;
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsClearError: (state) => {
      state.error = null;
    },
  },
});
// Update && Delete User Reducer
const userProfileSlice = createSlice({
  name: "update delete",
  initialState: {
    loading: false,
    error: false,
    isDeleted: false,
    isUpdated: false,
    message: null,
  },
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
      state.message = action.payload.message;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserReset: (state) => {
      state.isUpdated = false;
    },
    updateUserClearError: (state) => {
      state.error = null;
    },
    deleteUserClearError: (state) => {
      state.error = null;
    },
    deleteUserReset: (state) => {
      state.isDeleted = false;
    },
  },
});
export const {
  loginRequest,
  loadUserRequest,
  loginSuccess,
  loadUserSuccess,
  loginFail,
  loadUserFail,
  loadUserClearError,
  logoutSuccess,
  logoutFail,
  loginClearError,
  logoutClearError,
  registerRequest,
  registerSuccess,
  registerFail,
  registerClearError,
} = userSlice.actions;

export const {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  getAllUsersClearError,
} = adminAllUsers.actions;

export const userReducer = userSlice.reducer;
export const adminAllUsersReducer = adminAllUsers.reducer;
// Admin Actons Here
export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsClearError,
} = getUserDetailSlice.actions;
export const {
  updateUserRequest,
  deleteUserRequest,
  updateUserSuccess,
  deleteUserSuccess,
  updateUserFail,
  deleteUserFail,
  updateUserReset,
  updateUserClearError,
  deleteUserClearError,
  deleteUserReset,
} = userProfileSlice.actions;
// Admin Reducer Here
export const getUserDetailsReducer = getUserDetailSlice.reducer;
export const userProfileReducer = userProfileSlice.reducer;
