"use client";

import { TypeChildren } from "@/types";
import MainLayout from "./MainLayout";

export default function ClientLayout({ children }: TypeChildren) {
  return <MainLayout>{children}</MainLayout>;
}
