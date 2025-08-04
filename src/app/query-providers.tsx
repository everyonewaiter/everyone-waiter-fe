"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/ga";
import getQueryClient from "./get-query-client";

export default function QueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      if (typeof (window as any).gtag === "function") {
        pageview(pathname);
      }
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
