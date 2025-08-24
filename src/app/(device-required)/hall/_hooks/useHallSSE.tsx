import { useQueryClient } from "@tanstack/react-query";
import { useSSE } from "@/hooks/useSSE";
import { useNotificationStore } from "../../_stores/useNotificationStore";

export const useHallSSE = () => {
  const queryClient = useQueryClient();
  const { incrementWaiting } = useNotificationStore();

  useSSE({
    ORDER: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list", false] });
    },
    STAFF_CALL: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-call"] });
    },
    WAITING: () => {
      incrementWaiting();
    },
  });
};
