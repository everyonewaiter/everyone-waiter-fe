"use client";

import { PropsWithChildren, useState, forwardRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./Components";

interface IProps {
  onAction?: () => void;
  onClose: () => void;
  hasNoCancel?: boolean;
  hasNoAction?: boolean;
  buttonText?: string;
  buttonColor?: string;
  layoutClassName?: string;
}

const Alert = forwardRef<HTMLDivElement, PropsWithChildren<IProps>>(
  (
    {
      children,
      onAction,
      onClose,
      hasNoCancel,
      hasNoAction,
      buttonText,
      layoutClassName,
      buttonColor = "primary",
    },
    ref
  ) => {
    const [open, setOpen] = useState(true);

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
                onClick={handleClose}
                className="flex-[0.6]"
                hasNoAction={hasNoAction}
              >
                <span>닫기</span>
              </AlertDialogCancel>
            )}
            {!hasNoAction && (
              <AlertDialogAction
                color={buttonColor}
                onClick={handleAction}
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
);

Alert.displayName = "Alert";

export default Alert;
