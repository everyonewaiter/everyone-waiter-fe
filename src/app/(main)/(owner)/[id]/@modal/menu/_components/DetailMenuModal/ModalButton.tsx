"use client";

import { usePathname, useRouter } from "next/navigation";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import { useStoreContext } from "@/providers/storeProvider";
import Spinner from "@/components/common/Spinner";
import useHandleMenuSubmit from "../../_hooks/useHandleMenuSubmit";

interface IProps {
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  onSetIsSubmitted: (value: boolean) => void;
  isSubmitted: boolean;
  type: "create" | "update";
  image?: string;
  menuId?: string;
}

export default function ModalButton({
  isEditing,
  onSetEditing,
  onSetIsSubmitted,
  isSubmitted,
  type,
  ...data
}: IProps) {
  const navigate = useRouter();
  const pathname = usePathname();

  const { storeId } = useStoreContext();

  const { handleSubmit } = useHandleMenuSubmit({
    storeId,
    type,
    data,
    onSetIsSubmitted,
  });

  const handleAfterAction = () => ({
    onSuccess: () => navigate.back(),
    onError: () => onSetIsSubmitted(false),
  });

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
      onClick={() =>
        isEditing ? handleSubmit(handleAfterAction) : onSetEditing(true)
      }
    >
      {isSubmitted ? <Spinner /> : buttonText()}
    </ResponsiveButton>
  );
}
