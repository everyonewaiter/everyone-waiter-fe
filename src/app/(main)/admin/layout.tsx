"use client";

import useAuthStore from "@/stores/useAuthStore";
import { notFound } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

export default function OwnerLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  const { user } = useAuthStore();

  if (user?.permission !== "ADMIN") notFound();

  return (
    <>
      {children}
      {modal}
    </>
  );
}
