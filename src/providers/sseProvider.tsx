"use client";

import React, { createContext, useEffect, useState } from "react";
import { deviceQueries } from "@/app/(public)/device/_queries/useDeviceInfo";
import { SseService } from "@/utils/sse";
import { usePathname } from "next/navigation";

const SseContext = createContext(null);

export function SseProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [canActive, setCanActive] = useState(false);
  const { data: device, isSuccess } = deviceQueries.useDeviceDetail(canActive);

  useEffect(() => {
    if (pathname === "/device") {
      setCanActive(false);
    } else {
      setCanActive(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!device || !isSuccess) {
      return undefined;
    }

    const sseService = new SseService(device);

    (async () => {
      await sseService.connect();
    })();

    return () => sseService.disconnect();
  }, [device, isSuccess]);

  return <SseContext.Provider value={null}>{children}</SseContext.Provider>;
}
