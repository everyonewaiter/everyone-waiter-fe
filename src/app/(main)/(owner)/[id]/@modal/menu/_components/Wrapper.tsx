"use client";

import { PropsWithChildren } from "react";
import RefLayout from "../../_components/RefLayout";

export default function ClientRefWrapper({ children }: PropsWithChildren) {
  return (
    <RefLayout className="md:h-[calc(100%-48px)] md:w-[calc(100%-48px)] lg:max-h-[832px] lg:max-w-[1344px]">
      {children}
    </RefLayout>
  );
}
