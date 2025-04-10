import { useOverlayStore } from "@/providers/overlayStoreProvider";
import { ReactNode, useId } from "react";

/**
 * @description
 * Overlay를 관리하는 훅으로, 오버레이를 열고 닫을 수 있음
 * overlayId를 기반으로 특정 오버레이의 상태 관리
 *
 * @returns
 * - `open`: 오버레이를 추가하는 함수.
 * - `close`: 오버레이를 제거하는 함수.
 */
export default function useOverlay() {
  const { addOverlay, deleteOverlay } = useOverlayStore((state) => state);
  const overlayId = useId();

  return {
    open: (OverlayElement: (props: { close: () => void }) => ReactNode) => {
      addOverlay(
        overlayId,
        OverlayElement({ close: () => deleteOverlay(overlayId) })
      );
    },
    close: () => {
      deleteOverlay(overlayId);
    },
  };
}
