"use client";

import QueryProviders from "@/app/query-providers";
import Icon from "@/components/common/Icon/Icon";
import InfoPopup from "@/components/InfoPopup";
import useOverlay from "@/hooks/useOverlay";

export default function PopupButton({ storeId }: { storeId?: string }) {
  const { open, close } = useOverlay();

  const handleOpenPopup = () => {
    const button = document.querySelector("[data-popup-button]") as HTMLElement;
    if (button) {
      const rect = button.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 8;
      const right = window.innerWidth - rect.right;

      document.documentElement.style.setProperty("--popup-top", `${top}px`);
      document.documentElement.style.setProperty("--popup-right", `${right}px`);
    }

    open(() => (
      <QueryProviders>
        <InfoPopup close={close} storeId={storeId} />
      </QueryProviders>
    ));
  };

  return (
    <button
      type="button"
      data-popup-button
      className="center relative h-8 w-8 rounded-xl border border-gray-400 lg:h-12 lg:w-12 lg:rounded-2xl"
      onClick={handleOpenPopup}
      aria-label="프로필 메뉴 열기"
    >
      <Icon
        iconKey="user"
        size={24}
        className="hover:animate-pulse md:h-6 md:w-6 lg:h-8 lg:w-8"
      />
    </button>
  );
}
