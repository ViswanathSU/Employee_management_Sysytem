// src/page/UserDetail.jsx
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import { getMyProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { getAssetImage } from "../utils/imageHelper";

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(console.error);
  }, []);

  if (!user) {
    return (
      <Typography align="center" mt={5}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box minHeight="100vh" sx={{ background: "#f5f7fb" }}>
      <UserNavBar />

      {/* USER DETAILS */}
      <Paper sx={{ p: 5, m: 3, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            User Details
          </Typography>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar sx={{ width: 100, height: 100 }}>
            {user.name?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography color="text.secondary">
              {user.role}
            </Typography>
            <Typography color="text.secondary">
              {user.department}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={2}>
          <Detail label="Email" value={user.email} />
          <Detail label="Role" value={user.role} />
          <Detail label="Department" value={user.department} />
          <Detail label="Status" value={user.status} />
        </Stack>
      </Paper>

      {/* ASSETS SECTION */}
      <Paper sx={{ p: 5, m: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Allocated Assets
        </Typography>

        <Grid container spacing={4}>
          {user.assets?.length ? (
            user.assets.map((asset) => (
              <Grid item xs={12} sm={6} md={4} key={asset.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={getAssetImage(asset)}
                    alt={asset.assetType}
                    sx={{
                      height: 260,
                      objectFit: "contain",
                      p: 2,
                      backgroundColor: "#fafafa",
                    }}
                  />

                  <CardContent>
                    <Typography variant="h6">
                      {asset.assetType}
                    </Typography>
                    <Typography color="text.secondary">
                      {asset.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary">
              No assets allocated
            </Typography>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

function Detail({ label, value }) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography width={120} fontWeight={600}>
        {label}:
      </Typography>
      <Typography>{value || "-"}</Typography>
    </Stack>
  );
}
