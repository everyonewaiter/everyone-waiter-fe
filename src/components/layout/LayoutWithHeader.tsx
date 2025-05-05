"use client";

import { usePathname } from "next/navigation";
import cn from "@/lib/utils";
import { PropsWithChildren } from "react";
import Header from "./Header";

interface IProps {
  openPopup: () => void;
}

export default function LayoutWithHeader({
  children,
  openPopup,
}: PropsWithChildren<IProps>) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex w-full flex-col md:hidden",
        pathname === "/" ? "h-screen" : "min-h-screen"
      )}
    >
      <div className={cn("block", pathname === "/stores" && "md:hidden")}>
        <Header openMobileSidebar={openPopup} />
      </div>
      <section className="my-14 flex min-h-full w-screen flex-row items-center justify-center rounded-[28px] md:h-[calc(100%-40px)] md:p-5 lg:h-[calc(100%-64px)] lg:min-w-[1458px] lg:p-8">
        {children}
      </section>
    </div>
  );
}
