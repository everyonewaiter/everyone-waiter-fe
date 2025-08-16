"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useStoreContext } from "@/providers/storeProvider";
import ImageSection from "./ImageSection";
import ModalButton from "./ModalButton";
import useMenuModalForm from "../../_hooks/useMenuModalForm";
import useHandleMenuSubmit from "../../_hooks/useHandleMenuSubmit";

const FormSection = dynamic(() => import("../FormSection"), { ssr: false });
const OptionTemplate = dynamic(() => import("../OptionTemplate"), {
  ssr: false,
});
const Header = dynamic(() => import("../Header"), { ssr: false });

enum OptionType {
  REQUIRED = "required",
  OPTIONAL = "optional",
}

interface IProps {
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  type: "create" | "update";
  data?: MenuDetail;
}

export default function DetailMenuModal({
  isEditing,
  onSetEditing,
  type,
  data,
}: IProps) {
  const navigate = useRouter();

  const { storeId } = useStoreContext();
  const { form } = useMenuModalForm(data);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInfo, setShowInfo] = useState<Record<OptionType, boolean>>({
    [OptionType.REQUIRED]: false,
    [OptionType.OPTIONAL]: false,
  });
  const [currentOption, setCurrentOption] = useState<OptionType>(
    OptionType.REQUIRED
  );

  const { handleSubmit } = useHandleMenuSubmit({
    storeId,
    type,
    originData: {
      menuId: data?.menuId,
      image: data?.image,
    },
    onSetIsSubmitted: setIsSubmitted,
  });

  const handleAfterAction = () => ({
    onSuccess: () => navigate.back(),
    onError: () => setIsSubmitted(false),
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((formData) =>
          handleSubmit(formData, handleAfterAction)
        )}
        className="scrollbar-hide flex h-full w-full flex-col md:gap-5 lg:gap-8"
      >
        {/* 헤더 */}
        <div className="shrink-0">
          <Header onNavigate={() => navigate.back()} />
        </div>
        {/* 콘텐츠 */}

        <div className="overflow-hidden">
          <div className="scrollbar-hide flex h-full w-full flex-col overflow-y-auto md:flex-row md:gap-3 lg:gap-[18px]">
            {/* 이미지 표시 및 등록 */}
            <ImageSection isEditing={isEditing} />

            {/* 메뉴 상세 정보 등록 / 수정 */}
            <FormSection isEditing={isEditing} storeId={storeId} type={type} />

            {/* 옵션 정보 등록 / 수정 */}
            <section className="flex h-full basis-[31.3%] flex-col gap-3 lg:gap-[18px]">
              <OptionTemplate
                title="필수 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, required: value })
                }
                showInfo={showInfo.required}
                onClick={() => setCurrentOption(OptionType.REQUIRED)}
                isOpen={currentOption === "required"}
                type="requiredOptions"
                isEditing={isEditing}
              />
              <OptionTemplate
                title="선택 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, optional: value })
                }
                showInfo={showInfo.optional}
                onClick={() => setCurrentOption(OptionType.OPTIONAL)}
                isOpen={currentOption === "optional"}
                type="optionalOptions"
                isEditing={isEditing}
              />
            </section>
            <div className="flex w-full justify-center md:hidden">
              <ModalButton
                isEditing={isEditing}
                onSetEditing={onSetEditing}
                isSubmitted={isSubmitted}
                {...data}
              />
            </div>
          </div>
        </div>

        {/* 바텀 버튼 */}
        <div className="hidden w-full justify-center md:flex">
          <ModalButton
            isEditing={isEditing}
            onSetEditing={onSetEditing}
            isSubmitted={isSubmitted}
            {...data}
          />
        </div>
      </form>
    </FormProvider>
  );
}
