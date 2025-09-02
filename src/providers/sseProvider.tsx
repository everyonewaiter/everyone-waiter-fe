"use client";

import React, { createContext, useEffect } from "react";
import { deviceQueries } from "@/app/(device-required)/device/_queries/useDeviceInfo";
import { SseService } from "@/utils/sse";

const SseContext = createContext(null);

export function SseProvider({ children }: { children: React.ReactNode }) {
  const { data: device, isSuccess } = deviceQueries.useDeviceDetail();

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
