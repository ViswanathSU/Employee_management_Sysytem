import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./Logout";
import { getThemeColors, navButtonStyle } from "./utils";
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';


export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const colors = getThemeColors();

  const isActive = (path) => location.pathname === path;

  const navButton = (label, path) => (
    <Button
      key={path}
      onClick={() => navigate(path)}
      sx={{
        ...navButtonStyle(isActive(path)),
        color: colors.textColor, 
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          background: colors.bgColor,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
                mr: 4,
                color: colors.textColor,
                fontWeight: 700,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial",
                display: "flex",
                alignItems: "center",
                gap: 1,
                letterSpacing: "0.3px",
                        }}
            >
            <SensorOccupiedOutlinedIcon sx={{ fontSize: 22,}} />
            WorkNest
            </Typography>


          {navButton("Home", "/employee/:id")}
          {navButton("Details",'/userdetail')}
          

          <Box sx={{ flexGrow: 1 }} />

          {/* LOGOUT BUTTON */}
          <Box sx={{ color: colors.textColor }}>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
