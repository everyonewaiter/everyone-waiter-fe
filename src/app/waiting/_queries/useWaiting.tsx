import getQueryClient from "@/app/get-query-client";
import {
  addWaiting,
  waitingAction,
  waitingList,
} from "@/app/waiting/_api/waiting.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { waitingKeys } from "./keys";

const queryClient = getQueryClient();

export default function useWaiting(enabled = true) {
  const { data: list } = useQuery({
    queryKey: waitingKeys.all(),
    queryFn: waitingList,
    enabled,
  });

  const add = useMutation({
    mutationFn: addWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

  const action = useMutation({
    mutationFn: waitingAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

  return {
    list,
    add,
    action,
  };
}
