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
      { headers: { "Content-Type": "application/json" } }
    );

    const token = res.data?.token;
    if (!token) throw new Error("Token missing");

    localStorage.setItem("token", token);
    console.log("LOGIN TOKEN:", token);

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
