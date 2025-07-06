import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  completeStaffCall,
  getWaitingsList,
  serveMenu,
  serveOrder,
} from "../_api/hall.api";

export default function useHall() {
  const queryClient = getQueryClient();

  const list = useQuery({
    queryKey: ["waitings-list"],
    queryFn: getWaitingsList,
  });

  const servingOrder = useMutation({
    mutationFn: serveOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitings-list"] });
    },
  });

  const servingMenu = useMutation({
    mutationFn: serveMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitings-list"] });
    },
  });

  const completeStaff = useMutation({
    mutationFn: completeStaffCall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitings-list"] });
    },
  });

  return {
    list,
    servingOrder,
    servingMenu,
    completeStaff,
  };
}
