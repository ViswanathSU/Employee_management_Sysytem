import { useState } from "react";
import LoginForm from "../components/Login.jsx";
import SignIn from "../components/Signin.jsx";
import "../App.css";

import { Box, Paper } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { getThemeColors } from "../components/utils.js";

function User() {
  const [view, setView] = useState("login");
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? "dark" : "light";
  const colors = getThemeColors(theme);

  const navItemStyle = (active) => ({
    cursor: "pointer",
    height: "50px",
    width: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",

    color: active
      ? theme === "dark"
        ? "#ffffff"
        : "#222222"
      : theme === "dark"
      ? "#aaaaaa"
      : "#666666",

    borderBottom: active
      ? `2px solid ${theme === "dark" ? "#ffffff" : "#222222"}`
      : "2px solid transparent",

    transition: "all 0.25s ease",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
      }}
    >
      {/* THEME TOGGLE */}
      

      <Box>
        <Paper
          elevation={8}
          sx={{
            minWidth: "420px",
            padding: "40px",
            borderRadius: "12px",
            backgroundColor: colors.paperColor,
            color: colors.textColor,
          }}
        >
          {view === "login" ? (
            <LoginForm theme={theme} />
          ) : (
            <SignIn setView={setView} theme={theme} />
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default User;