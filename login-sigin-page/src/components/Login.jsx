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
import { getDecodedToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  getThemeColors,
  getButtonStyle,
  muiTextField,
} from "./utils";
import {Snowfall} from 'react-snowfall';

const Login = () => {
  const navigate = useNavigate();
  const colors = getThemeColors();

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password required"),
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
      }}>
        {/* <Snowfall
  //   style={{
  //     position: "absolute",
  //     width: "100%",
  //     height: "100%",
  //   }}
  //   snowflakeCount={250} 
  //   color="white"        
  // /> */}
      <Box sx={{ p: 8 }}>
        <Paper
          elevation={10}
          sx={{
            width: 380,
            p: 4,
            borderRadius: 3,
            backgroundColor: colors.paperColor,
            margin:15
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
            initialValues={{
              email: "",
              password: "",
              remember: false,
            }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await loginUser({
                  email: values.email,
                  password: values.password,
                });

                if (res.status !== "success") {
                  throw new Error(res.message || "Login failed");
                }

                const user = getDecodedToken();
                if (!user) throw new Error("Invalid token");

                // role based navigation
                if (user.department === "MD") {
                  navigate("/admin/employees");
                } else {
                  navigate(`/employee/${user.id}`);
                }
              } catch (err) {
                alert(err.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2.5} alignItems="center">
                  {/* EMAIL */}
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    sx={muiTextField()}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  {/* PASSWORD */}
                  <TextField
                    name="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    sx={muiTextField()}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  {/* REMEMBER ME */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="remember"
                        checked={values.remember}
                        onChange={handleChange}
                        sx={{ color: colors.textColor, marginLeft:3 }}
                        
                      />
                    }
                    label="Remember me"
                    sx={{ alignSelf: "flex-start", color: colors.textColor }}
                  />

                  {/* LOGIN BUTTON */}
                  <Button
                    type="submit"
                    sx={getButtonStyle()}
                    style={{ width: "65%" }}
                    disabled={isSubmitting}
                  >
                    LOGIN
                  </Button>

                  {/* SIGN UP TEXT */}
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ color: colors.mutedText }}>
                      Don't have an account?
                    </Typography>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: colors.linkColor,
                        fontWeight: "bold",
                      }}
                      onClick={() => navigate("/signin")}
                    >
                      Sign Up
                    </Typography>
                  </Stack>
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
