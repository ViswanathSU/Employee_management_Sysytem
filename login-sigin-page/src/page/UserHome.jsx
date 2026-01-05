import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../components/UserNavBar";
import { getMyProfile } from "../api/profileApi";
import { getButtonStyle } from "../components/utils";

export default function UserHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Typography align="center" mt={5}>
        Loading...
      </Typography>
    );
  }

  if (!user) {
    return (
      <Typography align="center" mt={5}>
        Unable to load user profile
      </Typography>
    );
  }

  return (
    <Box minHeight="100vh" sx={{ background: "#f5f7fb",}}>
      <UserNavBar />

      {/* WELCOME */}
      <Paper sx={{ p: 4, m: 3, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Welcome, {user.name}
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Employee Home
        </Typography>
      </Paper>

      {/* PROFILE SUMMARY */}
      <Paper sx={{ p: 5, m: 3, borderRadius: 3 }}>
        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar sx={{ width: 96, height: 96, fontSize: 36 }}>
            {user.name?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography color="text.secondary">
              {user.role}
            </Typography>
            
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={2}>
          <Detail label="Email" value={user.email} />
          <Detail label="Employment Status" value={user.status || "Active"} />
        </Stack>

        <Button
          variant="contained"
          sx={{...getButtonStyle(), marginTop:2}}
          onClick={() => navigate("/userdetail")}
        >
          View Full Profile
        </Button>
      </Paper>

      {/* QUICK INFO CARDS */}
      <Grid container spacing={3} px={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Department
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {user.department}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Role
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {user.role}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {user.status || "Active"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ANNOUNCEMENTS */}
      <Paper sx={{ p: 5, m: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Announcements
        </Typography>

        <Stack spacing={2}>
          <Typography color="text.secondary">
            • Annual performance reviews will begin next month.
          </Typography>
          <Typography color="text.secondary">
            • Please ensure your personal and contact details are up to date.
          </Typography>
          <Typography color="text.secondary">
            • Asset usage policy has been updated — review before acknowledgment.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

/* ---------- DETAIL ROW ---------- */
function Detail({ label, value }) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography width={180} fontWeight={600}>
        {label}:
      </Typography>
      <Typography color="text.secondary">
        {value || "-"}
      </Typography>
    </Stack>
  );
}
