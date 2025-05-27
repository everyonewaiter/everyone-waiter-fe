import { postCategory } from "@/lib/api/stores.api";
import { TypeCategory } from "@/schema/store.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePostCategory({ storeId }: { storeId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TypeCategory) => postCategory(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-list", storeId],
      });
    },
  });
}
