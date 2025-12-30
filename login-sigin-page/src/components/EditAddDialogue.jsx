import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { dialogPaper, dialogTitle, inputStyle, actionButton } from "./utils";
 
/* =====================
   OPTIONS
===================== */
const statusOptions = ["ACTIVE", "INACTIVE"];
const departmentOptions = ["MD", "TL", "Fresher"];
const roleOptions = ["Backend", "Frontend", "UIUX", "Testing"];
const assetKeys = ["laptop", "mobile", "idCard", "bag"];

/* =====================
   HELPERS
===================== */
const arrayToAssetObject = (arr = []) =>
  arr.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});

const assetObjectToArray = (obj = {}) =>
  Object.keys(obj).filter((key) => obj[key]);

/* =====================
   DEFAULT VALUES
===================== */
const defaultValues = {
  id: null,
  name: "",
  email: "",
  department: "",
  role: "",
  status: "ACTIVE",
  assets: {},
  assetImages: {},
};

const EditAddDialogue = ({ open, onClose, onSubmit, initialData }) => {
  const [previews, setPreviews] = useState({});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...defaultValues,
      ...initialData,
      assets: arrayToAssetObject(initialData?.assets),
      assetImages: initialData?.assetImages || {},
    },

    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        department: values.department,
        role: values.role,
        status: values.status,
        assets: assetObjectToArray(values.assets),
        assetImages: values.assetImages || {},
      };

      if (values.id) payload.id = values.id;

      onSubmit(payload);
      onClose();
    },
  });

  useEffect(() => {
    setPreviews(formik.values.assetImages || {});
  }, [formik.values.assetImages]);

  const uploadImage = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [key]: url }));
    formik.setFieldValue(`assets.${key}`, true);
    formik.setFieldValue(`assetImages.${key}`, url);
  };

  const removeImage = (key) => {
    const updatedImages = { ...formik.values.assetImages };
    delete updatedImages[key];

    setPreviews((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    formik.setFieldValue(`assets.${key}`, false);
    formik.setFieldValue("assetImages", updatedImages);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: dialogPaper }}>
      <DialogTitle sx={dialogTitle}>
        {formik.values.id ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField fullWidth label="Name" margin="dense" sx={inputStyle} {...formik.getFieldProps("name")} />
        <TextField fullWidth label="Email" margin="dense" sx={inputStyle} {...formik.getFieldProps("email")} />

        <TextField select fullWidth label="Department" margin="dense" sx={inputStyle} {...formik.getFieldProps("department")}>
          {departmentOptions.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </TextField>

        <TextField select fullWidth label="Role" margin="dense" sx={inputStyle} {...formik.getFieldProps("role")}>
          {roleOptions.map((r) => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))}
        </TextField>

        <TextField select fullWidth label="Status" margin="dense" sx={inputStyle} {...formik.getFieldProps("status")}>
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>

        <Typography mt={3} mb={1} fontWeight="bold">
          Assets
        </Typography>

        <FormGroup>
          {assetKeys.map((key) => (
            <Box key={key} display="flex" alignItems="center" justifyContent="space-between" gap={2} p={1} mb={1} borderRadius={2} border={1}>
              <FormControlLabel
                label={key.toUpperCase()}
                control={
                  <Checkbox
                    checked={formik.values.assets?.[key] || false}
                    onChange={(e) => formik.setFieldValue(`assets.${key}`, e.target.checked)}
                  />
                }
              />

              <Button component="label" size="small" startIcon={<AddPhotoAlternateOutlinedIcon />}>
                Upload
                <input hidden type="file" accept="image/*" onChange={(e) => uploadImage(e, key)} />
              </Button>

              {previews[key] && (
                <Box position="relative">
                  <img src={previews[key]} width={40} height={40} style={{ borderRadius: 6, objectFit: "cover" }} />
                  <CancelIcon fontSize="small" onClick={() => removeImage(key)} sx={{ position: "absolute", top: -6, right: -6, cursor: "pointer" }} />
                </Box>
              )}
            </Box>
          ))}
        </FormGroup>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onClose} sx={actionButton}>Cancel</Button>
        <Button onClick={formik.handleSubmit} startIcon={<DoneOutlinedIcon />} sx={actionButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddDialogue;
