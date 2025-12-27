import api from "./api";

/**
 * Update total quantity of an asset
 */
export const updateAssetQuantity = async ({ assetType, totalQuantity }) => {
  const res = await api.post("/assets/quantity", {
    assetType,        
    totalQuantity,    
  });

  return res.data;
};

/**
 * Get all assets
 */
export const getAllAssets = async () => {
  const res = await api.get("/assets/getallasset");
    return res.data;
};

