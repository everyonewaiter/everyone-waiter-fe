"use client";

import QueryProviders from "@/app/query-providers";
import Alert from "@/components/common/Alert/Alert";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";
import useStoreOpenStore from "@/stores/useStoreOpenStore";

export default function OpenStore() {
  const { isStoreOpen, storeClose, storeOpen } = useStoreOpenStore();

  const { open, close } = useOverlay();

  const handleOpenStore = () => {
    open(() => (
      <QueryProviders>
        <Alert
          onClose={close}
          buttonText={isStoreOpen ? "마감하기" : "오픈하기"}
          onAction={() => {
            if (isStoreOpen) {
              storeClose();
            } else {
              storeOpen();
            }
            close();
          }}
        >
          매장을 {isStoreOpen ? "마감" : "오픈"}하시겠습니까?
        </Alert>
      </QueryProviders>
    ));
  };

  return (
    <button
      type="button"
      className={cn(
        "font-regular flex h-[44px] flex-row gap-3 rounded-[40px] border px-3 py-[10px] text-base",
        isStoreOpen
          ? "border-status-success text-gray-0 bg-[#6BD78620]"
          : "border-gray-400 bg-gray-600 text-gray-300"
      )}
      onClick={handleOpenStore}
    >
      <div
        className={cn(
          "h-[23px] w-[23px] rounded-full",
          isStoreOpen ? "bg-status-success" : "bg-gray-400"
        )}
      />
      {isStoreOpen ? "영업 중" : "영업 마감"}
    </button>
  );
}
