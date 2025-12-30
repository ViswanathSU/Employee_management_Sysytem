import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Stack,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import EditAddDialogue from "../components/EditAddDialogue";
import DeletionDialogue from "../components/DeletionDialogue";

import NavBar from "../components/NavBar";

import { useNavigate } from "react-router-dom";
import { getThemeColors, getButtonStyle } from "../components/utils";

/* =========================
   NORMALIZERS
========================= */
const normalizeAssets = (assets) => {
  if (Array.isArray(assets)) return assets;
  if (assets && typeof assets === "object")
    return Object.keys(assets).filter((k) => assets[k]);
  return [];
};

const normalizeImages = (allocation) =>
  Array.isArray(allocation) ? allocation : [];

const EmployeePage = () => {
  const colors = getThemeColors();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =====================
     FETCH EMPLOYEES
  ===================== */
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployees();

      setRows(
        Array.isArray(data)
          ? data.map((emp) => ({
              id: emp.id,
              name: emp.name,
              email: emp.email,
              department: emp.department,
              role: emp.role,
              status: emp.status,
              assets: normalizeAssets(emp.assets),
              allocation: normalizeImages(emp.allocation),
            }))
          : []
      );
    } catch (err) {
      console.error(err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  /* =====================
     SAVE
  ===================== */
  const handleSave = async (data) => {
    if (data.id) {
      await updateEmployee(data.id, data);
    } else {
      const { id, ...payload } = data;
      await createEmployee(payload);
    }
    setEditData(null);
    loadEmployees();
  };

  /* =====================
     DELETE
  ===================== */
  const handleDelete = async () => {
    await deleteEmployee(deleteId);
    setDeleteId(null);
    loadEmployees();
  };

  /* =====================
     COLUMNS
  ===================== */
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => setEditData(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => setDeleteId(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box minHeight="100vh" sx={{ background: colors.bgColor }}>
      {/* NAVBAR */}
      <NavBar />

      {/* CONTENT */}
      <Box display="flex" justifyContent="center" p={3}>
        <Paper
          elevation={4}
          sx={{
            width: "90%",
            borderRadius: 3,
            p: 3,
            backgroundColor: colors.paperColor,
          }}
        >
          {/* HEADER */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight={700}>
              Employee Dashboard
            </Typography>
          </Stack>

          {/* ACTION BUTTONS */}
          <Stack direction="row" spacing={2} mb={2} sx={{display:"flex", justifyContent:"flex-end"}}>
            <Button
              sx={getButtonStyle()}
              startIcon={<PersonAddAlt1OutlinedIcon />}
              onClick={() => setEditData({})}
              styles={{width:"20%",}}
            >
              Add Employee
            </Button>
          </Stack>

          {/* TABLE */}
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          />
        </Paper>
      </Box>

      {/* DIALOGS */}
      {editData && (
        <EditAddDialogue
          open
          initialData={editData}
          onClose={() => setEditData(null)}
          onSubmit={handleSave}
        />
      )}

      {deleteId && (
        <DeletionDialogue
          open
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  );
};

export default EmployeePage;
