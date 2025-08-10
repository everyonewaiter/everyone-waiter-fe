"use client";

import { getClientCookie } from "@/lib/cookies/client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const token = getClientCookie("accessToken");

  useEffect(() => {
    if (token) {
      if (
        document.referrer &&
        document.referrer.startsWith(window.location.origin)
      ) {
        navigate.back();
      } else {
        navigate.replace("/");
      }
    }
  }, [navigate, token]);

  return children;
}
