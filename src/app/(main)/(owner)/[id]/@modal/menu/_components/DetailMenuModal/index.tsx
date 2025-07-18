"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useStoreContext } from "@/providers/storeProvider";
import { MenuFormType } from "../../_types/menuForm.type";
import ImageSection from "./ImageSection";
import ModalButton from "./ModalButton";

const FormSection = dynamic(() => import("../FormSection"), { ssr: false });
const OptionTemplate = dynamic(() => import("../OptionTemplate"), {
  ssr: false,
});
const Header = dynamic(() => import("../Header"), { ssr: false });

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
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { storeId } = useStoreContext();

  const form = useForm<
    Omit<MenuFormType, "image"> & { image: File | string | null }
  >({
    mode: "onChange",
    defaultValues: {
      image: null,
      category: categoryId as string,
      name: "",
      description: "",
      price: 0,
      spicy: 1,
      state: "DEFAULT",
      label: "DEFAULT",
      printEnabled: false,
      requiredOptions: [],
      optionalOptions: [],
    },
  });

  useEffect(() => {
    if (data?.menuId) {
      form.reset({
        ...data,
        category: data.categoryId,
        requiredOptions: data.menuOptionGroups?.filter(
          (el) => el.type === "MANDATORY"
        ),
        optionalOptions: data.menuOptionGroups?.filter(
          (el) => el.type === "OPTIONAL"
        ),
      });
    }
  }, [data, form]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState({
    required: false,
    optional: false,
  });
  const [currentOption, setCurrentOption] = useState("required");

  return (
    <div className="scrollbar-hide flex h-full w-full flex-col md:gap-5 lg:gap-8">
      {/* 헤더 */}
      <div className="shrink-0">
        <Header />
      </div>
      {/* 콘텐츠 */}
      <FormProvider {...form}>
        <div className="overflow-hidden">
          <div className="scrollbar-hide flex h-full w-full flex-col overflow-y-auto md:flex-row md:gap-3 lg:gap-[18px]">
            <ImageSection
              previewUrl={previewUrl}
              onSetPreviewUrl={setPreviewUrl}
              isEditing={isEditing}
            />

            <FormSection isEditing={isEditing} storeId={storeId} type={type} />

            <section className="flex h-full basis-[31.3%] flex-col gap-3 lg:gap-[18px]">
              <OptionTemplate
                title="필수 옵션"
                onSetShowInfo={(value) =>
                  setShowInfo({ ...showInfo, required: value })
                }
                showInfo={showInfo.required}
                onClick={() => setCurrentOption("required")}
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
                onClick={() => setCurrentOption("optional")}
                isOpen={currentOption === "optional"}
                type="optionalOptions"
                isEditing={isEditing}
              />
            </section>
            <div className="flex w-full justify-center md:hidden">
              <ModalButton
                isEditing={isEditing}
                onSetEditing={onSetEditing}
                menuId={data?.menuId!}
                image={data?.image}
                type={type}
              />
            </div>
          </div>
        </div>
        {/* 바텀 버튼 */}
        <div className="hidden w-full justify-center md:flex">
          <ModalButton
            isEditing={isEditing}
            onSetEditing={onSetEditing}
            menuId={data?.menuId}
            image={data?.image}
            type={type}
          />
        </div>
      </FormProvider>
    </div>
  );
}
