// ===============================
// THEME COLORS – NOTARY LIGHT THEME

import { colors } from "@mui/material";

// ===============================
export const getThemeColors = () => ({
  bgColor: "linear-gradient(to bottom right, #b1deb1ff, #7ebf7eff)",
  textColor: "#1f2933",
  paperColor: "#ffffff",
  linkColor: "#4f6f52",
  mutedText: "#6b7280",
});

// ===============================
// BUTTON STYLE
// ===============================
export const getButtonStyle = () => ({
  padding: "12px",
  borderRadius: "10px",
  background: "linear-gradient(to right, #4f6f52, #6b8f71)",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "15px",
  textTransform: "none",

  "&:hover": {
    background: "linear-gradient(to right, #3f5f45, #5f8166)",
  },
});

// ===============================
// TEXTFIELD STYLE
// ===============================
export const muiTextField = () => ({
  width: "280px",

  "& .MuiInputBase-input": {
    color: "#1f2933",
  },

  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f7faf7",
    borderRadius: "10px",

    "& fieldset": {
      borderColor: "#c8d5c8",
    },

    "&:hover fieldset": {
      borderColor: "#6b8f71",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#4f6f52",
      borderWidth: "2px",
    },
  },
});

// ===============================
// NAVBAR BUTTON STYLE
// ===============================
export const navButtonStyle = (active) => ({
  fontWeight: active ? 700 : 400,
  borderBottom: active ? "2px solid currentColor" : "none",
  borderRadius: 0,
  mx: 1,
});

// ===============================
// DIALOG STYLES
// ===============================
export const dialogPaper = {
  borderRadius: 3,
  backgroundColor: "#ffffff",
};

export const dialogTitle = {
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "#1f2933",
};

export const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#f7faf7",
  },
};

export const actionButton = {
  textTransform: "none",
  borderRadius: 2,
  px: 3,
  fontWeight: 600,
};

// utils.js

// PAGE WRAPPER
export const pageWrapper = {
   minHeight: "100vh",
  // py: 4,
  background:"linear-gradient(to bottom right, #b1deb1ff, #7ebf7eff)"
};

// PAPER CONTAINER
export const pagePaper = {
  borderRadius: 3,
  mx: 2,
  overflow: "hidden",
  background: "linear-gradient(to bottom right, #eaf4eaff, #b7dab7ff)"
};

// HERO SECTION
export const heroSection = {
  px: 4,
  py: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// EMPLOYEE CARD
export const employeeCard = (active) => ({
  minWidth: 280,
  flexShrink: 0,
  borderRadius: 3,
  p: 2,
  transform: active ? "scale(1.08)" : "scale(0.95)",
  transition: "0.3s",
});

// CAROUSEL
export const carouselStyle = {
  display: "flex",
  overflowX: "auto",
  gap: 3,
  px: 12,
  py: 8,
  "&::-webkit-scrollbar": { display: "none" },
};

// ICON BUTTON (arrows)
export const carouselArrow = (side) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  ...(side === "left" ? { left: 8 } : { right: 8 }),
});

// CARD ACTION BUTTON
export const cardActionButton = {
  mt: 2,
  textTransform: "none",
};
// utils.js


export const dialogTitleStyle = (colors) => ({
  fontWeight: 700,
  color: colors.textColor,
  pb: 1,
});

export const dialogContentStyle = (colors) => ({
  color: colors.textColor,
  "& b": {
    fontWeight: 600,
  },
});

export const dialogActionsStyle = {
  px: 3,
  pb: 2,
  justifyContent: "flex-end",
};

export const assetBoxStyle = {
  display: "flex",
  gap: 2,
  mt: 2,
  flexWrap: "wrap",
};

export const assetAvatarStyle = {
  width: 80,
  height: 80,
  mb: 1,
};

