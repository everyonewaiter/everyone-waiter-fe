import { RefObject } from "react";
import useOutsideClick from "./useOutSideClick";
import useEscapeKey from "./useEscapeKey";

interface Props<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onClose: () => void;
}

export const useModalCloseTriggers = <T extends HTMLElement>({
  ref,
  onClose,
}: Props<T>) => {
  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });
};

export const a = {};
