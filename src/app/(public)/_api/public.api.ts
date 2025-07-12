import API_PATH from "@/lib/api/paths";
import { authInstance } from "@/lib/axios/instance";

export const getTeamsFrontOfMe = async ({
  storeId,
  accessKey,
}: {
  storeId: string;
  accessKey: string;
}): Promise<{
  number: number;
  initWaitingTeamCount: number;
  currentWaitingTeamCount: number;
  state: "REGISTRATION";
}> => {
  const response = await authInstance.get(
    `${API_PATH.stores}/${storeId}/waitings/${accessKey}/my-turn`
  );
  return response.data;
};

export const cancelWaiting = async ({
  storeId,
  accessKey,
}: {
  storeId: string;
  accessKey: string;
}) => {
  const response = await authInstance.get(
    `${API_PATH.stores}/${storeId}/waitings/${accessKey}/cancel`
  );
  return response.data;
};
