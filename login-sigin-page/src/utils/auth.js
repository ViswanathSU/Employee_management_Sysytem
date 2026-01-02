import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getLoggedInUser = () => getDecodedToken();
