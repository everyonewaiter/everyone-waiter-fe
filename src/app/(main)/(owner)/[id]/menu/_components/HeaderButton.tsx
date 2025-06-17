import QueryProviders from "@/app/query-providers";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import useOverlay from "@/hooks/use-overlay";
import { ArrowDownUp } from "lucide-react";
import { useStoreContext } from "@/providers/storeProvider";
import DeleteAlert from "./DeleteAlert";

interface IProps {
  selectedCards: { menuId: string }[];
  categoryId: string;
  changeSort: boolean;
  onSetChangeSort: (value: boolean) => void;
}

export default function HeaderButton({
  selectedCards,
  categoryId,
  changeSort,
  onSetChangeSort,
}: IProps) {
  const { open, close } = useOverlay();
  const { storeId } = useStoreContext();

  const handleDeleteSelected = () => {
    open(() => (
      <QueryProviders>
        <DeleteAlert
          selected={selectedCards}
          categoryId={categoryId}
          storeId={storeId}
          close={close}
        />
      </QueryProviders>
    ));
  };

  const handleSaveSort = () => onSetChangeSort(false);

  return (
    <div className="flex items-center justify-end gap-4 lg:gap-6">
      {changeSort ? (
        <div className="flex items-center gap-2">
          <div className="text-primary font-regular hidden h-9 items-center justify-center rounded-[8px] bg-[rgba(242,32,32,0.04)] px-4 text-sm lg:flex">
            메뉴의 순서 변경은 메뉴를 꾹 누르신 후, 원하시는 자리로 메뉴를
            이동해주세요
          </div>
          <ResponsiveButton
            variant="outline"
            responsiveButtons={{
              lg: { buttonSize: "sm" },
              md: { buttonSize: "sm" },
              sm: { buttonSize: "sm" },
            }}
            onClick={handleSaveSort}
          >
            저장
          </ResponsiveButton>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="flex items-center gap-1 lg:gap-2"
            onClick={() => onSetChangeSort(true)}
          >
            <ArrowDownUp
              size={18}
              strokeWidth={1.5}
              className="text-gray-300"
            />
            <span className="text-sm text-gray-300 lg:text-lg">순서 변경</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 lg:gap-2"
            onClick={handleDeleteSelected}
          >
            <Icon iconKey="trash" className="text-status-error" size={18} />
            <span className="text-status-error text-sm lg:text-lg">삭제</span>
          </button>
        </>
      )}
    </div>
  );
}
