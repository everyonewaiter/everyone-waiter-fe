import getQueryClient from "@/app/get-query-client";
import { addWaiting, waitingAction, waitingList } from "@/lib/api/waiting.api";
import { useMutation, useQuery } from "@tanstack/react-query";

const queryClient = getQueryClient();

export default function useWaiting(enabled = true) {
  const { data: list } = useQuery({
    queryKey: ["waiting-list"],
    queryFn: waitingList,
    enabled,
  });

  const { mutate: mutateWaiting } = useMutation({
    mutationFn: addWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waiting-list"] });
    },
  });

  const { mutate: mutateAction } = useMutation({
    mutationFn: waitingAction,
  });

  return {
    list,
    mutateWaiting,
    mutateAction,
  };
}
