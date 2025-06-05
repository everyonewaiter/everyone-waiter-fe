"use client";

import { PropsWithChildren, useState, useRef } from "react";
import { useModalCloseTriggers } from "@/hooks/useModalCloseTriggers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./Components";
import { ButtonColors } from "../Button/Button";

interface IProps {
  onAction?: () => void;
  onClose: () => void;
  hasNoCancel?: boolean;
  hasNoAction?: boolean;
  buttonText?: string;
  buttonColor?: string;
  layoutClassName?: string;
  noResponsive?: boolean;
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
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent ref={ref} className={layoutClassName}>
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
            >
              <span>{buttonText}</span>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
