import {
  Box,
  Typography,
  Paper,
  Stack,
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
import { getAssetImage } from "../utils/imageHelper";

export default function UserDetail() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        console.log("USER PROFILE:", data);
        console.log("USER ASSETS:", data.assets);
        console.log("USER ASSETS image:", data.assets.assetType);
        setUser(data);
      })
      .catch(console.error);
  }, []);
  /*const IMAGE_BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";

  const getAssetImage = (asset) => 
  asset ? `${IMAGE_BASE_URL}/${asset.replace(/\\/g, "/")}` : "https://via.placeholder.com/300x400";

*/
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
        <Typography variant="h5" fontWeight={700}>
          User Details
        </Typography>

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
            user.assets.map((asset, index) => (
              <Grid
                key={asset.id ?? `${asset.assetType}-${index}`}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
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
                    /*onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/no-image.png";
                    }}*/
                  />

                  <CardContent>
                    <Typography variant="h6">
                      {asset.assetType}
                    </Typography>
                    <Typography color="text.secondary">
                      {asset.status || "Assigned"}
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
