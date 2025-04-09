"use client";

import Sidebar from "@/components/common/Sidebar";
import useOverlay from "@/hooks/use-overlay";
import { Menu } from "lucide-react";

export default function SideBarButton() {
  const { open, close } = useOverlay();

  const handleOpenSidebar = () => {
    open(() => <Sidebar onClose={close} />);
  };

  return (
    <button
      type="button"
      onClick={handleOpenSidebar}
      className="absolute left-5"
    >
      <Menu color="#222" width={24} height={24} />
    </button>
  );
}
