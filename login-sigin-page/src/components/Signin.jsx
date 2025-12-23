import {
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { registerUser } from "../api/UserApi.js";
import { getButtonStyle, muiTextField } from "./utils";

const DEPARTMENTS = ["MD", "TL", "Fresher"];
const ROLES = ["Backend", "Frontend", "UIUX", "Testing"];

function SignIn({ setView, theme }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name Required"),
    email: Yup.string().email("Invalid Email").required("Email Required"),
    password: Yup.string().min(8, "Min 8 chars").required("Password Required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password Required"),
    department: Yup.string().required("Department Required"),
    role: Yup.string().required("Role Required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        department: "",
        role: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          department: values.department,
          role: values.role,
        };

        const res = await registerUser(payload);

        if (res?.status === "success") {
          alert("Registered Successfully");
          setView("login");
        } else {
          alert(res?.message || "Registration Failed");
        }
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, touched, errors, values }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="center">
            {/* NAME */}
            <TextField
              placeholder="Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={muiTextField(theme)}
            />

            {/* EMAIL */}
            <TextField
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={muiTextField(theme)}
            />

            {/* DEPARTMENT */}
            <TextField
              select
              label="Department"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.department && Boolean(errors.department)}
              helperText={touched.department && errors.department}
              sx={muiTextField(theme)}
            >
              {DEPARTMENTS.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>

            {/* ROLE */}
            <TextField
              select
              label="Role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && errors.role}
              sx={muiTextField(theme)}
            >
              {ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>

            {/* PASSWORD */}
            <TextField
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={muiTextField(theme)}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              placeholder="Confirm Password"
              type="password"
              name="confirmpassword"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.confirmpassword &&
                Boolean(errors.confirmpassword)
              }
              helperText={
                touched.confirmpassword && errors.confirmpassword
              }
              sx={muiTextField(theme)}
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "150px" }}
              style={getButtonStyle(theme)}
            >
              Sign In
            </Button>

            {/* SWITCH */}
            <div style={{ display: "flex", gap: "6px" }}>
              <Typography variant="body2">
                Already have an account?
              </Typography>
              <span
                onClick={() => setView("login")}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: theme === "dark" ? "#900897ff" : "#00549e",
                }}
              >
                Log in
              </span>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default SignIn;
