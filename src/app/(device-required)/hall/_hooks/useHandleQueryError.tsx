import { useEffect, useRef } from "react";
import getQueryClient from "@/app/get-query-client";

export default function useHandleQueryError(
  handleOpenAlert: (message: string) => void,
  setHasError: (value: {
    staffCall: boolean;
    servedList: boolean;
    orders: boolean;
  }) => void,
  ...results: { isError: boolean; error: unknown }[]
) {
  const queryClient = getQueryClient();
  const shownRef = useRef(false);

  useEffect(() => {
    if (shownRef.current) return;

    results.some(({ isError, error }) => {
      if (isError) {
        const { message, code } = (error as any)?.response?.data ?? {};
        if (code === "STORE_IS_CLOSED") {
          handleOpenAlert(message);
          shownRef.current = true;

          queryClient.cancelQueries({ queryKey: ["order-list"] });
          queryClient.cancelQueries({ queryKey: ["staff-calls"] });
          setHasError({ staffCall: true, servedList: true, orders: true });
          return true;
        }
      }
      return false;
    });
  }, [results, handleOpenAlert, queryClient, setHasError]);
}
