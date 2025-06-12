"use client";

import { PropsWithChildren, useRef } from "react";
import { useRouter } from "next/navigation";
import useOutsideClick from "@/hooks/useOutSideClick";
import useEscapeKey from "@/hooks/useEscapeKey";

export default function RefLayout({
  children,
  width,
}: PropsWithChildren<{ width?: number }>) {
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
      className="rounded-[30px] bg-white p-8"
      style={{ width: width || "540px" }}
    >
      {children}
    </div>
  );
}
