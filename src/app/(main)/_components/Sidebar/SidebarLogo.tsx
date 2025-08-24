"use client";

import Logo from "@/components/Logo";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarLogo() {
  const navigate = useRouter();
  const pathname = usePathname();
  const storeId = pathname.split("/")[1];

  return (
    <button
      type="button"
      className="mb-6 flex items-center gap-[18px] lg:mb-9"
      onClick={() => navigate.push(`/${storeId}`)}
    >
      <Logo width={40} height={40} />
      <h1 className="font-hakgyo text-primary text-base lg:text-2xl">
        모두의 웨이터
      </h1>
    </button>
  );
}
