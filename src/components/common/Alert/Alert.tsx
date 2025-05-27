// Alert.tsx
import { PropsWithChildren, useState } from "react";
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
  onAction: () => void;
  onClose: () => void;
  hasNoCancel?: boolean;
  hasNoAction?: boolean;
  buttonText: string;
}

export default function Alert({
  children,
  onAction,
  onClose,
  hasNoCancel,
  hasNoAction,
  buttonText,
}: PropsWithChildren<IProps>) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleAction = () => {
    onAction();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
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
            <AlertDialogAction onClick={handleAction} className="flex-1">
              <span>{buttonText}</span>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
