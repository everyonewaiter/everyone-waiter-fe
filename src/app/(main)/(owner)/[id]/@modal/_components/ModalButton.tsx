"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useRouter } from "next/navigation";

interface IProps {
  buttonText: string;
  colorBlack?: boolean;
  onlyClose?: boolean;
}

export default function ModalButton({
  buttonText,
  colorBlack,
  onlyClose,
}: IProps) {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-row items-center justify-between gap-2 lg:gap-3">
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
        commonClassName={onlyClose ? "w-full flex flex-1" : ""}
        onClick={() => router.back()}
      >
        닫기
      </ResponsiveButton>
      {!onlyClose && (
        <ResponsiveButton
          type="submit"
          color={colorBlack ? "black" : "primary"}
          responsiveButtons={{
            lg: {
              buttonSize: "xl",
              className: "!text-lg !font-semibold !h-14",
            },
            md: { buttonSize: "sm", className: "!h-10" },
            sm: { buttonSize: "sm", className: "!h-10" },
          }}
          commonClassName="!w-full"
        >
          {buttonText}
        </ResponsiveButton>
      )}
    </div>
  );
}
