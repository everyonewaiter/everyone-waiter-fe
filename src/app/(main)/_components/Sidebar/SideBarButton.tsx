"use client";

import { Menu } from "lucide-react";
import QueryProviders from "@/app/query-providers";
import useOverlay from "@/hooks/useOverlay";
import MobileSidebar from "../MobileLayout/MobileSidebar";

export default function SideBarButton() {
  const { open, close } = useOverlay();

  const handleOpenSidebar = () => {
    open(() => (
      <QueryProviders>
        <MobileSidebar onClose={close} />
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
