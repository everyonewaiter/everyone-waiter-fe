"use client";

import { PropsWithChildren, useRef } from "react";
import { useRouter } from "next/navigation";
import useOutsideClick from "@/hooks/useOutSideClick";
import useEscapeKey from "@/hooks/useEscapeKey";

export default function RefLayout({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOutsideClick({
    ref,
    handler: () => router.back(),
  });
  useEscapeKey({ handler: () => router.back() });

  return (
    <div ref={ref} className="w-[540px] rounded-[30px] bg-white p-8">
      {children}
    </div>
  );
}
