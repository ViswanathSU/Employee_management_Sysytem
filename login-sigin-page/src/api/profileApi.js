import api from "./api";
import { getDecodedToken } from "../utils/auth";

export const getMyProfile = async () => {
  const decoded = getDecodedToken();

  if (!decoded?.id) {
    throw new Error("Invalid token");
  }

  const res = await api.get(`/employees/${decoded.id}`);
  return res.data;
};
