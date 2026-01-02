import api from "./api";

// ASSIGN ASSET (multipart + JWT)
export const assignAsset = async ({ employeeId, assetType, image }) => {
  const formData = new FormData();
  formData.append("employeeId", employeeId);
  formData.append("assetType", assetType);
  formData.append("image", image);

  const res = await api.post(
    "/allocations/assignasset",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    }
  );

  return res.data;
};


// RETURN ASSET (JSON)
export const returnAsset = async ({ employeeId, assetType }) => {
  const res = await api.post("/allocations/returnasset", {
    employeeId: Number(employeeId),
    assetType, 
  });
  return res.data;
};



// GET EMPLOYEES WITH ASSETS
export const getEmployeesWithAssets = async (assetType) => {
  const res = await api.get("/allocations/employeewithasset");
  return res.data;
};