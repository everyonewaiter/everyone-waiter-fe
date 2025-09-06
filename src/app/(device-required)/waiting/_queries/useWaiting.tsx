import { useMutation } from "@tanstack/react-query";
import {
  addWaiting,
  waitingAction,
} from "@/app/(device-required)/waiting/_api/waiting.api";
import getQueryClient from "@/app/get-query-client";
import { waitingKeys } from "./keys";

const queryClient = getQueryClient();

const useAddWaiting = () =>
  useMutation({
    mutationFn: addWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

const useControlWaiting = () =>
  useMutation({
    mutationFn: waitingAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitingKeys.all() });
    },
  });

export const waitingQueries = {
  useAddWaiting,
  useControlWaiting,
};
