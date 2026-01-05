import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Stack,
  Divider,
  Card,
  CircularProgress,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { updateAssetQuantity, getAllAssets } from "../api/assetsApi";
import {
  assignAsset,
  returnAsset,
  getEmployeesWithAssets,
} from "../api/allocationApi";
import NavBar from "../components/NavBar";
import {
  muiTextField,
  getButtonStyle,
  getThemeColors,
} from "../components/utils";
import { useNavigate } from "react-router-dom";

import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const STATIC_ASSETS = [
  { label: "Laptop", value: "Laptop" },
  { label: "Mobile", value: "Mobile" },
  { label: "Bag", value: "Bag" },
  { label: "ID Card", value: "ID_Card" },
];

const Allocation = () => {
  const colors = getThemeColors();
  const navigate = useNavigate();

  /* ------------------ STATE ------------------ */
  const [assetType, setAssetType] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [assignAssetType, setAssignAssetType] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [loadingReturn, setLoadingReturn] = useState(false);

  /* ------------------ JWT CHECK ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode(token);
      } catch {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [navigate]);

  /* ------------------ LOAD DATA ------------------ */
  useEffect(() => {
    getEmployeesWithAssets();
    getAllAssets();
  }, []);

  /* ------------------ HANDLERS ------------------ */

  const handleUpdateQuantity = async () => {
    if (!assetType || !totalQuantity) {
      alert("All fields required");
      return;
    }

    setLoadingUpdate(true);
    try {
      await updateAssetQuantity({
        assetType,
        totalQuantity: Number(totalQuantity),
      });
      alert("Asset quantity updated");
      setAssetType("");
      setTotalQuantity("");
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleAssignAsset = async () => {
    if (!employeeId || !assignAssetType || !image) {
      alert("All fields required");
      return;
    }

    setLoadingAssign(true);
    try {
      await assignAsset({
        employeeId,
        assetType: assignAssetType,
        image,
      });
      alert("Asset assigned");
      setEmployeeId("");
      setAssignAssetType("");
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      alert(err?.response?.data?.message || "Assign failed");
    } finally {
      setLoadingAssign(false);
    }
  };

  const handleReturnAsset = async () => {
    if (!employeeId || !assignAssetType) {
      alert("Employee ID & Asset required");
      return;
    }

    setLoadingReturn(true);
    try {
      await returnAsset({
        employeeId,
        assetType: assignAssetType,
      });
      alert("Asset returned");
      setEmployeeId("");
      setAssignAssetType("");
    } catch (err) {
      alert(err?.response?.data?.message || "Return failed");
    } finally {
      setLoadingReturn(false);
    }
  };

  return (
    <Box minHeight="100vh" sx={{ background: colors.bgColor }}>
      <NavBar />

      <Box display="flex" justifyContent="center" mt={4}>
        <Paper
          elevation={6}
          sx={{
            width: "60%",
            p: 4,
            borderRadius: 3,
            background: colors.paperColor,
          }}
        >
          {/* HEADER */}
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <AssignmentTurnedInOutlinedIcon />
            <Typography variant="h5" fontWeight={700}>
              Asset Allocation
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Box display="flex" gap={4}>
            {/* UPDATE QUANTITY */}
            <Card sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" mb={2} textAlign="center">
                Update Asset Quantity
              </Typography>

              <Stack spacing={3} alignItems="center">
                <TextField
                  select
                  label="Asset Type"
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  sx={muiTextField()}
                >
                  {STATIC_ASSETS.map((a) => (
                    <MenuItem key={a.value} value={a.value}>
                      {a.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Total Quantity"
                  type="number"
                  value={totalQuantity}
                  onChange={(e) => setTotalQuantity(e.target.value)}
                  sx={muiTextField()}
                />

                <Button
                  variant="contained"
                  sx={getButtonStyle()}
                  disabled={loadingUpdate}
                  onClick={handleUpdateQuantity}
                >
                  {loadingUpdate ? (
                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                  ) : (
                    "Update"
                  )}
                </Button>
              </Stack>
            </Card>

            {/* ASSIGN / RETURN */}
            <Card sx={{ p: 3, flex: 1 }}>
              <Typography variant="h6" mb={2}>
                Assign / Return Asset
              </Typography>

              <Stack spacing={3} alignItems="center">
                <TextField
                  label="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  sx={muiTextField()}
                />

                <TextField
                  select
                  label="Asset Type"
                  value={assignAssetType}
                  onChange={(e) => setAssignAssetType(e.target.value)}
                  sx={muiTextField()}
                >
                  {STATIC_ASSETS.map((a) => (
                    <MenuItem key={a.value} value={a.value}>
                      {a.label}
                    </MenuItem>
                  ))}
                </TextField>

                <Button component="label" variant="outlined">
                  Upload Image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>

                {imagePreview && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <img src={imagePreview} width={40} height={40} />
                    <CloseIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  </Box>
                )}

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    disabled={loadingAssign}
                    sx={getButtonStyle()}
                    onClick={handleAssignAsset}
                  >
                    {loadingAssign ? (
                      <CircularProgress size={22} sx={{ color: "#fff" }} />
                    ) : (
                      "Assign"
                    )}
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    disabled={loadingReturn}
                    onClick={handleReturnAsset}
                  >
                    {loadingReturn ? (
                      <CircularProgress size={22} sx={{ color: "#fff" }} />
                    ) : (
                      "Return"
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Allocation;
