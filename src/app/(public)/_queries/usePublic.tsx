import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelWaiting,
  getMenuPreview,
  getTeamsFrontOfMe,
} from "../_api/public.api";

const useCheckWaiting = (storeId: string, accessKey: string) =>
  useQuery({
    queryKey: ["front-of-my-turn"],
    queryFn: () =>
      getTeamsFrontOfMe({ storeId: storeId!, accessKey: accessKey! }),
    enabled: !!storeId && !!accessKey,
  });

const useCancelMyTurn = () =>
  useMutation({
    mutationFn: cancelWaiting,
    onError: (error: any) => {
      const code = error?.response?.data?.code;

      if (code === "ONLY_REGISTRATION_STATE_CAN_BE_CANCEL") {
        // eslint-disable-next-line
        alert("등록된 웨이팅 번호가 아닙니다.");
        return;
      }

      if (code === "WAITING_NOT_FOUND") {
        // eslint-disable-next-line
        alert("웨이팅을 찾을 수 없습니다.");
        return;
      }

      // eslint-disable-next-line
      alert("알 수 없는 오류가 발생했습니다.");
    },
  });

const usePreviewMenu = (storeId: string) =>
  useQuery({
    queryKey: ["menu-list", storeId],
    queryFn: () => getMenuPreview(storeId!),
    enabled: !!storeId,
  });

export const publicQueries = {
  useCancelMyTurn,
  useCheckWaiting,
  usePreviewMenu,
};
