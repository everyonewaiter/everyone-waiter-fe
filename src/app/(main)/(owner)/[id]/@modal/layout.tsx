"use client";

import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {children}
    </div>
  );
}
