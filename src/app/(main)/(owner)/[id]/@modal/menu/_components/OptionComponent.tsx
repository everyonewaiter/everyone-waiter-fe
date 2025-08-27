"use client";

import { useEffect, useRef, useState } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon/Icon";
import FloatingInfo from "@/components/FloatingInfo";
import Popup from "./Popup";

interface IProps {
  title: string;
  onSetPopupAction: (value: string) => void;
  popupAction: string;
  isOpen: boolean;
  isEditing: boolean;
  hasOption: boolean;
  onComplete?: () => void;
}

export default function OptionComponent({
  title,
  onSetPopupAction,
  popupAction,
  isOpen,
  isEditing,
  hasOption,
  onComplete,
}: IProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showInfo && infoButtonRef.current) {
      const rect = infoButtonRef.current.getBoundingClientRect();
      const iconRect = infoButtonRef.current
        .querySelector("svg")
        ?.getBoundingClientRect();

      setInfoPosition({
        // FloatingInfo 높이(약 80px) + 삼각형 높이(34px) + 여백을 고려하여 아이콘 위에 배치
        top: rect.top - 96,
        // 아이콘 중앙에서 삼각형 중앙(48.5px)을 뺀 위치
        left: (iconRect?.left || rect.left) + (iconRect?.width || 24) / 2 - 48,
      });
    }
  }, [showInfo]);

  return (
    <div className="relative">
      {showInfo && (
        <>
          {/* 배경 클릭으로 닫기 */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Close information tooltip"
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowInfo(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowInfo(false);
              }
            }}
          />
          <FloatingInfo
            style={{
              position: "fixed",
              top: infoPosition.top,
              left: infoPosition.left,
              zIndex: 9999,
            }}
          />
        </>
      )}
      <div className="relative flex items-center justify-between">
        <button
          ref={infoButtonRef}
          type="button"
          className="flex items-center gap-[6px] lg:gap-2"
          onClick={() => setShowInfo(true)}
        >
          <h3 className="font-gray-0 text-medium text-sm lg:text-lg">
            {title}
          </h3>
          <Icon
            iconKey="information"
            size={24}
            className="text-gray-0 h-5 w-5 lg:h-6 lg:w-6"
          />
        </button>

        {hasOption && isOpen && isEditing && (
          <>
            {popupAction === "순서 변경" ? (
              <ResponsiveButton
                variant="outline"
                responsiveButtons={{
                  lg: {
                    buttonSize: "custom",
                    className:
                      "h-7 rounded-lg px-4 !text-s font-regular text-primary",
                  },
                }}
                onClick={() => onComplete?.()}
              >
                완료
              </ResponsiveButton>
            ) : (
              <button
                type="button"
                onClick={() => setShowPopup((prev) => !prev)}
              >
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
    </div>
  );
}
