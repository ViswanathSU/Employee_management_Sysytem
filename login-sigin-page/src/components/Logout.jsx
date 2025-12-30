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
    <Button sx={{background: "linear-gradient(to right, #4f6f52, #6b8f71)",
  color: "#ffffff",
   }} variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
