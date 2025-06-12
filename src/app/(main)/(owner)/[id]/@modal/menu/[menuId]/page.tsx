"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import { useState } from "react";
import FormSection from "./_components/FormSection";
import OptionTemplate from "./_components/OptionTemplate";

export default function MenuDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState({
    required: false,
    optional: false,
  });
  const [currentOption, setCurrentOption] = useState("required");

  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-0 text-2xl font-semibold">매장 정보</h1>
          <p className="font-regular text-sm text-gray-300">
            메뉴의 세부 정보를 입력하고 옵션을 설정해 주세요.
          </p>
        </div>
        <Icon iconKey="close" size={32} className="text-black" />
      </div>
      <div className="mt-8 mb-6 flex gap-[18px]">
        <section className="flex basis-[28.44%] flex-col gap-2">
          <div className="h-[478px] overflow-hidden rounded-[24px]" />
          <button
            type="button"
            className="center text-s text-gray-0 h-9 rounded-[8px] border border-gray-300 font-medium"
          >
            이미지 등록
          </button>
        </section>
        <FormSection isEditing={isEditing} />
        <section className="flex basis-[37.5%] flex-col gap-[18px]">
          <OptionTemplate
            title="필수 옵션"
            onSetShowInfo={(value) =>
              setShowInfo({ ...showInfo, required: value })
            }
            showInfo={showInfo.required}
            onClick={() => setCurrentOption("required")}
            isOpen={currentOption === "required"}
          />
          <OptionTemplate
            title="선택 옵션"
            onSetShowInfo={(value) =>
              setShowInfo({ ...showInfo, optional: value })
            }
            showInfo={showInfo.optional}
            onClick={() => setCurrentOption("optional")}
            isOpen={currentOption === "optional"}
          />
        </section>
      </div>
      <div className="mt-10 flex w-full justify-center">
        <ResponsiveButton
          type={isEditing ? "submit" : "button"}
          color={isEditing ? "black" : "primary"}
          responsiveButtons={{
            lg: {
              buttonSize: "xl",
              className: "!text-lg !font-semibold !h-14",
            },
            md: { buttonSize: "sm", className: "!h-10" },
            sm: { buttonSize: "sm", className: "!h-10" },
          }}
          commonClassName="w-[480px]"
          onClick={() => (isEditing ? null : setIsEditing(true))}
        >
          {isEditing ? "저장하기" : "수정하기"}
        </ResponsiveButton>
      </div>
    </div>
  );
}
