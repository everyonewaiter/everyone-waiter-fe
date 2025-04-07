import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./Components";

interface IProps {
  title: string;
  onDelete: () => void;
  onClose: () => void;
  triggerChildren: ReactNode;
}

export default function Alert({
  title,
  onDelete,
  onClose,
  triggerChildren,
}: IProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{triggerChildren}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="w-full">
            닫기
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="w-full">
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
