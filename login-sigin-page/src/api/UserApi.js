import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";

/* =========================
   LOGIN → auth/login
========================= */
export const loginUser = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    const token = res.data?.token;
    if (!token) throw new Error("Token missing");

    // SINGLE SOURCE OF TRUTH
    Cookies.remove("token");
    Cookies.set("token", token, { expires: 1 });

    return { status: "success" };
  } catch (err) {
    return {
      status: "error",
      message: err.response?.data?.message || "Login failed",
    };
  }
};

/* =========================
   REGISTER → auth/register
========================= */
export const registerUser = async (payload) => {
  try {
    await axios.post(`${BASE_URL}/auth/register`, payload, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    return { status: "success" };
  } catch (err) {
    return {
      status: "error",
      message:
        err.response?.data?.message || "Registration failed",
    };
  }
};
