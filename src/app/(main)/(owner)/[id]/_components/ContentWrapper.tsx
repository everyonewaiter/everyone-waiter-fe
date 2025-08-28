import { HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default function ContentWrapper({ children }: PropsWithChildren) {
  return (
    <HydrationBoundary>
      <div className="scrollbar-hide flex-1">{children}</div>
    </HydrationBoundary>
  );
}
