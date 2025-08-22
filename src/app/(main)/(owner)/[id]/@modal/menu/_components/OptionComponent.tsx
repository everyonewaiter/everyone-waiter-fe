"use client";

import { useState } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon/Icon";
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

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-[6px] lg:gap-2">
        <h3 className="font-gray-0 text-medium text-sm lg:text-lg">{title}</h3>
        <Icon
          iconKey="information"
          size={24}
          className="text-gray-0 h-5 w-5 lg:h-6 lg:w-6"
        />
      </div>

      {hasOption && isOpen && isEditing && (
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
              onClick={() => onComplete?.()}
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
