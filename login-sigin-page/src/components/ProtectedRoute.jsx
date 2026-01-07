import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children, adminOnly }) {
  const token = Cookies.get("token");
  if (!token) return <Navigate to="/" />;

  const user = jwtDecode(token);

  if (adminOnly && user.department !== "MD" && user.role !== "ADMIN") {
    return <Navigate to={`/employee/${user.id}`} />;
  }

  return children;
}
