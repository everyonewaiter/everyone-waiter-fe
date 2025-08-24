import { useSSE } from "@/hooks/useSSE";
import { useNotificationStore } from "../../_stores/useNotificationStore";

export const useWaitingSSE = () => {
  const { incrementOrder } = useNotificationStore();

  useSSE({
    ORDER: () => {
      incrementOrder();
    },
    WAITING: () => {
      // something
    },
  });
};
