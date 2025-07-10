"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const { isLoggedIn } = useAuthStore();

  if (process.env.NODE_ENV === "production" && isLoggedIn) {
    navigate.back();
  }

  return children;
}
