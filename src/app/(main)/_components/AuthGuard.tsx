"use client";

import { renewToken } from "@/lib/api/auth.api";
import { getToken } from "@/lib/cookies";
import { PropsWithChildren, useEffect } from "react";

export default function AuthGuard({ children }: PropsWithChildren) {
  useEffect(() => {
    (async () => {
      const token = await getToken("accessToken");
      if (!token) {
        try {
          const refreshToken = await getToken("refreshToken");
          if (refreshToken) await renewToken({ refreshToken });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    })();
  }, []);

  return children;
}
