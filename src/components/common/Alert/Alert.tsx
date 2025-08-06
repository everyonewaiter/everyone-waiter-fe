"use client";

import { PropsWithChildren, useRef, useState } from "react";
import { useModalCloseTriggers } from "@/hooks/useModalCloseTriggers";
import { ButtonColors } from "../Button/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./Components";
import Spinner from "../Spinner";

interface IProps {
  onAction?: () => void;
  onClose: () => void;
  hasNoCancel?: boolean;
  hasNoAction?: boolean;
  buttonText?: string;
  buttonColor?: string;
  layoutClassName?: string;
  noResponsive?: boolean;
  disabled?: boolean;
  customButtonStyle?: string;
  isSubmitted?: boolean;
}

function Alert({
  children,
  onAction,
  onClose,
  hasNoCancel,
  hasNoAction,
  buttonText,
  layoutClassName,
  buttonColor = "primary",
  noResponsive,
  disabled,
  customButtonStyle = "",
  isSubmitted,
}: PropsWithChildren<IProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useModalCloseTriggers<HTMLDivElement>({ ref, onClose });

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleAction = () => {
    onAction?.();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        ref={ref}
        className={layoutClassName}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div>{children}</div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!hasNoCancel && (
            <AlertDialogCancel
              color="grey"
              onClick={handleClose}
              className="flex-[0.6]"
              hasNoAction={hasNoAction}
              noResponsive={noResponsive}
              customButtonStyle={customButtonStyle}
            >
              <span>닫기</span>
            </AlertDialogCancel>
          )}
          {!hasNoAction && (
            <AlertDialogAction
              color={buttonColor as ButtonColors}
              onClick={handleAction}
              noResponsive={noResponsive}
              className="flex-1"
              disabled={disabled}
              customButtonStyle={customButtonStyle}
            >
              {isSubmitted ? <Spinner /> : <span>{buttonText}</span>}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
