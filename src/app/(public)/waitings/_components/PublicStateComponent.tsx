"use client";

import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon/Icon";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  gifName: string;
  title: string;
  subtitle?: string;
  buttonType: "agree" | "go-back" | "see-menu" | "retry";
  storeId: string;
}

export default function PublicStateComponent({
  gifName,
  title,
  subtitle,
  buttonType,
  storeId,
}: IProps) {
  const navigate = useRouter();

  const renderButton = () => {
    switch (buttonType) {
      case "agree":
        return (
          <Button
            color="black"
            className="button-lg w-full"
            onClick={() => {
              window.location.href = "kakaotalk://inappbrowser/close";
            }}
          >
            확인
          </Button>
        );
      case "go-back":
        return (
          <Button
            color="grey"
            className="button-lg w-full"
            onClick={() => {
              window.location.href = "kakaotalk://inappbrowser/close";
            }}
          >
            돌아가기
          </Button>
        );
      case "see-menu":
        return (
          <>
            <Button
              color="grey"
              className="button-lg w-[100px]"
              onClick={() => {
                window.location.href = "kakaotalk://inappbrowser/close";
              }}
            >
              돌아가기
            </Button>
            <Button
              color="black"
              className="button-lg w-full"
              onClick={() => navigate.push(`/menus/preview?storeId=${storeId}`)}
            >
              메뉴 보러가기
            </Button>
          </>
        );
      default:
        return "";
    }
  };

  return (
    <div className="center h-dvh w-dvw">
      <div className="center flex flex-col gap-8">
        <Image src={`/gif/${gifName}.gif`} alt="gif" width={140} height={149} />
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-0 text-center text-2xl font-semibold whitespace-pre-line">
            {title}
          </h1>
          {subtitle && (
            <span className="font-regular text-center text-base whitespace-pre-line text-gray-300">
              {subtitle}
            </span>
          )}
        </div>
        {buttonType === "retry" && (
          <Button
            color="grey"
            className="button-md !text-gray-0 gap-2"
            onClick={() => window.location.reload()}
          >
            <Icon iconKey="rotate" size={20} className="text-gray-0" />
            <span className="text-gray-0 text-sm font-medium">다시 시도</span>
          </Button>
        )}
      </div>
      <div className="absolute bottom-5 flex w-full justify-center gap-2 px-5">
        {renderButton()}
      </div>
    </div>
  );
}
