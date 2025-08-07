import AuthGuard from "@/app/(main)/_components/AuthGuard";
import { HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default function ContentWrapper({ children }: PropsWithChildren) {
  return (
    <HydrationBoundary>
      <AuthGuard>{children}</AuthGuard>
    </HydrationBoundary>
  );
}
