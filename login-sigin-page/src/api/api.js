import axios from "axios";

const api = axios.create({
  baseURL: "https://hard-ingratiating-ila.ngrok-free.dev",
  withCredentials: false,
});

/* ✅ REQUEST INTERCEPTOR — ADD TOKEN */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ✅ RESPONSE INTERCEPTOR — DO NOT AUTO REDIRECT */
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
