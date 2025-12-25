import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
