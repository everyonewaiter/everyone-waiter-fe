"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useState } from "react";
import FormSection from "./_components/FormSection";
import OptionTemplate from "./_components/OptionTemplate";
import Header from "./_components/Header";

export default function MenuDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState({
    required: false,
    optional: false,
  });
  const [currentOption, setCurrentOption] = useState("required");

  return (
    <div className="md:overflow-none scrollbar-hide flex h-full flex-col overflow-auto md:justify-between">
      {/* 헤더 */}
      <Header />
      {/* 콘텐츠 랩 */}
      <div className=":flex-1 mt-0 h-[580px] md:flex md:h-full md:flex-col">
        {/* 콘텐츠 */}
        <div className="md:overflow-y-none flex h-full flex-1 flex-col md:mt-5 lg:mt-8">
          <div className="mt-5 flex h-full flex-col gap-4 md:mt-0 md:flex-row md:gap-[12px] lg:gap-[18px]">
            <section className="flex basis-[28.44%] flex-col gap-1 lg:gap-2">
              <div className="h-[373.33px] overflow-hidden rounded-[12px] bg-red-50 md:h-[280px] lg:h-[478px] lg:rounded-[24px]" />
              <button
                type="button"
                className="center lg:text-s text-gray-0 md:font-regular h-8 rounded-[8px] border border-gray-300 text-xs lg:h-9 lg:font-medium"
              >
                이미지 등록
              </button>
            </section>
            <FormSection isEditing={isEditing} />
            <section className="flex basis-[37.5%] flex-col gap-3 md:mt-0 lg:gap-[18px]">
              <OptionTemplate
                title="필수 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, required: value })
                }
                showInfo={showInfo.required}
                onClick={() => setCurrentOption("required")}
                isOpen={currentOption === "required"}
                className="h-full"
              />
              <OptionTemplate
                title="선택 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, optional: value })
                }
                showInfo={showInfo.optional}
                onClick={() => setCurrentOption("optional")}
                isOpen={currentOption === "optional"}
                className="lg:h-[75px]"
              />
            </section>
            {/* 바텀 버튼 */}
            <div className="flex w-full justify-center md:mt-5 md:hidden lg:mt-8">
              <ResponsiveButton
                type={isEditing ? "submit" : "button"}
                color={isEditing ? "black" : "primary"}
                responsiveButtons={{
                  lg: {
                    buttonSize: "xl",
                    className: "!text-lg !font-semibold !h-14 py-8",
                  },
                  md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
                  sm: { buttonSize: "sm", className: "!h-10 w-[480px]" },
                }}
                commonClassName=""
                onClick={() => (isEditing ? null : setIsEditing(true))}
              >
                {isEditing ? "저장하기" : "수정하기"}
              </ResponsiveButton>
            </div>
          </div>
        </div>
        {/* 바텀 버튼 */}
        <div className="hidden w-full justify-center md:mt-5 md:flex lg:mt-8">
          <ResponsiveButton
            type={isEditing ? "submit" : "button"}
            color={isEditing ? "black" : "primary"}
            responsiveButtons={{
              lg: {
                buttonSize: "xl",
                className: "!text-lg !font-semibold !h-14 py-8",
              },
              md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
              sm: { buttonSize: "sm", className: "!h-10 w-[480px]" },
            }}
            commonClassName=""
            onClick={() => (isEditing ? null : setIsEditing(true))}
          >
            {isEditing ? "저장하기" : "수정하기"}
          </ResponsiveButton>
        </div>
      </div>
    </div>
  );
}
