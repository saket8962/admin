export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },
  PRODUCTS: {
    BASE: "/products",
    BULK_DELETE: "/products/bulk",
  },
  CATEGORIES: {
    BASE: "/categories",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
  USERS: {
    BASE: "/users",
    STATS: "/users/stats",
  },
  UPLOAD: "/upload",
  BLOGS: {
    BASE: "/blogs",
  },
} as const;

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
