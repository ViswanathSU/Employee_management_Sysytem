import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Stack,
  Card,
  Toolbar,
  CardContent,
  Divider,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { updateAssetQuantity, getAllAssets } from "../api/assetsApi";
import {
  assignAsset,
  returnAsset,
  getEmployeesWithAssets,
} from "../api/allocationApi";
import { muiTextField, getButtonStyle, getThemeColors} from "../components/utils";
import { useNavigate } from "react-router-dom";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const STATIC_ASSETS = [
  { label: "Laptop", value: "Laptop" },
  { label: "Mobile", value: "Mobile" },
  { label: "Bag", value: "Bag" },
  { label: "ID Card", value: "ID_Card" },
];

const Allocation = () => {
  /* ------------------ STATE ------------------ */
  const [assetType, setAssetType] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [assignAssetType, setAssignAssetType] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);          // MUST be array
  const [totalAssets, setTotalAssets] = useState(0);
  const [allocatedAssets, setAllocatedAssets] = useState(0);
  const theme = "dark";
  const [imagePreview, setImagePreview] = useState(null);

  /* ------------------ JWT DECODE ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      jwtDecode(token);
    } catch (err) {
      console.error("TOKEN DECODE FAILED", err);
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
      console.error("LOAD MAPPING FAILED", err);
    }
  };

  const loadAssetSummary = async () => {
    try {
      const res = await getAllAssets();

      // ✅ FORCE ARRAY SAFETY
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
      console.error("FAILED TO LOAD ASSETS", err);
      setAssets([]);
      setTotalAssets(0);
      setAllocatedAssets(0);
    }
  };

  /* ------------------ UPDATE QUANTITY ------------------ */
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

      await loadAssetSummary();

      setAssetType("");
      setTotalQuantity("");
      alert("Quantity updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* ------------------ ASSIGN ASSET ------------------ */
  const handleAssignAsset = async () => {
    if (!employeeId || !assignAssetType || !image) {
      alert("All fields required");
      return;
    }

    try {
      await assignAsset({
        employeeId,
        assetType: assignAssetType,
        image,
      });

      setEmployeeId("");
      setAssignAssetType("");
      setImage(null);

      await loadMappings();
      await loadAssetSummary();

      alert("Asset assigned successfully");
    } catch (err) {
      console.error("ASSIGN ERROR:", err);
      alert("Assign failed");
    }
  };

  /* ------------------ RETURN ASSET ------------------ */
  const handleReturnAsset = async () => {
    if (!employeeId || !assignAssetType) {
      alert("Employee ID and Asset Type required");
      return;
    }

    try {
      await returnAsset({
        employeeId,
        assetType: assignAssetType,
      });

      setEmployeeId("");
      setAssignAssetType("");

      await loadMappings();
      await loadAssetSummary();

      alert("Asset returned successfully");
    } catch (err) {
      console.error("RETURN ERROR:", err);
      alert("Return failed");
    }
  };

  return (
    <div className="backgroud-allocation" sx = {{display:"flex", justifyContent:"center"}}>
      <Box
        p={3}
        sx={{
          background: "linear-gradient(to bottom right, #130223, #3d0066)",
          display:"flex", justifyContent:"center"
        }}
      >
        <Paper elevation= {6} sx={{
    textAlign: "center",
    background: "linear-gradient(to bottom right, #322043ff, #4c0879ff)",
    color: "#ffffff",
    p: 2,
    width:"75%",height:"550px", borderRadius:"10px", margin:9.5
  }}> 
         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {/* Left side: Icon + Title */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AssignmentTurnedInOutlinedIcon sx={{ color: "#d2d2d2ff", mr: 1 }} />
        <Typography variant="h5" sx={{ color: "#d2d2d2ff", fontWeight: "bold", }} >
          Asset Allocation
        </Typography>
      </Box>

      {/* Right side: Button */}
      <Button variant="contained" color="primary" onClick={() => navigate("/employees")}
      >
        Back to Employees
      </Button>
    </Toolbar>
        {/* UPDATE QUANTITY */}
        <Paper sx={{ p: 2, mb: 3, bgcolor:"#453050ff", }}>
          <Typography variant="h5"
    style={{
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
      margin:2,
    }}
    >Update Asset Quantity</Typography>
<Toolbar sx={{display:"flex", justifyContent:"center"}}>
          <Stack direction="column" spacing={2} mt={2}>
            <TextField
              select
              label="Asset Type"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              sx={{...muiTextField(theme), '& .MuiInputLabel-root':{
                color: "#fff"}}}
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
              sx={{...muiTextField(theme), '& .MuiInputLabel-root':{
                color: "#fff"}}}
            />

            <Button variant="contained" onClick={handleUpdateQuantity}  sx={{
    background: 'linear-gradient(to right, #4b0082, #7b1fa2)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(to right, #3a006f, #6a1b9a)',
    },
  }}>
              Update
            </Button>
          </Stack>
          </Toolbar>
        </Paper>

        {/* ASSIGN / RETURN */}
        <Paper sx={{ p: 2,bgcolor:"#453050ff" }}>
          <Typography variant="h5" fontWeight="bold" sx={{
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
      margin:2,
    }}>Assign / Return Asset</Typography>

          <Stack direction="" spacing={2} mt={2} sx={{display:"flex", justifyContent:"center"}}>
           <Toolbar> 
           <Box sx={{margin:1.5}}> <TextField
              label="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              sx={{...muiTextField(theme), '& .MuiInputLabel-root':{
                color: "#fff",}}}
            />
