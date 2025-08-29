"use client";

import { getClientCookie } from "@/lib/cookies/client";
import { useRouter, usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const pathname = usePathname();
  const token = getClientCookie("accessToken");

  useEffect(() => {
    if (token && (pathname === "/login" || pathname === "/signup")) {
      if (
        document.referrer &&
        document.referrer.startsWith(window.location.origin)
      ) {
        navigate.back();
      } else {
        navigate.replace("/");
      }
    }
  }, [navigate, token, pathname]);

  return children;
}
