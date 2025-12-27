import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Stack,
  Paper,
  Typography,
  Toolbar,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import {
  getThemeColors,
  getButtonStyle,
  muiTextField,
} from "./utils";

const Login = () => {
  const navigate = useNavigate();
  const theme = "dark";
  const colors = getThemeColors(theme);

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),
  });

  return (
    <Toolbar
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: colors.bgColor,
      }}
    >
      <Box sx={{ padding: 22 }}>
        <Paper
          elevation={10}
          sx={{
            width: 380,
            p: 4,
            borderRadius: 3,
            backgroundColor: colors.paperColor,
            margin:2.5
          }}
        >
          <Typography
            align="center"
            variant="h5"
            fontWeight="bold"
            mb={3}
            color={colors.textColor}
          >
            LOGIN
          </Typography>

          <Formik
            initialValues={{ email: "", password: "", remember: false }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const res = await loginUser(
                { email: values.email, password: values.password },
                values.remember
              );

              if (res.status === "success") {
                navigate("/employees");
              } else {
                alert(res.message);
              }
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2.5} alignItems="center">
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    name="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="remember"
                        checked={values.remember}
                        onChange={handleChange}
                      />
                    }
                    label="Remember me"
                    sx={{ color: colors.textColor }}
                  />

                  <Button type="submit" sx={getButtonStyle(theme)}>
                    LOGIN
                  </Button>
                  <Stack direction="row" spacing={1}>
                  <Typography sx={{color:"#ccc"}}> Don't have account? </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "#00e5ff",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/signin")}
                >
                   Register
                </Typography></Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Toolbar>
  );
};

export default Login;
