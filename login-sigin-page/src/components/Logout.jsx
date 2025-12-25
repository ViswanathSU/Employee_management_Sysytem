import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <Button color="primary" variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
