import { jwtDecode } from "jwt-decode"; // Correct import statement
import axios from "axios";

// export const BACKEND_URL = "http://localhost:4001";
// export const BACKEND_URL_PROD = "http://localhost:4001";
// export const BACKEND_URL_PROD = "https://production-project-ktl7.onrender.com";
export const BACKEND_URL_PROD = "https://mernstackecommerce.onrender.com/";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL_PROD,
  withCredentials: true, // Include credentials (cookies) for secured tokens
});

// Function to attach token to requests using an interceptor (preferred)
export const attachTokenToRequests = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  if (!isTokenExpired(token)) {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  } else {
    removeToken();
  }
};

// Set up interceptor to automatically include token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    attachTokenToRequests();
    return config;
  },
  (error) => Promise.reject(error)
);

// Custom Hook (optional) for easier integration into components

// Function to check token expiry
export const isTokenExpired = (token) => {
  if (!token) return true; // No token available
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  // const timeLeftInSeconds = decodedToken.exp - currentTime;
  // const timeLeftInDays = Math.ceil(timeLeftInSeconds / (60 * 60 * 24));
  return decodedToken.exp < currentTime; // Check if token expiry time is less than current time
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
  localStorage.removeItem("expirationTime");
};
