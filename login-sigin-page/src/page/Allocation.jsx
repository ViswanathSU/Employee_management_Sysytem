import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { updateAssetQuantity } from "../api/assetsApi";
import {
  assignAsset,
  returnAsset,
  getEmployeesWithAssets,
} from "../api/allocationApi";

const STATIC_ASSETS = [
  { label: "Laptop", value: "Laptop" },
  { label: "Mobile", value: "Mobile" },
  { label: "Bag", value: "Bag" },
  { label: "ID Card", value: "Id_Card" },
];

const Allocation = () => {
  const navigate = useNavigate();

  const [assetType, setAssetType] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [assignAssetType, setAssignAssetType] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadMappings();
  }, []);

  const loadMappings = async () => {
    try {
      await getEmployeesWithAssets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuantity = async () => {
    if (!assetType || !totalQuantity) {
      alert("Asset type and quantity required");
      return;
    }

    try {
      await updateAssetQuantity({
        assetType,
        totalQuantity: Number(totalQuantity),
      });

      alert("Quantity updated");
      setAssetType("");
      setTotalQuantity("");
    } catch (err) {
      alert("Update failed");
    }
  };

const handleAssignAsset = async () => {
  if (!employeeId || !assignAssetType || !image) {
    alert("All fields required");
    return;
  }

  try {
    await assignAsset({ employeeId, assetType: assignAssetType, image });
    alert("Asset assigned");
    setEmployeeId("");
    setAssignAssetType("");
    setImage(null);
  } catch (err) {
    if (err.response?.status === 401) {
      alert("Session expired");
      localStorage.removeItem("token");
      navigate("/");
    } else {
      alert("Assign failed");
    }
  }
};

const handleReturnAsset = async () => {
  if (!employeeId || !assignAssetType) {
    alert("Employee ID and Asset Type are required");
    return;
  }

  try {
    await returnAsset({
      employeeId,
      assetType: assignAssetType,
    });

    alert("Asset returned successfully");

    setEmployeeId("");
    setAssignAssetType("");

    loadAssets();
    loadMappings();
  } catch (err) {
    console.error("Return failed", err.response?.data || err);
    alert(err.response?.data?.error || "Return failed");
  }
};



  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Asset Allocation
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography fontWeight="bold">Update Asset Quantity</Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            select
            label="Asset Type"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            sx={{ width: 200 }}
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
          />

          <Button variant="contained" onClick={handleUpdateQuantity}>
            Update
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography fontWeight="bold">Assign / Return Asset</Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            label="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <TextField
            select
            label="Asset Type"
            value={assignAssetType}
            onChange={(e) => setAssignAssetType(e.target.value)}
            sx={{ width: 200 }}
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
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <Button variant="contained" onClick={handleAssignAsset}>
            Assign
          </Button>

          <Button variant="outlined" color="error" onClick={handleReturnAsset}>
            Return
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Allocation;


