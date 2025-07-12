import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelWaiting, getTeamsFrontOfMe } from "../_api/public.api";

export default function usePublic(storeId: string, accessKey: string) {
  const waiting = useQuery({
    queryKey: ["front-of-my-turn"],
    queryFn: () => getTeamsFrontOfMe({ storeId, accessKey }),
  });

  const cancelMyTurn = useMutation({
    mutationFn: cancelWaiting,
  });

  return {
    waiting,
    cancelMyTurn,
  };
}
