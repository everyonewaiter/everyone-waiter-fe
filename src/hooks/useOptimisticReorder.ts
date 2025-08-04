import { arrayMove } from "@dnd-kit/sortable";
import { QueryClient, QueryKey, useMutation } from "@tanstack/react-query";

interface MoveParams {
  sourceId: string;
  targetId: string;
  where: "NEXT" | "PREVIOUS";
  storeId: string;
}

export function useOptimisticReorderMutation<T extends { id: string }>(
  mutationFn: (params: MoveParams) => Promise<any>,
  keyBuilder: (storeId: string) => QueryKey
) {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (moveData: MoveParams) => {
      await queryClient.cancelQueries({
        queryKey: keyBuilder(moveData.storeId),
      });

      const prev = queryClient.getQueryData<T[]>(keyBuilder(moveData.storeId));

      queryClient.setQueryData<T[]>(keyBuilder(moveData.storeId), (old) => {
        if (!old) return old;
        const oldIndex = old.findIndex((i) => i.id === moveData.sourceId);
        const newIndex = old.findIndex((i) => i.id === moveData.targetId);
        return arrayMove(old, oldIndex, newIndex);
      });

      return { prev };
    },
    onError: (_err, vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(keyBuilder(vars.storeId), context.prev);
      }
    },
    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ queryKey: keyBuilder(vars.storeId) });
    },
  });
}
