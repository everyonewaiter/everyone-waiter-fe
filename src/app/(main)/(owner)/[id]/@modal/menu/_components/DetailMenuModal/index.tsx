"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useStoreContext } from "@/providers/storeProvider";
import ImageSection from "./ImageSection";
import ModalButton from "./ModalButton";
import useMenuModalForm from "../../_hooks/useMenuModalForm";
import useHandleMenuSubmit from "../../_hooks/useHandleMenuSubmit";
import Header from "../Header";
import FormSection from "../FormSection";
import OptionTemplate from "../OptionTemplate";

enum OptionType {
  REQUIRED = "required",
  OPTIONAL = "optional",
}

interface IProps {
  isEditing: boolean;
  onSetEditing?: (value: boolean) => void;
  type: "create" | "update";
  data?: MenuDetail;
  isPage?: boolean;
}

export default function DetailMenuModal({
  isEditing,
  onSetEditing,
  type,
  data,
  isPage,
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
    onSetIsSubmitted: setIsSubmitted,
    propsData: {
      menuId: data?.menuId ?? "",
      categoryId: data?.categoryId ?? "",
      image: data?.image ?? "",
    },
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
          <Header onNavigate={() => navigate.back()} isPage={isPage!} />
        </div>
        {/* 콘텐츠 */}

        <div className="mt-5 overflow-hidden md:mt-0">
          <div className="scrollbar-hide flex h-full w-full flex-col md:flex-row md:gap-3 md:overflow-y-auto lg:gap-[18px]">
            {/* 이미지 표시 및 등록 */}
            <ImageSection isEditing={isEditing} />

            {/* 메뉴 상세 정보 등록 / 수정 */}
            <FormSection isEditing={isEditing} storeId={storeId} type={type} />

            {/* 옵션 정보 등록 / 수정 */}
            <section className="mt-4 flex h-full basis-[31.3%] flex-col gap-3 md:mt-0 lg:gap-[18px]">
              <OptionTemplate
                title="필수 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, required: value })
                }
                showInfo={showInfo.required}
                onClick={() => {
                  if (currentOption === OptionType.REQUIRED) {
                    setCurrentOption(OptionType.OPTIONAL);
                  } else {
                    setCurrentOption(OptionType.REQUIRED);
                  }
                }}
                isOpen={currentOption === "required"}
                type="requiredOptions"
                isEditing={isEditing}
                data={form.watch("requiredOptions")}
                isUpdate={type === "update"}
              />
              <OptionTemplate
                title="선택 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, optional: value })
                }
                showInfo={showInfo.optional}
                onClick={() => {
                  if (currentOption === OptionType.OPTIONAL) {
                    setCurrentOption(OptionType.REQUIRED);
                  } else {
                    setCurrentOption(OptionType.OPTIONAL);
                  }
                }}
                isOpen={currentOption === "optional"}
                type="optionalOptions"
                isEditing={isEditing}
                data={form.watch("optionalOptions")}
                isUpdate={type === "update"}
              />
            </section>
            <div className="mt-5 mb-8 flex w-full justify-center md:hidden">
              <ModalButton
                color="primary"
                isEditing={isEditing}
                onSetEditing={onSetEditing!}
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
            onSetEditing={onSetEditing!}
            isSubmitted={isSubmitted}
            {...data}
          />
        </div>
      </form>
    </FormProvider>
  );
}
