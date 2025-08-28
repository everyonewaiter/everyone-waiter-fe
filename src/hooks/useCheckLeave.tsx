"use client";

import { useCallback, useEffect, useState } from "react";
import Alert from "@/components/common/Alert/Alert";
import QueryProviders from "@/app/query-providers";
import LeavePageModal from "@/components/LeavePageModal";
import useOverlay from "./useOverlay";

export default function useLeaveGuard(
  shouldBlock: boolean,
  allowNavigation: boolean = false
) {
  const { open, close } = useOverlay();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeave = useCallback(() => {
    if (isLeaving || allowNavigation) return;

    open(() => (
      <QueryProviders>
        <LeavePageModal
          close={close}
          onAction={() => {
            setIsLeaving(true);
            close();
            window.removeEventListener("popstate", handleLeave);
            window.history.back();
          }}
          onCancel={() => {
            close();
            window.history.forward();
          }}
        />
      </QueryProviders>
    ));
  }, [isLeaving, open, close, allowNavigation]);

  const checkCanLeave = (onConfirm: () => void, message?: string) => {
    if (!shouldBlock || allowNavigation) {
      onConfirm();
      return;
    }

    open(() => (
      <QueryProviders>
        <Alert
          onClose={close}
          buttonText="이동"
          cancelText="취소"
          buttonColor="black"
          onAction={() => {
            close();
            onConfirm();
          }}
          onCancel={() => {
            close();
          }}
          customButtonStyle="w-full !button-lg"
        >
          <div className="flex flex-col gap-2 py-3">
            <span className="text-primary text-xl font-semibold">
              현재 저장되지 않은 주문 내역이 있습니다.
            </span>
            <span className="text-gray-0 text-lg font-medium">
              {message || "저장하지 않고 이동하시겠습니까?"}
            </span>
          </div>
        </Alert>
      </QueryProviders>
    ));
  };

  useEffect(() => {
    if (!shouldBlock || allowNavigation) return () => {};

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    window.history.pushState({ guard: true }, "", window.location.href);

    const onPopState = () => {
      if (!isLeaving && !allowNavigation) {
        handleLeave();
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState);
    };
  }, [shouldBlock, isLeaving, handleLeave, allowNavigation]);

  return { checkCanLeave };
}
