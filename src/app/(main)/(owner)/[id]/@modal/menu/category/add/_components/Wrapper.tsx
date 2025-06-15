"use client";

import { PropsWithChildren } from "react";
import RefLayout from "../../../../_components/RefLayout";

export default function ClientRefWrapper({ children }: PropsWithChildren) {
  return (
    <RefLayout>
      <div className="h-full">{children}</div>
    </RefLayout>
  );
}
