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
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "#15131eff",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.3rem",
          bgcolor: "#46077dff",
          color: "#efe9e9ff",
          py: 1.5,
        }}
      >
        {formik.values.id ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <TextField
          fullWidth
          label="Name"
          margin="dense"
          sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: "#f0f0f0",
      "& fieldset": {
        borderColor: "#888",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#bbb",
    },
  }}
          {...formik.getFieldProps("name")}
        />

        <TextField
          fullWidth
          label="Email"
          margin="dense"
          sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: "#f0f0f0",
      "& fieldset": {
        borderColor: "#888",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#bbb",
    },
  }}
          {...formik.getFieldProps("email")}
        />

        <TextField
          select
          fullWidth
          label="Department"
          margin="dense"
          sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: "#f0f0f0",
      "& fieldset": {
        borderColor: "#888",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#bbb",
    },
  }}
          {...formik.getFieldProps("department")}
        >
          {departmentOptions.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Role"
          margin="dense"
          sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: "#f0f0f0",
      "& fieldset": {
        borderColor: "#888",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#bbb",
    },
    
  }}
          {...formik.getFieldProps("role")}
        >
          {roleOptions.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Status"
          margin="dense"
          sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      color: "#f0f0f0",
      "& fieldset": {
        borderColor: "#888",
      },
      
    },

    "& .MuiInputLabel-root": {
      color: "#bbb",
    },
  }}
          {...formik.getFieldProps("status")}
        >
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        <Typography mt={3} mb={1} fontWeight="bold">
          Assets
        </Typography>

        <FormGroup>
          {assetKeys.map((key) => (
            <Box
              key={key}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              p={1}
              mb={1}
              borderRadius={2}
              sx={{
                bgcolor: "#15131eff",
                border: "1px solid #e0e0e0",
                color:"#bbb"
              }}
            >
              <FormControlLabel
                label={key.toUpperCase()}
                control={
                  <Checkbox
                    checked={formik.values.assets?.[key] || false}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `assets.${key}`,
                        e.target.checked
                      )
                    }
                  />
                }
              />

              <Button
                component="label"
                variant="contained"
                bgcolor="#f0f0f0"
                size="small"
                sx={{ textTransform: "none", borderRadius: 2 }}
                startIcon = {<AddPhotoAlternateOutlinedIcon/>}
              >
                Upload
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImage(e, key)}
                />
              </Button>

              {previews[key] && (
                <Box position="relative">
                  <img
                    src={previews[key]}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: 6,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                  <CancelIcon
                    fontSize="small"
                    onClick={() => removeImage(key)}
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      bgcolor: "#fff",
                      borderRadius: "50%",
                      boxShadow: 1,
                      cursor: "pointer",
                      color: "#d32f2f",
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </FormGroup>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onClose} variant="contained" sx={{ textTransform: "none" , bgcolor:"#cb4444ff"}}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            bgcolor: "#490670ff",
            "&:hover": { bgcolor: "#8d5f3d" },
          }}
          onClick={formik.handleSubmit}
          startIcon={<DoneOutlinedIcon/>}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddDialogue;
