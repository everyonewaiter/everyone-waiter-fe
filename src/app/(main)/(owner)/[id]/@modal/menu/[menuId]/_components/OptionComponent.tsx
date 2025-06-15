"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import FloatingInfo from "@/components/FloatingInfo";
import { useRef, useState } from "react";
import cn from "@/lib/utils";
import useOutsideClick from "@/hooks/useOutSideClick";
import Popup from "./Popup";

interface IProps {
  title: string;
  onSetShowInfo: (value: boolean) => void;
  showInfo: boolean;
  onSetPopupAction: (value: string) => void;
  popupAction: string;
  isOpen: boolean;
}

export default function OptionComponent({
  title,
  onSetShowInfo,
  showInfo,
  onSetPopupAction,
  popupAction,
  isOpen,
}: IProps) {
  const infoRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  useOutsideClick({
    ref: infoRef,
    handler: () => onSetShowInfo(false),
  });

  return (
    <div
      className={cn(
        "relative flex items-center justify-between",
        isOpen ? "md:pb-3 lg:pb-4" : ""
      )}
    >
      <div className="relative flex items-center gap-[6px] lg:gap-2">
        <h3 className="font-gray-0 text-medium text-sm lg:text-lg">{title}</h3>
        <Icon
          iconKey="information"
          size={24}
          className="text-gray-0 h-5 w-5 lg:h-6 lg:w-6"
          onClick={() => onSetShowInfo(!showInfo)}
        />
        {showInfo && (
          <FloatingInfo ref={infoRef}>
            {`첫번째 옵션 상세가 기본값으로 설정됩니다.\n순서변경 아이콘 클릭 시 옵션명 및 옵션상세의 순서를 변경할 수 있습니다.`}
          </FloatingInfo>
        )}
      </div>

      {isOpen && (
        <>
          {popupAction === "순서 변경" ? (
            <ResponsiveButton
              variant="outline"
              responsiveButtons={{
                lg: {
                  buttonSize: "custom",
                  className:
                    "h-7 rounded-[8px] px-4 !text-s font-regular text-primary",
                },
              }}
              onClick={() => {
                // sort
                onSetPopupAction("");
              }}
            >
              완료
            </ResponsiveButton>
          ) : (
            <button type="button" onClick={() => setShowPopup((prev) => !prev)}>
              <Icon
                iconKey="hamburger"
                className="text-gray-0 h-5 w-5 lg:h-6 lg:w-6"
                size={24}
              />
            </button>
          )}
          {showPopup && (
            <Popup
              onSetPopupAction={(value) => {
                onSetPopupAction(value);
                setShowPopup(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
