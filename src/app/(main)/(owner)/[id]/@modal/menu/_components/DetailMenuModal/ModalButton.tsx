"use client";

import { usePathname } from "next/navigation";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import Spinner from "@/components/common/Spinner";

interface IProps {
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  isSubmitted: boolean;
}

export default function ModalButton({
  isEditing,
  onSetEditing,
  isSubmitted,
}: IProps) {
  const pathname = usePathname();

  const buttonText = () => {
    if (getPathnameWithoutStoreId(pathname) === "/menu/create") {
      return "등록하기";
    }
    return isEditing ? "저장하기" : "수정하기";
  };

  return (
    <ResponsiveButton
      type={isEditing ? "submit" : "button"}
      color={isEditing ? "black" : "primary"}
      responsiveButtons={{
        lg: {
          buttonSize: "xl",
          className: "!text-lg !font-semibold !h-14 py-8 w-[480px]",
        },
        md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
        sm: { buttonSize: "sm", className: "!h-10" },
      }}
      onClick={() => (isEditing ? null : onSetEditing(true))}
    >
      {isSubmitted ? <Spinner /> : buttonText()}
    </ResponsiveButton>
  );
}
