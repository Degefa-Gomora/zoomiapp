
import axios from "axios";

// Define your backend URLs
const DEVELOPMENT_BACKEND_URL = "http://localhost:5001/api"; 
const PRODUCTION_BACKEND_URL = "https://zoom.degefagomora.com/api"; 

// Determine the base URL based on the environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? DEVELOPMENT_BACKEND_URL
    : PRODUCTION_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with the request
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Get the token from local storage (or wherever you store it)
    const token = localStorage.getItem("authToken"); // Assuming you store it as 'authToken'

    // 2. If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Use 'Bearer' for JWTs
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);