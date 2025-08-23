"use client";

import { Menu } from "@/components/common/Icon/index";
import QueryProviders from "@/app/query-providers";
import useOverlay from "@/hooks/useOverlay";
import { StoreProvider } from "@/providers/storeProvider";
import MobileSidebar from "../MobileLayout/MobileSidebar";

export default function SideBarButton({ storeId }: { storeId?: string }) {
  const { open, close } = useOverlay();

  const handleOpenSidebar = () => {
    open(() => (
      <QueryProviders>
        <StoreProvider storeId={storeId!}>
          <MobileSidebar onClose={close} />
        </StoreProvider>
      </QueryProviders>
    ));
  };

  return (
    <button
      type="button"
      onClick={handleOpenSidebar}
      className="absolute left-5 cursor-pointer"
    >
      <Menu color="#222" width={24} height={24} />
    </button>
  );
}
