import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  const user = jwtDecode(token);

  if (adminOnly && user.department !== "MD" && user.role !== "ADMIN") {
    return <Navigate to={`/employee/${user.id}`} />;
  }

  return children;
}
