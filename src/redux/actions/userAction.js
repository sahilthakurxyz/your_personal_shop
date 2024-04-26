import {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  // Admin
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  updateUserRequest,
  deleteUserRequest,
  updateUserSuccess,
  deleteUserSuccess,
  updateUserFail,
  deleteUserFail,
} from "../reducers/userReducer";
import {
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateClearError,
  forgetPasswordRequest,
  forgetPasswordFail,
  forgetPasswordSuccess,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../reducers/profileReducer";
import {
  attachTokenToRequests,
  axiosInstance,
  removeToken,
} from "../../constants";
// login User
export const login = (email, password) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(loginRequest());

    const response = await axiosInstance.post(`/api/ecommerce/v1/loginuser`, {
      email,
      password,
    });
    const token = response.data?.token;
    localStorage.setItem("token", token);
    localStorage.setItem("auth", response.data?.auth);
    dispatch(loginSuccess(response.data?.user));
  } catch (error) {
    // Dispatch the fail action with the error message
    dispatch(loginFail(error.response?.data.message));
  }
};
// Register the user

export const register = (userData) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(registerRequest());

    const { data } = await axiosInstance.post(
      `/api/ecommerce/v1/register`,
      userData
    );
    const token = data?.token;
    localStorage.setItem("token", token);
    localStorage.setItem("auth", data?.auth);
    dispatch(registerSuccess(data?.user));
  } catch (error) {
    dispatch(registerFail(error.response?.data.message));
  }
};
// get user if user is login
export const loadUser = () => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(loadUserRequest());
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/profile`);

    dispatch(loadUserSuccess(data?.user));
  } catch (error) {
    dispatch(loadUserFail(error.response?.data.message));
  }
};
// logout User
export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get(`/api/ecommerce/v1/logoutuser`);

    // Remove token from localStorage

    // Clear AxiosInstance authorization header
    // Remove token
    removeToken();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response?.data.message));
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(updateProfileRequest());
    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/profile/update`,
      userData
    );

    dispatch(updateProfileSuccess(data?.success));
  } catch (error) {
    dispatch(updateProfileFail(error.response?.data.message));
  }
};
// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(updatePasswordRequest());

    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/password/update`,
      passwords
    );
    localStorage.setItem("token", data?.token);
    dispatch(updatePasswordSuccess(data?.success));
  } catch (error) {
    dispatch(updatePasswordFail(error.response?.data.message));
  }
};
// Clear Error for Update
export const updateClearErrors = () => async (dispatch) => {
  dispatch(updateClearError());
};
// Clear Errors for User

//  Forget Password Actions

export const forgetPassword = (email) => async (dispatch) => {
  // console.log("FormData Entries:", Array.from(email.entries()));
  try {
    attachTokenToRequests();
    dispatch(forgetPasswordRequest());

    const { data } = await axiosInstance.post(
      `/api/ecommerce/v1/password/forgot`,
      email
    );

    dispatch(forgetPasswordSuccess(data?.message));
  } catch (error) {
    dispatch(forgetPasswordFail(error.response?.data.message));
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  // console.log("FormData Entries:", Array.from(passwords.entries()));
  try {
    attachTokenToRequests();
    dispatch(resetPasswordRequest());
    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/reset/password/${token}`,
      passwords
    );
    dispatch(resetPasswordSuccess(data?.success));
  } catch (error) {
    dispatch(resetPasswordFail(error.response?.data.message));
  }
};

// Get All Users in Database Only Admin Can  Access

export const adminAllUsersAction = () => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(getAllUsersRequest());
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/admin/users`);
    dispatch(getAllUsersSuccess(data?.users));
  } catch (error) {
    dispatch(getAllUsersFail(error.response?.data.message));
  }
};
// get User Details Only Admin Can Acess
export const getUserDetails = (id) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(userDetailsRequest());
    const { data } = await axiosInstance.get(
      `/api/ecommerce/v1/admin/user/${id}`
    );
    dispatch(userDetailsSuccess(data?.user));
  } catch (error) {
    dispatch(userDetailsFail(error.response?.data.message));
  }
};
// Update User Only Admin can Access
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(updateUserRequest());

    const { data } = await axiosInstance.put(
      `/api/ecommerce/v1/admin/user/${id}`,
      userData
    );
    dispatch(updateUserSuccess(data && data));
  } catch (error) {
    dispatch(updateUserFail(error.response?.data.message));
  }
};
// Delete User  Only Admin Can Access
export const deleteUser = (id) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(deleteUserRequest());
    const { data } = await axiosInstance.delete(
      `/api/ecommerce/v1/admin/user/${id}`
    );
    dispatch(deleteUserSuccess(data && data));
  } catch (error) {
    dispatch(deleteUserFail(error.response?.data.message));
  }
};
