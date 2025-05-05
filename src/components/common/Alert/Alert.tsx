// Alert.tsx
import { useState } from "react";
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
  title: string;
  onAction: () => void;
  onClose: () => void;
  hasNoCancel?: boolean;
  buttonText: string;
}

export default function Alert({
  title,
  onAction,
  onClose,
  hasNoCancel,
  buttonText,
}: IProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleAction = () => {
    setOpen(false);
    onAction();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!hasNoCancel && (
            <AlertDialogCancel onClick={handleClose} className="w-full">
              닫기
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleAction} className="w-full">
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
