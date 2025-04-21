"use client";

import MobileSidebar from "@/app/(main)/_components/MobileSidebar";
import useOverlay from "@/shared/hooks/useOverlay";
import { Menu } from "lucide-react";

export default function SideBarButton() {
  const { open, close } = useOverlay();

  const handleOpenSidebar = () => {
    open(() => <MobileSidebar onClose={close} />);
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
