import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import axios from "axios";

// export const BACKEND_URL = "http://localhost:4001";
// export const BACKEND_URL_PROD = "http://localhost:4001";
export const BACKEND_URL_PROD = "https://mernstackecommerce.onrender.com/";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL_PROD,
  withCredentials: true, // Include credentials (cookies) for secured tokens
});

// Function to attach token to requests using an interceptor (preferred)
export const attachTokenToRequests = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true; // No token available
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  return decodedToken.exp < currentTime; // Check if token expiry time is less than current time
};

// Function to refresh token
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.get("/api/ecommerce/v1/refreshToken");
    const newToken = response.data.token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Function to handle token expiry and refresh
export const handleTokenRefresh = async () => {
  if (isTokenExpired()) {
    try {
      const newToken = await refreshToken();
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Handle token refresh failure, e.g., redirect to login page
    }
  }
};

export const useTokenInterceptor = () => {
  useEffect(() => {
    attachTokenToRequests();
  }, []);
};
// Call handleTokenRefresh when the application loads or whenever a protected route is accessed
export const useTokenRefresh = () => {
  useEffect(() => {
    handleTokenRefresh();
  }, []);
};
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
};
