import axios from "axios";
import Cookies from "js-cookie"; // For accessing the JWT token from cookies

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5005/api"; //'https://sunrise-e-commerce-backend-491954635665.asia-east1.run.app/api';
//

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from wherever you store it (e.g., localStorage, Cookies)
    const token = Cookies.get("jwtToken"); // Assuming you store the token in a cookie named 'jwtToken'
    // Or: const token = localStorage.getItem('jwtToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor for error handling (e.g., redirect on 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: If the token is expired or invalid (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.error("Authentication error: Token expired or invalid.");
      // You might want to clear the token and redirect to login page
      Cookies.remove("jwtToken");
      // Optionally, dispatch a logout action if using a global state manager
      // window.location.href = '/login'; // Or use React Router's navigate
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
