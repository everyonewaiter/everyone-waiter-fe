"use client";

import { usePathname } from "next/navigation";
import ResponsiveButton, {
  ButtonSize,
  ScreenSize,
} from "@/components/common/Button/ResponsiveButton";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import Spinner from "@/components/common/Spinner";
import { ButtonColors } from "@/components/common/Button/Button";

interface IProps {
  color?: "primary" | "black";
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  isSubmitted: boolean;
}

export default function ModalButton({
  isEditing,
  onSetEditing,
  color,
  isSubmitted,
}: IProps) {
  const pathname = usePathname();

  const buttonText = () => {
    if (getPathnameWithoutStoreId(pathname) === "/menu/create") {
      return "등록하기";
    }
    return isEditing ? "저장하기" : "수정하기";
  };

  const buttonColor = () => {
    if (color) return color;
    if (isEditing) {
      return "black";
    }
    return "primary";
  };

  const buttonOptions: {
    color: ButtonColors;
    responsiveButtons: Record<
      ScreenSize,
      {
        buttonSize: ButtonSize;
        className?: string;
        color?: string;
        variant?: string;
      }
    >;
  } = {
    color: buttonColor(),
    responsiveButtons: {
      lg: {
        buttonSize: "xl",
        className: "!text-lg !font-semibold !h-14 py-8 w-[480px]",
      },
      md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
      sm: { buttonSize: "sm", className: "!h-10 w-full" },
    },
  };

  return isEditing ? (
    <ResponsiveButton type="submit" {...buttonOptions}>
      {isSubmitted ? <Spinner /> : buttonText()}
    </ResponsiveButton>
  ) : (
    <ResponsiveButton
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onSetEditing(true);
      }}
      {...buttonOptions}
    >
      {buttonText()}
    </ResponsiveButton>
  );
}
