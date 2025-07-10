"use client";

import { NowContext } from "@/providers/nowProvider";
import { PropsWithChildren, useMemo } from "react";

export default function ClientLayout({
  children,
  now,
}: PropsWithChildren<{ now: string }>) {
  const memoized = useMemo(() => now, [now]);

  return <NowContext.Provider value={memoized}>{children}</NowContext.Provider>;
}
