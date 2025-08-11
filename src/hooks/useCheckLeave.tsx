"use client";

import { useEffect } from "react";

export default function useLeaveGuard(shouldBlock: boolean) {
  useEffect(() => {
    if (!shouldBlock) return;

    const msg = "작성하던 내용이 모두 사라집니다. 계속하시겠습니까?";

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    window.history.pushState({ guard: true }, "", window.location.href);

    const onPopState = () => {
      // eslint-disable-next-line no-alert
      const ok = window.confirm(msg);
      if (ok) {
        window.removeEventListener("popstate", onPopState);
        window.history.back();
      } else {
        window.history.forward();
      }
    };
    window.addEventListener("popstate", onPopState);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState);
    };
  }, [shouldBlock]);
}
