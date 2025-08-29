"use client";

import { usePathname } from "next/navigation";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import Spinner from "@/components/common/Spinner";

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

  return (
    <ResponsiveButton
      type={isEditing ? "submit" : "button"}
      color={buttonColor()}
      responsiveButtons={{
        lg: {
          buttonSize: "xl",
          className: "!text-lg !font-semibold !h-14 py-8 w-[480px]",
        },
        md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
        sm: { buttonSize: "sm", className: "!h-10 w-full" },
      }}
      onClick={(e) => {
        if (!isEditing) {
          e.preventDefault();
          onSetEditing(true);
        }
      }}
    >
      {isSubmitted ? <Spinner /> : buttonText()}
    </ResponsiveButton>
  );
}
