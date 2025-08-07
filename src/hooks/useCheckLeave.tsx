"use client";

/* eslint-disable */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useCheckLeave(isActive: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!isActive) {
      // 항상 cleanup 함수를 반환해서 ESLint 경고 방지
      return () => {};
    }

    const warningMessage = "작성하던 내용이 모두 사라집니다. 계속하시겠습니까?";

    // 1. 새로고침 / 창 닫기 방지
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = warningMessage;
    };

    // 2. 브라우저 뒤로가기 방지
    const handlePopState = () => {
      const confirmLeave = window.confirm(warningMessage);
      if (!confirmLeave) {
        history.pushState(null, "", window.location.href);
      }
    };

    // 3. router.push 인터셉트
    const originalPush = router.push;
    const guardedPush = (href: string) => {
      const confirmLeave = window.confirm(warningMessage);
      if (confirmLeave) {
        originalPush(href);
      }
    };

    // 이벤트 등록
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    history.pushState(null, "", window.location.href);

    // router.push를 가드로 교체
    (router as any).push = guardedPush;

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      (router as any).push = originalPush;
    };
  }, [isActive, router]);
}
