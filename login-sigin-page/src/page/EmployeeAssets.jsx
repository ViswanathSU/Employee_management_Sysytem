import { useEffect, useState } from "react";
import { Box, Typography, Avatar, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getEmployeeAssetsMerged } from "../api/employeeAssetsApi";

const EmployeeAssets = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getEmployeeAssetsMerged();
      console.log("EMPLOYEE ASSET ROWS ", data);
      setRows(data);
    } catch (err) {
      console.error("Failed to load employee assets", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 130,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },
    {
      field: "assets",
      headerName: "Assets",
      flex: 1,
      renderCell: (params) => (
        <Stack spacing={0.5}>
          {params.value.length === 0 ? (
            <Typography variant="body2">No Assets</Typography>
          ) : (
            params.value.map((a, i) => (
              <Typography key={i} variant="body2">
                • {a.assetType}
              </Typography>
            ))
          )}
        </Stack>
      ),
    },
    {
      field: "images",
      headerName: "Images",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.row.assets.map((a, i) => (
            <Avatar
              key={i}
              variant="rounded"
              sx={{ width: 40, height: 40 }}
              src={`https://hard-ingratiating-ila.ngrok-free.dev/${a.image}`}
            />
          ))}
        </Stack>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Employee Asset Details
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        pageSizeOptions={[5, 10, 25, 100]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default EmployeeAssets;
