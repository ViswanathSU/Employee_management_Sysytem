import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, Typography, Box, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import EditAddDialogue from "../components/EditAddDialogue";
import DeletionDialogue from "../components/DeletionDialogue";
import LogoutButton from "../components/Logout";
import AssetCountDialog from "../components/AssetCountDialog";
import AssetImagesDialog from "../components/AssetImagesDialog";
import { useNavigate } from "react-router-dom";

/* =========================
   SAFE NORMALIZERS
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
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [assetDialogOpen, setAssetDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  /* =====================
     FETCH EMPLOYEES
  ===================== */
  const loadEmployees = async () => {
  try {
    setLoading(true);

    const data = await fetchEmployees();

    if (!Array.isArray(data)) {
      console.error("Expected array but got:", data);
      setRows([]);
      return;
    }

    setRows(
      data.map((emp) => ({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        department: emp.department,
        role: emp.role,
        status: emp.status,

        //  FIX IS HERE
        assets: normalizeAssets(emp.assets),
        allocation: normalizeImages(emp.allocation),
      }))
    );
  } catch (err) {
    console.error("Fetch failed:", err);
    setRows([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadEmployees();
  }, []);

  /* =====================
     SAVE (CREATE / UPDATE)
  ===================== */
  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateEmployee(data.id, data);
      } else {
        const { id, ...payload } = data;
        await createEmployee(payload);
      }
      setEditData(null);
      loadEmployees();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  /* =====================
     DELETE
  ===================== */
  const handleDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      setDeleteId(null);
      loadEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* =====================
     TABLE COLUMNS
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
  <div>
    <Box
      p={2}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #130223, #3d0066)",
        display:"flex",justifyContent:"space-around"
      }}
    >
      <Box sx={{width:"75%" , boxShadow:6}}>
  
      <Box position="relative" mb={2}>
  {/* Center Title */}
  <Typography
    variant="h5"
    sx={{
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
      margin:2,
    }}
  >
    Employee Dashboard
  </Typography>

  {/* Logout Button - Top Right */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      right: 0,
      mr:2
    }}
  >
    <LogoutButton />
  </Box>
</Box>

      <Box
  sx={{
    backgroundColor: "#1e1e1e",
    borderRadius: 2,
    p: 1,
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    margin:2
  }}
>
   <Button
        variant="contained"
        sx={{
          mb: 2,
          fontWeight: "bold",
          borderRadius: 2,
        }}
        onClick={() => setEditData({})}
        startIcon={<PersonAddAlt1OutlinedIcon/>}
      >
        Add
      </Button>
       <Button
  variant="contained"
  sx={{
    mb: 2,
    fontWeight: "bold",
    borderRadius: 2,
    ml: 2,
  }}
  onClick={() => navigate("/allocation")}
>
  Asset Allocation
</Button>

  <DataGrid
    rows={rows}
    columns={columns}
    getRowId={(row) => row.id}
    loading={loading}
    autoHeight
    pageSizeOptions={[5, 10, 25, 100]}
    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 10 },
      },

    }}
    disableRowSelectionOnClick
    sx={{
  border: "none",
  color: "#ffffff",
  backgroundColor: "#1e1e1e",

  /* ===== HEADER BACKGROUND ===== */
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#2b2b2b",
    color: "#ffffff",
    borderBottom: "1px solid #444",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#2b2b2b",
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    color: "#ffffff",
  },

  "& .MuiDataGrid-columnHeadersInner": {
    backgroundColor: "#2b2b2b",
  },

  "& .MuiDataGrid-filler": {
    backgroundColor: "#2b2b2b",
  },

  /* ===== ROWS ===== */
  "& .MuiDataGrid-row": {
    backgroundColor: "#1e1e1e",
    borderBottom: "1px solid #333",
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#2f2f2f",
  },

  /* ===== CELLS ===== */
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },

  /* ===== FOOTER ===== */
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#2b2b2b",
    color: "#ffffff",
    borderTop: "1px solid #444",
  },

  "& .MuiTablePagination-root": {
    color: "#ffffff",
  },

  "& .MuiSvgIcon-root": {
    color: "#ffffff",
  },
}}
  />
</Box>


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

      <AssetCountDialog
        open={assetDialogOpen}
        onClose={() => setAssetDialogOpen(false)}
        assets={selectedAssets}
      />

      <AssetImagesDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        images={selectedImages}
      />
    </Box>
  </Box>
  </div>
);

};

export default EmployeePage;
