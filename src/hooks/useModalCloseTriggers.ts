import { RefObject } from "react";
import useOutsideClick from "./useOutSideClick";
import useEscapeKey from "./useEscapeKey";

interface Props<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onClose: () => void;
}

/**
 * @description
 * - 모달 또는 알럿을 사용할 때 Escape Key 또는 외부 클릭으로 닫게 해주는 훅
 * - 기준 useEscapeKey와 useOutsideClick을 혼합함.
 *
 *  @param ref - 외부 클릭을 감지할 대상 요소의 `RefObject`.
 *  @param handler - 외부 클릭이 발생시 특정 동작을 실행하는 함수
 *
 */
export const useModalCloseTriggers = <T extends HTMLElement>({
  ref,
  onClose,
}: Props<T>) => {
  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });
};

export const a = {};
