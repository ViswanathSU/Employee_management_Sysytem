import axios from "axios";

const api = axios.create({
  baseURL: "https://hard-ingratiating-ila.ngrok-free.dev",
});

/* REQUEST INTERCEPTOR — ADD TOKEN */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("TOKEN IN INTERCEPTOR:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
