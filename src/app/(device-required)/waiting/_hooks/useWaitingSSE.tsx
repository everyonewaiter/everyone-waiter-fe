import { useSSE } from "@/hooks/useSSE";

interface UseWaitingSSEOptions {
  onOrderReceived?: () => void;
}

export const useWaitingSSE = (options?: UseWaitingSSEOptions) => {
  useSSE({
    ORDER: () => {
      options?.onOrderReceived?.();
    },
  });
};
