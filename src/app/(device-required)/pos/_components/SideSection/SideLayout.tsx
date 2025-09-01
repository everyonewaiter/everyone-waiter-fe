"use client";

import { PropsWithChildren } from "react";
import cn from "@/lib/utils";

interface IProps {
  className?: string;
}

export default function SideLayout({
  children,
  className,
}: PropsWithChildren<IProps>) {
  return (
    <aside
      className={cn(
        "shadow-custom flex h-full w-[calc(100dvw*0.33)] gap-8 rounded-tl-[40px] rounded-bl-[40px] px-8 py-10 pb-8",
        className
      )}
    >
      {children}
    </aside>
  );
}
