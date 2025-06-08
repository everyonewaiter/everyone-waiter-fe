import { signatureInstance } from "../axios/instance";
import API_PATH from "./paths";

export const getTables = async (): Promise<{ tables: POSTables[] }> => {
  const response = await signatureInstance.get(`${API_PATH.pos}/tables`);
  return response.data;
};

export const a = {};
