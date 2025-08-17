import Alert from "@/components/common/Alert/Alert";
import { useState } from "react";
import Spinner from "@/components/common/Spinner";
import { menuQueries } from "../_queries/useMenu";
import { useMenuSelection } from "../_stores/useMenuSelection";

interface IProps {
  categoryId: string;
  storeId: string;
  close: () => void;
}

export default function DeleteAlert({ categoryId, storeId, close }: IProps) {
  const remove = menuQueries.useDeleteMenu(storeId);
  const multiRemove = menuQueries.useMultiDelete(storeId);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { selectedIds, reset } = useMenuSelection();

  const handleResponse = () => ({
    onSuccess: () => {
      close();
      reset();
    },
    onError: () => setIsSubmitted(false),
  });

  const handleAction = () => {
    if (selectedIds?.length === 0) return;

    setIsSubmitted(true);

    if (selectedIds?.length === 1) {
      remove.mutate(
        {
          categoryId,
          storeId,
          menuId: selectedIds[0],
        },
        handleResponse()
      );
      return;
    }

    multiRemove.mutate({ menuIds: selectedIds, storeId }, handleResponse());
  };

  return (
    <Alert
      onClose={close}
      onAction={handleAction}
      buttonText="삭제"
      hasNoAction={selectedIds?.length === 0}
      disabled={remove.isPending || multiRemove.isPending}
    >
      {!isSubmitted && selectedIds?.length && "선택한 메뉴를 삭제하시겠습니까?"}
      {!isSubmitted && !selectedIds?.length && "선택된 메뉴가 없습니다."}
      {isSubmitted && <Spinner />}
    </Alert>
  );
}
