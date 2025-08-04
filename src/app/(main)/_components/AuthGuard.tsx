"use client";

import { renewToken } from "@/lib/api/auth.api";
import { getToken } from "@/lib/cookies";
import useAuthStore from "@/stores/useAuthStore";
import { PropsWithChildren, useEffect } from "react";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    (async () => {
      const token = await getToken("accessToken");
      if (!token) {
        try {
          const refreshToken = await getToken("refreshToken");
          if (refreshToken) {
            await renewToken({ refreshToken });
          } else {
            setIsLoggedIn(false);
          }
        } catch (e) {
          setIsLoggedIn(false);
        }
      }
    })();
  }, [setIsLoggedIn]);

  return <div className="scrollbar-hide flex-1">{children}</div>;
}