</Box>
<Box sx={{margin:1.5}}>
            <TextField
              select
              label="Asset Type"
              value={assignAssetType}
              onChange={(e) => setAssignAssetType(e.target.value)}
              sx={{...muiTextField(theme), '& .MuiInputLabel-root':{
                color: "#fff"}}}
            >
              {STATIC_ASSETS.map((a) => (
                <MenuItem key={a.value} value={a.value}>
                  {a.label}
                </MenuItem>
              ))}
            </TextField></Box>

           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <Button
    component="label"
    variant="outlined"
    sx={{
      bgcolor: "#f0f0f0",
      height: "53px",
      borderRadius: "10px",
    }}
    startIcon={<AddPhotoAlternateOutlinedIcon/>}
  >
    Upload
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

  {/* ✅ IMAGE PREVIEW + CANCEL */}
  {imagePreview && (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "#230546ff",
        borderRadius: "8px",
        px: 1,
        height: "50px",
      }}
    >
      <img
        src={imagePreview}
        alt="preview"
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          objectFit: "cover",
        }}
      />

      <CloseIcon
        sx={{ cursor: "pointer", color: "#d32f2f" }}
        onClick={() => {
          setImage(null);
          setImagePreview(null);
        }}
      />
    </Box>
  )}
</Box>


</Toolbar><Toolbar>
            <Button variant="contained" onClick={handleAssignAsset} sx={{
    background: 'linear-gradient(to right, #4b0082, #7b1fa2)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(to right, #3a006f, #6a1b9a)',
    }}}>
              Assign
            </Button>

            <Button variant="contained" color="error" onClick={handleReturnAsset} sx={{margin:1.5}}>
              Return
            </Button>
            </Toolbar>
          </Stack>
        </Paper>

        {/* SUMMARY CARD
        <Card sx={{ mt: 3, mb: 22, bgcolor:"#453050ff" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffffff"}}>
              Asset Inventory Summary
            </Typography>

            <Typography>Total Assets: {totalAssets}</Typography>
            <Typography>Allocated Assets: {allocatedAssets}</Typography>

            <Divider sx={{ my: 1 }} />

            {assets.map((a) => (
              <Typography key={a.id}>
                {a.assetType.replace("_", " ")} —{" "}
                {a.availableQuantity}/{a.totalQuantity}
              </Typography>
            ))}
          </CardContent>
        </Card> */}
       
 </Paper>
      </Box>
    </div>
  );
};

export default Allocation;
