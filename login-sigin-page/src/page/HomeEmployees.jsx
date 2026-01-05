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
  Skeleton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableChartIcon from "@mui/icons-material/TableChart";

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

export default function HomeEmployees() {
  const [employees, setEmployees] = useState([]);
  const [assetDetails, setAssetDetails] = useState({
    Laptop: { total: 0, available: 0, allocated: 0 },
    Mobile: { total: 0, available: 0, allocated: 0 },
    ID_Card: { total: 0, available: 0, allocated: 0 },
    Bag: { total: 0, available: 0, allocated: 0 },
  });

  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingAssets, setLoadingAssets] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const carouselRef = useRef(null);

  const IMAGE_BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";

  /* ------------------- FETCH DATA ------------------- */
  useEffect(() => {
    const user = getLoggedInUser();

    if (!user || (user.department !== "MD" && user.role !== "ADMIN")) {
      setLoadingEmployees(false);
      setLoadingAssets(false);
      return;
    }

    fetchEmployees()
      .then((data) => setEmployees(Array.isArray(data) ? data : []))
      .finally(() => setLoadingEmployees(false));

    getAllAssets()
      .then((assets) => {
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
      })
      .finally(() => setLoadingAssets(false));
  }, []);

  /* ------------------- HELPERS ------------------- */
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.firstChild?.offsetWidth || 300;
    carouselRef.current.scrollTo({
      left: index * (cardWidth + 24),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const getAssetImage = (asset) => {
    if (!asset?.image) return "";
    if (asset.image.includes("localhost:5000")) {
      return asset.image.replace("http://localhost:5000", IMAGE_BASE_URL);
    }
    if (asset.image.startsWith("http")) return asset.image;
    return `${IMAGE_BASE_URL}${asset.image}`;
  };

  /* ------------------- UI ------------------- */
  return (
    <Box sx={pageWrapper}>
      <NavBar />

      <Paper elevation={4} sx={pagePaper} style={{ margin: 10 }}>
        {/* ------------------- ASSET OVERVIEW ------------------- */}
        <Box sx={heroSection}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TableChartIcon fontSize="large" />
              <Typography variant="h5" fontWeight={700}>
                Asset Overview
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              {loadingAssets
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Paper
                      key={i}
                      elevation={3}
                      sx={{ p: 2, minWidth: 180, borderRadius: 2 }}
                    >
                      <Skeleton width="60%" />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </Paper>
                  ))
                : Object.entries(assetDetails).map(([type, data]) => (
                    <Paper
                      key={type}
                      elevation={3}
                      sx={{ p: 2, minWidth: 180, borderRadius: 2 }}
                    >
                      <Typography fontWeight={600} sx={{ mb: 1 }}>
                        {type.replace("_", " ")}
                      </Typography>
                      <Typography variant="body2">
                        <b>Total:</b> {data.total}
                      </Typography>
                      <Typography variant="body2">
                        <b>Available:</b> {data.available}
                      </Typography>
                      <Typography variant="body2" color="error">
                        <b>Allocated:</b> {data.allocated}
                      </Typography>
                    </Paper>
                  ))}
            </Stack>
          </Stack>
        </Box>

        {/* ------------------- EMPLOYEE OVERVIEW ------------------- */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 4 }}>
          <PeopleIcon fontSize="large" />
          <Typography variant="h5" fontWeight={700}>
            Employees Overview
          </Typography>
        </Stack>

        <Box sx={{ position: "relative", mt: 2 }}>
          <IconButton
            sx={carouselArrow("left")}
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            sx={carouselArrow("right")}
            disabled={activeIndex >= employees.length - 1}
            onClick={() => scrollToIndex(activeIndex + 1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box ref={carouselRef} sx={carouselStyle}>
            {loadingEmployees
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} sx={employeeCard(false)}>
                    <CardContent>
                      <Skeleton width="70%" height={30} />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton
                        variant="rectangular"
                        height={32}
                        sx={{ mt: 2, borderRadius: 1 }}
                      />
                    </CardContent>
                  </Card>
                ))
              : employees.map((emp, index) => (
                  <Card
                    key={emp.id}
                    sx={employeeCard(index === activeIndex)}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {emp.name}
                      </Typography>

                      <Stack spacing={0.5} mt={1}>
                        <Stack direction="row" spacing={1}>
                          <EmailIcon fontSize="small" />
                          <Typography variant="body2">
                            {emp.email}
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <WorkIcon fontSize="small" />
                          <Typography variant="body2">
                            {emp.role}
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <BusinessIcon fontSize="small" />
                          <Typography variant="body2">
                            {emp.department}
                          </Typography>
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

        {/* ------------------- DETAILS DIALOG ------------------- */}
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
                {selectedEmployee.assets?.length ? (
                  selectedEmployee.assets.map((asset, i) => (
                    <Box key={i} textAlign="center" width={100}>
                      <Avatar
                        variant="rounded"
                        src={getAssetImage(asset)}
                        sx={{ width: 80, height: 80 }}
                      >
                        {!asset?.image && asset.assetType?.[0]}
                      </Avatar>
                      <Typography variant="caption">
                        {asset.assetType.replace("_", " ")}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography fontStyle="italic">
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
