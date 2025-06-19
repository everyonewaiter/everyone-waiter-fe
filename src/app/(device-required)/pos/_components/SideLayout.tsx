"use client";

import cn from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function SideLayout({
  children,
  className,
}: PropsWithChildren<IProps>) {
  return (
    <aside
      className={cn(
        "shadow-custom flex h-full w-[648px] flex-col gap-8 rounded-tl-[40px] rounded-bl-[40px] px-8 py-10 pb-8",
        className
      )}
    >
      {children}
    </aside>
  );
}
