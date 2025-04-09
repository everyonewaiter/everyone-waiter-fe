"use client";

import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useRef } from "react";

interface SideBarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SideBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex backdrop-blur-sm md:hidden">
      <aside
        ref={ref}
        className="relative flex h-screen w-[312px] flex-col overflow-auto bg-white"
      >
        dds
      </aside>
    </div>
  );
}
