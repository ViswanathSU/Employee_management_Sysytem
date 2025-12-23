import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://06414ab0eba6.ngrok-free.app";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REGISTER USER
========================= */
export const registerUser = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);

    return {
      status: "success",
      message: response.data?.msg || "Registered successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Registration failed",
    };
  }
};

/* =========================
   LOGIN USER
========================= */
export const loginUser = async (payload, rememberMe = false) => {
  try {
    const response = await api.post("/auth/login", payload);

    const { token, user, msg } = response.data;

    if (!token) {
      throw new Error("Token not received");
    }

    // Store JWT
    Cookies.set("token", token, {
      expires: rememberMe ? 7 : 1,
      secure: true,
      sameSite: "strict",
    });

    // Remember email
    if (rememberMe) {
      Cookies.set("userEmail", payload.email, { expires: 7 });
    } else {
      Cookies.remove("userEmail");
    }

    return {
      status: "success",
      token,
      user,
      message: msg || "Login successful",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Invalid credentials",
    };
  }
};
