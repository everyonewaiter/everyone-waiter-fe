"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useRef } from "react";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import cn from "@/lib/utils";

export default function RefLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOutsideClick({
    ref,
    handler: (e) => {
      const dropdown = document.querySelector("[data-dropdown-open]");
      if (dropdown && dropdown.contains(e.target as Node)) {
        return;
      }
      router.back();
    },
  });
  useEscapeKey({ handler: () => router.back() });

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[20px] bg-white px-4 py-5 md:p-5 lg:rounded-[30px] lg:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
