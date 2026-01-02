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
  Card
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
import { Grid } from "@mui/material";

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

  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [allocatedAssets, setAllocatedAssets] = useState(0);

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
  }, []);

  /* ------------------ LOAD DATA ------------------ */
  useEffect(() => {
    loadMappings();
    loadAssetSummary();
  }, []);

  const loadMappings = async () => {
    try {
      await getEmployeesWithAssets();
    } catch (err) {
      console.error(err);
    }
  };

  const loadAssetSummary = async () => {
    try {
      const res = await getAllAssets();
      const data = Array.isArray(res) ? res : [];

      setAssets(data);

      let total = 0;
      let allocated = 0;

      data.forEach((a) => {
        total += Number(a.totalQuantity || 0);
        allocated +=
          Number(a.totalQuantity || 0) -
          Number(a.availableQuantity || 0);
      });

      setTotalAssets(total);
      setAllocatedAssets(allocated);
    } catch (err) {
      console.error(err);
      setAssets([]);
      setTotalAssets(0);
      setAllocatedAssets(0);
    }
  };

  const handleUpdateQuantity = async () => {
    if (!assetType || !totalQuantity)
      return alert("All fields required");

    try {
      await updateAssetQuantity({
        assetType,
        totalQuantity: Number(totalQuantity),
      });

      alert("Asset quantity updated successfully");
      setAssetType("");
      setTotalQuantity("");
      loadAssetSummary();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleAssignAsset = async () => {
    if (!employeeId || !assignAssetType || !image)
      return alert("All fields required");

    try {
      await assignAsset({
        employeeId,
        assetType: assignAssetType,
        image,
      });

      alert("Asset assigned successfully");
      setEmployeeId("");
      setAssignAssetType("");
      setImage(null);
      setImagePreview(null);

      loadMappings();
      loadAssetSummary();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to assign asset");
    }
  };

  const handleReturnAsset = async () => {
    if (!employeeId || !assignAssetType)
      return alert("Employee ID & Asset required");

    try {
      await returnAsset({
        employeeId,
        assetType: assignAssetType,
      });

      alert("Asset returned successfully");
      setEmployeeId("");
      setAssignAssetType("");

      loadMappings();
      loadAssetSummary();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to return asset");
    }
  };

  return (
    <Box minHeight="100vh" sx={{ background: colors.bgColor }}>
      <NavBar />

      <Box display="flex" justifyContent="center" mt={4} mb={6}>
        <Paper
          elevation={6}
          sx={{
            width: "60%",
            borderRadius: 3,
            p: 4,
            background: colors.paperColor,
          }}
        >
          {/* HEADER */}
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <AssignmentTurnedInOutlinedIcon fontSize="large" />
            <Typography variant="h5" fontWeight={700}>
              Asset Allocation
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />
<Box sx={{display:"flex"}}>          {/* UPDATE QUANTITY */}
          <Card sx={{ p: 3, mb: 4, borderRadius: 2,display:"flex", flexDirection:"column", alignItems:"center" ,marginLeft:6, height:"350px"}}>
            <Typography variant="h6" fontWeight={600} mb={2} textAlign={"center"}>
              Update Asset Quantity
            </Typography>

            <Stack direction="column" spacing={4} alignItems="center">
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
           //     width={40}
                onClick={handleUpdateQuantity}
              >
                Update
              </Button>
              
            </Stack>
          </Card>

          {/* ASSIGN / RETURN */}
          <Card sx={{ p: 3, borderRadius: 2, flexDirection:"column", marginLeft:6, height:"350px"}}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Assign / Return Asset
            </Typography>

            <Stack spacing={4}>
              <Stack direction="column" spacing={2} alignItems="center">
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
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<AddPhotoAlternateOutlinedIcon />}
                >
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
                    <img
                      src={imagePreview}
                      width={42}
                      height={42}
                      style={{ borderRadius: 8 }}
                    />
                    <CloseIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  </Box>
                )}
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={getButtonStyle()}
                  onClick={handleAssignAsset}
                >
                  Assign Asset
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReturnAsset}
                >
                  Return Asset
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
