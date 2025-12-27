// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoute = ({ children }) => {
//   const token = Cookies.get("token");
//   return token ? children : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
