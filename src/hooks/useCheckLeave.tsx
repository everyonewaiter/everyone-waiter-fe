"use client";

import { useCallback, useEffect, useState } from "react";
import Alert from "@/components/common/Alert/Alert";
import QueryProviders from "@/app/query-providers";
import LeavePageModal from "@/components/LeavePageModal";
import useOverlay from "./useOverlay";

interface UseLeaveGuardOptions {
  shouldBlock: boolean;
  isSubmitting?: boolean;
  allowNavigation?: boolean;
}

export default function useLeaveGuard(options: UseLeaveGuardOptions): {
  checkCanLeave: (onConfirm: () => void, message?: string) => void;
};

export default function useLeaveGuard(
  shouldBlock: boolean,
  allowNavigation?: boolean
): { checkCanLeave: (onConfirm: () => void, message?: string) => void };

export default function useLeaveGuard(
  optionsOrShouldBlock: UseLeaveGuardOptions | boolean,
  allowNavigationLegacy?: boolean
) {
  const { open, close } = useOverlay();
  const [isLeaving, setIsLeaving] = useState(false);

  // Handle both old and new function signatures for backward compatibility
  const options =
    typeof optionsOrShouldBlock === "object"
      ? optionsOrShouldBlock
      : {
          shouldBlock: optionsOrShouldBlock,
          isSubmitting: false,
          allowNavigation: allowNavigationLegacy,
          submissionMessage: undefined,
        };

  const {
    shouldBlock,
    isSubmitting = false,
    allowNavigation = false,
  } = options;

  // Block navigation during submission even if allowNavigation is true
  const shouldActuallyBlock = shouldBlock && (!allowNavigation || isSubmitting);

  const handleLeave = useCallback(() => {
    if (isLeaving || (allowNavigation && !isSubmitting)) return;

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
  }, [isLeaving, open, close, allowNavigation, isSubmitting]);

  const checkCanLeave = useCallback(
    (onConfirm: () => void, message?: string) => {
      if (!shouldBlock || (allowNavigation && !isSubmitting)) {
        onConfirm();
        return;
      }

      open(() => (
        <QueryProviders>
          <Alert
            onClose={close}
            primaryButton={{
              text: "이동",
              color: "black",
              onClick: () => {
                close();
                onConfirm();
              },
              customButtonStyle: "w-full !button-lg",
            }}
            secondaryButton={{
              text: "취소",
              onClick: () => {
                close();
              },
              customButtonStyle: "w-full !button-lg",
            }}
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
    },
    [shouldBlock, allowNavigation, isSubmitting, open, close]
  );

  useEffect(() => {
    if (!shouldActuallyBlock) return () => {};

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    window.history.pushState({ guard: true }, "", window.location.href);

    const onPopState = () => {
      if (!isLeaving && (!allowNavigation || isSubmitting)) {
        handleLeave();
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState);
    };
  }, [
    shouldActuallyBlock,
    isLeaving,
    handleLeave,
    allowNavigation,
    isSubmitting,
  ]);

  return { checkCanLeave };
}
