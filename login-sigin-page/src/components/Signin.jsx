import {
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
  Paper,
  Toolbar,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import {
  getThemeColors,
  getButtonStyle,
  muiTextField,
} from "./utils";
//import { Snowfall } from "react-snowfall";

const DEPARTMENTS = ["MD", "TL", "Fresher"];
const ROLES = ["Backend", "Frontend", "UIUX", "Testing"];

const Signin = () => {
  const navigate = useNavigate();
  const theme = "dark";
  const colors = getThemeColors(theme);

  const schema = Yup.object({
    name: Yup.string().required("Name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password required"),
    department: Yup.string().required("Department required"),
    role: Yup.string().required("Role required"),
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
      {/* <Snowfall
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        snowflakeCount={250} 
        color="white"        
      /> */}
      <Box sx={{ padding: 10 }}>
        <Paper
          elevation={10}
          sx={{
            width: 420,
            p: 4,
            borderRadius: 3,
            backgroundColor: colors.paperColor,
          }}
        >
          <Typography
            align="center"
            variant="h5"
            mb={3}
            fontWeight="bold"
            color={colors.textColor}
          >
            REGISTER
          </Typography>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmpassword: "",
              department: "",
              role: "",
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
                department: values.department,
                role: values.role,
              };

              await registerUser(payload);
              alert("Registered successfully");
              navigate("/");
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2.3} alignItems="center">
                  {/* NAME */}
                  <TextField
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  {/* EMAIL */}
                  <TextField
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  {/* DEPARTMENT */}
                  <TextField
                    select
                    name="department"
                    label="Department"
                    value={values.department}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    error={touched.department && Boolean(errors.department)}
                    helperText={touched.department && errors.department}
                  >
                    {DEPARTMENTS.map((d) => (
                      <MenuItem key={d} value={d}>
                        {d}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* ROLE */}
                  <TextField
                    select
                    name="role"
                    label="Role"
                    value={values.role}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    {ROLES.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* PASSWORD */}
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  {/* CONFIRM PASSWORD */}
                  <TextField
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    sx={muiTextField(theme)}
                    error={
                      touched.confirmpassword &&
                      Boolean(errors.confirmpassword)
                    }
                    helperText={
                      touched.confirmpassword && errors.confirmpassword
                    }
                  />

                  <Button
                    type="submit"
                    sx={getButtonStyle(theme)}
                    style={{ width: "65%" }}
                  >
                    Sign Up
                  </Button>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ color: "#6b7280" }}>
                      Already have account ?
                    </Typography>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#4f6f52",
                        fontWeight: "bold",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Login
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

export default Signin;
