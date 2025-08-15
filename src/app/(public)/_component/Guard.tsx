"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Guard({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("accessToken");
  const storeId = searchParams.get("storeId");

  useEffect(() => {
    if (!token || !storeId) {
      navigate.replace("/not-found");
    }
  }, [token, storeId, navigate]);

  return children;
}
