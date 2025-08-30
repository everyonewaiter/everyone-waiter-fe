"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  onHeaderClick?: () => void;
}

export default function OptionHeader({
  title,
  onSetPopupAction,
  popupAction,
  isOpen,
  isEditing,
  hasOption,
  onComplete,
  onHeaderClick,
}: IProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showInfo && infoButtonRef.current) {
      const rect = infoButtonRef.current.getBoundingClientRect();
      const size = 96;
      const iconRect = infoButtonRef.current
        .querySelector("svg")
        ?.getBoundingClientRect();

      setInfoPosition({
        top: rect.top - size,
        left:
          (iconRect?.left || rect.left) +
          (iconRect?.width || 24) / 2 -
          size / 2,
      });
    }
  }, [showInfo]);

  return (
    <div
      className="relative"
      onClick={() => !isOpen && onHeaderClick?.()}
      style={{ cursor: !isOpen ? "pointer" : "default" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isOpen) {
          onHeaderClick?.();
        }
      }}
    >
      {showInfo && (
        <>
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
        <div className="flex items-center gap-[6px] lg:gap-2">
          <h3 className="font-gray-0 text-medium text-sm lg:text-lg">
            {title}
          </h3>
          <button
            ref={infoButtonRef}
            type="button"
            onClick={() => isOpen && setShowInfo(true)}
          >
            <Icon
              iconKey="information"
              size={24}
              className="text-gray-0 h-5 w-5 lg:h-6 lg:w-6"
            />
          </button>
        </div>

        {!hasOption && isOpen && (
          <button type="button" className="flex items-center gap-1">
            <ChevronUp className="h-4 w-4 text-gray-200" strokeWidth={2} />
          </button>
        )}

        {!hasOption && !isOpen && (
          <button type="button" className="flex items-center gap-1">
            <ChevronDown className="h-4 w-4 text-gray-200" strokeWidth={2} />
          </button>
        )}

        {hasOption && isOpen && isEditing && (
          <>
            {popupAction ? (
              <ResponsiveButton
                variant="outline"
                responsiveButtons={{
                  lg: {
                    buttonSize: "custom",
                    className:
                      "h-7 rounded-lg px-4 !text-s font-regular text-primary",
                  },
                }}
                onClick={onComplete}
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
