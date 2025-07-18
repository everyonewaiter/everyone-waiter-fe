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
