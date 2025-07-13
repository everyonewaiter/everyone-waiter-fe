import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelWaiting,
  getMenuPreview,
  getTeamsFrontOfMe,
} from "../_api/public.api";

export default function usePublic(storeId?: string, accessKey?: string) {
  const waiting = useQuery({
    queryKey: ["front-of-my-turn"],
    queryFn: () =>
      getTeamsFrontOfMe({ storeId: storeId!, accessKey: accessKey! }),
    enabled: !!storeId && !!accessKey,
  });

  const cancelMyTurn = useMutation({
    mutationFn: cancelWaiting,
  });

  const menus = useQuery({
    queryKey: ["menu-list", storeId],
    queryFn: () => getMenuPreview(storeId!),
    enabled: !!storeId,
  });

  return {
    waiting,
    cancelMyTurn,
    menus,
  };
}
