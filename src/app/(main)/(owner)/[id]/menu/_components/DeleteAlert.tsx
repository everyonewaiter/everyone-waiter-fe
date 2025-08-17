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

  console.log(selected);

  return (
    <Alert
      onClose={close}
      onAction={() => {
        const fn =
          selected?.length >= 2
            ? () =>
                multiRemove.mutate(
                  { menuIds: selected.map((el) => el.menuId), storeId },
                  {
                    onSuccess: () => close(),
                  }
                )
            : () =>
                remove.mutate(
                  {
                    categoryId,
                    storeId,
                    menuId: selected[0].menuId,
                  },
                  {
                    onSuccess: () => close(),
                  }
                );

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
