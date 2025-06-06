import { signatureInstance } from "../axios/instance";
import API_PATH from "./paths";

export const waitingList = async (): Promise<{ waitings: Waiting[] }> => {
  const response = await signatureInstance.get(`${API_PATH.waitings}`);
  return response.data;
};

export const waitingCount = async (): Promise<{ count: number }> => {
  const response = await signatureInstance.get(`${API_PATH.waitings}/count`);
  return response.data;
};

export const addWaiting = async (
  body: Pick<Waiting, "phoneNumber" | "adult" | "infant">
) => {
  const response = await signatureInstance.post(`${API_PATH.waitings}`, body);
  return response.data;
};

export const waitingAction = async ({
  waitingId,
  type,
}: {
  waitingId: string;
  type: "complete" | "cancel" | "call";
}) => {
  const response = await signatureInstance.post(
    `${API_PATH.waitings}/${waitingId}/${type}`
  );
  return response.data;
};
