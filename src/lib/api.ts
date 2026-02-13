import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../config/endpoints";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (optional: trigger logout)
      Cookies.remove("admin_token");
      Cookies.remove("admin_user");
    }
    return Promise.reject(error);
  },
);

export default api;
