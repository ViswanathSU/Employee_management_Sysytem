import api from "./api";

// ASSIGN ASSET (multipart + JWT)
export const assignAsset = async ({ employeeId, assetType, image }) => {
  const formData = new FormData();
  formData.append("employeeId", employeeId);
  formData.append("assetType", assetType);
  formData.append("image", image);

  const res = await api.post("/allocations/assignasset", formData);
  return res.data;
};

// RETURN ASSET (JSON)
export const returnAsset = async ({ employeeId, assetType }) => {
  const res = await api.post("/allocations/returnasset", {
    employeeId: Number(employeeId),
    assetType, // match backend
  });
  return res.data;
};



// GET EMPLOYEES WITH ASSETS
export const getEmployeesWithAssets = async () => {
  const res = await api.get("/allocations/employeewithasset");

  const data =
    res.data?.employees ||
    res.data?.data ||
    res.data?.result ||
    res.data;

  return Array.isArray(data) ? data : [];
};
