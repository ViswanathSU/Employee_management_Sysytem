import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { loginUser } from "../api/UserApi.js";
import { getButtonStyle, muiTextField } from "./utils";

function LoginForm({ theme }) {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email Required"),
    password: Yup.string().min(6).required("Password Required"),
  });

  return (
    <Formik
      initialValues={{
        email: Cookies.get("userEmail") || "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const res = await loginUser(values);

        if (res?.status === "success" && res?.token) {
          Cookies.set("token", res.token, { expires: 1 });
          Cookies.set("userEmail", values.email);

          alert(`Welcome ${values.email}`);
        } else {
          alert("Invalid Credentials");
        }
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, touched, errors, values }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="center">
            <TextField
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={muiTextField(theme)}
            />

            <TextField
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={muiTextField(theme)}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "70px" }}
              style={getButtonStyle(theme)}
            >
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
