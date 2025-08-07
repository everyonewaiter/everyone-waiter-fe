"use client";

import QueryProviders from "@/app/query-providers";
import Icon from "@/components/common/Icon/Icon";
import InfoPopup from "@/components/InfoPopup";
import useOverlay from "@/hooks/useOverlay";
import { StoreProvider } from "@/providers/storeProvider";

export default function PopupButton({ storeId }: { storeId: string }) {
  const { open, close } = useOverlay();

  const handleOpenPopup = () => {
    open(() => (
      <QueryProviders>
        <StoreProvider storeId={storeId}>
          <InfoPopup close={close} />
        </StoreProvider>
      </QueryProviders>
    ));
  };

  return (
    <button
      type="button"
      className="center relative h-8 w-8 rounded-[12px] border border-gray-400 lg:h-12 lg:w-12 lg:rounded-[16px]"
      onClick={handleOpenPopup}
      aria-label="프로필 메뉴 열기"
    >
      <Icon iconKey="user" size={24} className="md:h-6 md:w-6 lg:h-8 lg:w-8" />
    </button>
  );
}
