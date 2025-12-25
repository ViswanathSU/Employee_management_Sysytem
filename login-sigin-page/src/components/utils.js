// THEME COLORS
export const getThemeColors = (theme) => ({
  bgColor:
    theme === "dark"
      ? "linear-gradient(to bottom right, #130223, #3d0066)"
      : "linear-gradient(to right, #a96828, #633609)",

  textColor: theme === "dark" ? "#ffffff" : "#000000",
  paperColor: theme === "dark" ? "#2b2727" : "#ffffff",
});

// BUTTON STYLE
export const getButtonStyle = (theme) => ({
  width: "80%",
  padding: "12px",
  borderRadius: "8px",
  background:
    theme === "dark"
      ? "linear-gradient(to right, #4b0082, #7b1fa2)"
      : "linear-gradient(to right, #7e470b, #4d2f03)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
});

// TEXTFIELD STYLE
export const muiTextField = (theme) => ({
  width: "280px",

  "& .MuiInputBase-input": {
    color: theme === "dark" ? "#ffffff" : "#000000",
  },

  "& .MuiOutlinedInput-root": {
    backgroundColor: theme === "dark" ? "#1f1f1f" : "#eef4ff",
    borderRadius: "8px",

    "& fieldset": {
      borderColor: theme === "dark" ? "#555" : "#ccc",
    },

    "&:hover fieldset": {
      borderColor: theme === "dark" ? "#00e5ff" : "#00549e",
    },

    "&.Mui-focused fieldset": {
      borderColor: theme === "dark" ? "#00e5ff" : "#00549e",
      borderWidth: "2px",
    },
  },
});
