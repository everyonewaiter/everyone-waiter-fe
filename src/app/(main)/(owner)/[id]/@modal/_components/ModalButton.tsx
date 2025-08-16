"use client";

import { useRouter } from "next/navigation";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import cn from "@/lib/utils";
import Spinner from "@/components/common/Spinner";

interface IProps {
  buttonText: string;
  secondaryText?: string;
  colorBlack?: boolean;
  onlyClose?: boolean;
  onlyAction?: boolean;
  className?: string;
  type?: "submit" | "button";
  onAction?: () => void;
  isSubmitted?: boolean;
  onClose?: () => void;
}

export default function ModalButton({
  buttonText,
  secondaryText,
  colorBlack,
  onlyClose,
  onlyAction,
  className,
  onAction,
  onClose,
  isSubmitted,
  type = "button",
}: IProps) {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-row items-center justify-between gap-2 lg:gap-3">
      {!onlyAction && (
        <ResponsiveButton
          type="button"
          color="grey"
          responsiveButtons={{
            lg: {
              buttonSize: "xl",
              className: "!text-lg !font-semibold !h-14 !w-[140px]",
            },
            md: { buttonSize: "sm", className: "!h-9 !w-[90px]" },
            sm: { buttonSize: "sm", className: "!h-10 !w-[100px]" },
          }}
          commonClassName={onlyClose ? "flex-1" : ""}
          onClick={() => (onClose ? onClose() : router.back())}
        >
          {secondaryText || "닫기"}
        </ResponsiveButton>
      )}
      {!onlyClose && (
        <ResponsiveButton
          type={type}
          color={colorBlack ? "black" : "primary"}
          responsiveButtons={{
            lg: {
              buttonSize: "xl",
              className: "!text-lg !font-semibold !h-14",
            },
            md: { buttonSize: "sm", className: "!h-10" },
            sm: { buttonSize: "sm", className: "!h-10" },
          }}
          commonClassName={cn("w-full", className)}
          onClick={onAction}
        >
          {isSubmitted ? <Spinner /> : buttonText}
        </ResponsiveButton>
      )}
    </div>
  );
}
