import { useQueryClient } from "@tanstack/react-query";
import { useSSE } from "@/hooks/useSSE";

export const useHallSSE = () => {
  const queryClient = useQueryClient();

  useSSE({
    ORDER: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list", false] });
    },
    STAFF_CALL: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-call"] });
    },
  });
};
