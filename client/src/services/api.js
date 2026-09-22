import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    let token = null;

    // =========================
    // ADMIN APIs
    // =========================
    if (
      url.startsWith("/admin") ||
      url.startsWith("/auth/admin") ||
      url.startsWith("/doctors") ||
      url.startsWith("/appointments/all") ||
      url.startsWith("/locations") ||
      url.startsWith("/specializations")
    ) {
      token = localStorage.getItem("adminToken");
    }

    // =========================
    // USER APIs
    // =========================
    else if (
      url.startsWith("/users") ||
      url === "/appointments" ||
      url.startsWith("/appointments/my") ||
      url.startsWith("/reviews")
    ) {
      token = localStorage.getItem("userToken");
    }

    // =========================
    // ATTACH TOKEN
    // =========================
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // =========================
    // FORMDATA
    // =========================
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;