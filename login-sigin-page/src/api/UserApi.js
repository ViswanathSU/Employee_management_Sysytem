import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";

/* =========================
   LOGIN → auth/login
========================= */
export const loginUser = async (payload, rememberMe = false) => {
  try {
    // IMPORTANT: send ONLY required fields
    const loginPayload = {
      email: payload.email,
      password: payload.password,
    };

    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      loginPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = res.data?.token;

    if (!token) {
      return { status: "error", message: "Invalid email or password" };
    }

    // ✅ Store token
    Cookies.set("token", token, {
      expires: rememberMe ? 7 : 1,
    });

    return { status: "success" };
  } catch (err) {
    return {
      status: "error",
      message:
        err.response?.data?.message ||
        "Invalid email or password",
    };
  }
};

/* =========================
   REGISTER → auth/register
========================= */
export const registerUser = async (payload) => {
  try {
    await axios.post(
      `${BASE_URL}/auth/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { status: "success" };
  } catch (err) {
    return {
      status: "error",
      message:
        err.response?.data?.message ||
        "Registration failed",
    };
  }
};
