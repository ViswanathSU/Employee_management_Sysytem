import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getLoggedInUser } from "../utils/auth";
import { getAllAssets } from "../api/assetsApi";
import { fetchEmployees } from "../api/employeeApi";
import NavBar from "../components/NavBar";
import {
  pageWrapper,
  pagePaper,
  heroSection,
  employeeCard,
  carouselStyle,
  carouselArrow,
  cardActionButton,
} from "../components/utils";
import TableChartIcon from '@mui/icons-material/TableChart';

export default function HomeEmployees() {
  const [employees, setEmployees] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const carouselRef = useRef(null);

  //  ADDED: asset count state (ONLY ADDITION)
  const [assetDetails, setAssetDetails] = useState({
  Laptop: { total: 0, available: 0, allocated: 0 },
  Mobile: { total: 0, available: 0, allocated: 0 },
  ID_Card: { total: 0, available: 0, allocated: 0 },
  Bag: { total: 0, available: 0, allocated: 0 },
});


 useEffect(() => {
  fetchEmployees().then((data) =>
    setEmployees(Array.isArray(data) ? data : [])
  );

  getAllAssets().then((assets) => {
    if (!Array.isArray(assets)) return;

    const total = assets.reduce(
      (sum, a) => sum + (a.totalQuantity || 0),
      0
    );

    const available = assets.reduce(
      (sum, a) => sum + (a.availableQuantity || 0),
      0
    );

    const details = {};

    assets.forEach((a) => {
      details[a.assetType] = {
        total: a.totalQuantity || 0,
        available: a.availableQuantity || 0,
        allocated:
          (a.totalQuantity || 0) - (a.availableQuantity || 0),
      };
    });

    setAssetDetails((prev) => ({
      ...prev,
      ...details,
    }));
  });
}, []);
useEffect(() => {
  const user = getLoggedInUser();

  //  BLOCK NON-ADMIN USERS
  if (!user || (user.department !== "MD" && user.role !== "ADMIN")) {
    console.warn("User not admin — skipping admin APIs");
    return;
  }

  fetchEmployees().then((data) =>
    setEmployees(Array.isArray(data) ? data : [])
  );

  getAllAssets().then((assets) => {
    if (!Array.isArray(assets)) return;

    const details = {};
    assets.forEach((a) => {
      details[a.assetType] = {
        total: a.totalQuantity || 0,
        available: a.availableQuantity || 0,
        allocated:
          (a.totalQuantity || 0) - (a.availableQuantity || 0),
      };
    });

    setAssetDetails((prev) => ({ ...prev, ...details }));
  });
}, []);


  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.firstChild?.offsetWidth || 300;
    carouselRef.current.scrollTo({
      left: index * (cardWidth + 24),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const IMAGE_BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";

  const getAssetImage = (asset) => {
    if (!asset?.image) return "";

    if (asset.image.includes("localhost:5000")) {
      return asset.image.replace(
        "http://localhost:5000",
        IMAGE_BASE_URL
      );
    }

    if (asset.image.startsWith("http")) {
      return asset.image;
    }

    return `${IMAGE_BASE_URL}${asset.image}`;
  };

  return (
    <Box sx={pageWrapper}>
      <NavBar />

      <Paper elevation={4} sx={pagePaper} style={{ margin: 10 }}>
<Box sx={heroSection}>
  <Stack spacing={3}>
    {/* TITLE */}
    <Stack direction="row" spacing={2} alignItems="center" sx={{margin:1}}>
      <TableChartIcon fontSize="large" />
      <Typography variant="h5" fontWeight={700}>
        Asset Overview
      </Typography>
    </Stack>
    {/* ASSET DASHBOARD CARDS */}
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      {Object.entries(assetDetails).map(([type, data]) => (
        <Paper
          key={type}
          elevation={3}
          sx={{
            p: 2,
            minWidth: 180,
            borderRadius: 2,
            flexGrow: 1,
          }}
        >
          <Typography
            fontWeight={600}
            sx={{ mb: 1 }}
          >
            {type.replace("_", " ")}
          </Typography>

          <Stack spacing={0.5}>
            <Typography variant="body2">
              <b>Total:</b> {data.total}
            </Typography>
            <Typography variant="body2">
              <b>Available:</b> {data.available}
            </Typography>
            <Typography
              variant="body2"
              color="error"
            >
              <b>Allocated:</b> {data.allocated}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  </Stack>
</Box>
 <Stack direction="row" spacing={2} alignItems="center" sx={{marginLeft:4}}>
      <PeopleIcon fontSize="large" />
      <Typography variant="h5" fontWeight={700}>
        Employees Overview
      </Typography>
    </Stack>
<Box sx={{ position: "relative", width: "100%", mt: 2 }}>
  {/* LEFT ARROW */}
  <IconButton
    sx={carouselArrow("left")}
    disabled={activeIndex === 0}
    onClick={() => scrollToIndex(activeIndex - 1)}
  >
    <ArrowBackIosNewIcon />
  </IconButton>

  {/* RIGHT ARROW */}
  <IconButton
    sx={carouselArrow("right")}
    disabled={activeIndex >= employees.length - 1}
    onClick={() => scrollToIndex(activeIndex + 1)}
  >
    <ArrowForwardIosIcon />
  </IconButton>

  {/* CAROUSEL */}
  <Box ref={carouselRef} sx={carouselStyle}>
    {employees.map((emp, index) => (
      <Card key={emp.id} sx={employeeCard(index === activeIndex)}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {emp.name}
          </Typography>

          <Stack spacing={0.5} mt={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <Typography variant="body2">{emp.email}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <WorkIcon fontSize="small" />
              <Typography variant="body2">{emp.role}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <BusinessIcon fontSize="small" />
              <Typography variant="body2">{emp.department}</Typography>
            </Stack>
          </Stack>

          <Box mt={2}>
            <Chip label={emp.status} />
          </Box>

          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            sx={cardActionButton}
            onClick={() => {
              setSelectedEmployee(emp);
              setOpen(true);
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    ))}
  </Box>
</Box>

        {/* DETAILS DIALOG */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>Employee Details</DialogTitle>

          {selectedEmployee && (
            <DialogContent>
              <Typography><b>Name:</b> {selectedEmployee.name}</Typography>
              <Typography><b>Email:</b> {selectedEmployee.email}</Typography>
              <Typography><b>Role:</b> {selectedEmployee.role}</Typography>
              <Typography><b>Department:</b> {selectedEmployee.department}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" fontWeight={600}>
                Assets
              </Typography>

              <Box display="flex" gap={2} mt={2} flexWrap="wrap">
                {selectedEmployee.assets &&
                selectedEmployee.assets.length > 0 ? (
                  selectedEmployee.assets.map((asset, i) => (
                    <Box key={i} textAlign="center" width={100}>
                      <Avatar
                        variant="rounded"
                        src={getAssetImage(asset)}
                        sx={{ width: 80, height: 80 }}
                      >
                        {!asset?.image && asset.assetType?.[0]}
                      </Avatar>

                      <Typography variant="caption" display="block">
                        {asset.assetType.replace("_", " ")}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.7, fontStyle: "italic" }}
                  >
                    No assets assigned
                  </Typography>
                )}
              </Box>
            </DialogContent>
          )}

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
