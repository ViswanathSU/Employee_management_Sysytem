import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

/* =====================
   LOGOUT
===================== */
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("userEmail");
  window.location.href = "/";
};

/* =====================
   AUTO LOGOUT (JWT)
===================== */
export const autoLogout = () => {
  const token = Cookies.get("token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return;

    const expiryTime = decoded.exp * 1000; // seconds → ms
    const timeout = expiryTime - Date.now();

    if (timeout <= 0) {
      logout();
    } else {
      setTimeout(() => {
        logout();
      }, timeout);
    }
  } catch (error) {
    logout();
  }
};
