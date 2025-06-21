import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Ensure credentials are included
    config.withCredentials = true;
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Response error:", error);

    // Don't redirect if it's a logout request or if we're already on login/register pages
    const isLogoutRequest = error.config?.url?.includes("/logout");
    const isAuthPage =
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/";

    if (error.response?.status === 401 && !isLogoutRequest && !isAuthPage) {
      // Only redirect to login if it's not a logout request and not already on auth pages
      window.location.href = "/login";
    } else if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
    } else if (error.response?.status === 400) {
      console.error("Bad request:", error.response.data);
      // If it's an authentication error, redirect to login (but not for logout requests)
      if (
        error.response.data.message?.includes("not authenticated") &&
        !isLogoutRequest &&
        !isAuthPage
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
