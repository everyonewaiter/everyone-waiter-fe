import Alert from "@/components/common/Alert/Alert";
import { menuQueries } from "../_queries/useMenu";

interface IProps {
  selected: { menuId: string }[];
  categoryId: string;
  storeId: string;
  close: () => void;
}

export default function DeleteAlert({
  selected,
  categoryId,
  storeId,
  close,
}: IProps) {
  const remove = menuQueries.useDeleteMenu(storeId);
  const multiRemove = menuQueries.useMultiDelete(storeId);

  return (
    <Alert
      onClose={close}
      onAction={() => {
        const fn =
          selected.length > 1
            ? () => multiRemove.mutate({ body: selected, storeId })
            : () =>
                remove.mutate({
                  categoryId,
                  storeId,
                  menuId: selected[0].menuId,
                });

        fn();
      }}
      buttonText="삭제"
      hasNoAction={selected?.length === 0}
      disabled={remove.isPending || multiRemove.isPending}
    >
      {selected?.length
        ? "선택한 메뉴를 삭제하시겠습니까?"
        : "선택된 메뉴가 없습니다."}
    </Alert>
  );
}
