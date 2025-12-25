import * as Yup from "yup";

export const employeeSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  department: Yup.string()
    .oneOf(["MD", "TL", "Fresher"], "Invalid department")
    .required("Department is required"),

  role: Yup.string()
    .oneOf(
      ["Backend", "Frontend", "UIUX", "Testing"],
      "Invalid role"
    )
    .required("Role is required"),

  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"], "Invalid status")
    .required("Status is required"),

  assets: Yup.object().nullable(),
  
  assetImages: Yup.object().nullable()
});
