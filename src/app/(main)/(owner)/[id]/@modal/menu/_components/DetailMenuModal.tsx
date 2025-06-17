"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import { FormProvider, useForm } from "react-hook-form";
import FormSection from "./FormSection";
import OptionTemplate from "./OptionTemplate";
import Header from "./Header";
import useCategories from "../../../menu/_hooks/useCategories";
import useMenu from "../../../menu/_hooks/useMenu";
// import useMenu from "../../../menu/_hooks/useMenu";
// import useCategories from "../../../menu/_hooks/useCategories";

export interface MenuFormType extends Omit<Menu, "price"> {
  price: string;
  category: string;
  printEnabled: boolean;
  requiredOptions: { name: string; price: string }[];
  optionalOptions: { name: string; price: string }[];
}

interface IProps {
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  storeId: string;
}

export default function DetailMenuModal({
  isEditing,
  onSetEditing,
  storeId,
}: IProps) {
  const navigate = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  const form = useForm<Omit<MenuFormType, "image"> & { image: File | null }>({
    mode: "onChange",
    defaultValues: {
      image: null,
      category: "",
      name: "",
      description: "",
      price: "",
      spicy: 1,
      state: "DEFAULT",
      label: "DEFAULT",
      printEnabled: false,
      requiredOptions: [],
      optionalOptions: [],
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState({
    required: false,
    optional: false,
  });
  const [currentOption, setCurrentOption] = useState("required");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const { categoryListQuery } = useCategories(storeId);
  const categories = categoryListQuery.data?.categories;

  const { add } = useMenu(storeId);

  const handleSubmit = () => {
    add(
      {
        storeId,
        categoryId: categories?.find((el) => el.name === form.watch("category"))
          ?.categoryId as string,
        body: {
          file: form.getValues("image")!,
          request: {
            ...form.getValues(),
            price: Number(form.getValues("price").split(",").join("")),
            menuOptionGroups: [
              {
                name: "필수 옵션",
                type: "MANDATORY",
                printEnabled: false,
                menuOptions: form
                  .getValues("requiredOptions")
                  .map((el) => ({ name: el.name, price: Number(el.price) })),
              },
              {
                name: "선택 옵션",
                type: "MANDATORY",
                printEnabled: false,
                menuOptions: form
                  .getValues("optionalOptions")
                  .map((el) => ({ name: el.name, price: Number(el.price) })),
              },
            ],
          },
        },
      },
      {
        onSuccess: () => navigate.back(),
        onError: (e) => console.log(e),
      }
    );
  };

  const buttonText = () => {
    if (getPathnameWithoutStoreId(pathname) === "/menu/create") {
      return "등록하기";
    }
    return isEditing ? "저장하기" : "수정하기";
  };

  return (
    <div className="scrollbar-hide flex h-full w-full flex-col md:justify-between">
      {/* 헤더 */}
      <Header />
      {/* 콘텐츠 랩 */}
      <div className="h-[580px] w-full flex-1 md:flex md:h-full md:flex-col">
        {/* 콘텐츠 */}
        <div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col gap-4 overflow-y-auto md:flex-row md:gap-[12px] lg:gap-[18px]">
            <section className="flex basis-[28.44%] flex-col gap-1 lg:gap-2">
              <div className="overflow-hidden rounded-[12px] bg-red-50 md:h-[280px] lg:h-[478px] lg:rounded-[24px]">
                {previewUrl && (
                  <Image
                    src={previewUrl}
                    alt="menu image"
                    width={364}
                    height={478}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <button
                type="button"
                className="center lg:text-s text-gray-0 md:font-regular h-8 rounded-[8px] border border-gray-300 text-xs lg:h-9 lg:font-medium"
                onClick={() => fileRef.current?.click()}
              >
                이미지 등록
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                ref={fileRef}
              />
            </section>
            <FormProvider {...form}>
              <FormSection isEditing={isEditing} storeId={storeId} />
            </FormProvider>
            <section className="flex basis-[31.3%] flex-col gap-3 md:mt-0 lg:gap-[18px]">
              <FormProvider {...form}>
                <OptionTemplate
                  title="필수 옵션"
                  onSetShowInfo={(value) =>
                    setShowInfo({ ...showInfo, required: value })
                  }
                  showInfo={showInfo.required}
                  onClick={() => setCurrentOption("required")}
                  isOpen={currentOption === "required"}
                  data={form.watch("requiredOptions")}
                />
                <OptionTemplate
                  title="선택 옵션"
                  onSetShowInfo={(value) =>
                    setShowInfo({ ...showInfo, optional: value })
                  }
                  showInfo={showInfo.optional}
                  onClick={() => setCurrentOption("optional")}
                  isOpen={currentOption === "optional"}
                  data={form.watch("optionalOptions")}
                />
              </FormProvider>
            </section>
            {/* 바텀 버튼 */}
            <div className="flex w-full justify-center md:hidden">
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
                onClick={() =>
                  isEditing ? handleSubmit() : onSetEditing(true)
                }
              >
                {buttonText()}
              </ResponsiveButton>
            </div>
          </div>
        </div>
        {/* 바텀 버튼 */}
        <div className="hidden w-full justify-center md:flex">
          <ResponsiveButton
            type={isEditing ? "submit" : "button"}
            color={isEditing ? "black" : "primary"}
            responsiveButtons={{
              lg: {
                buttonSize: "xl",
                className: "!text-lg !font-semibold !h-14 py-8 w-[480px]",
              },
              md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
              sm: { buttonSize: "sm", className: "!h-10" },
            }}
            onClick={() => (isEditing ? handleSubmit() : onSetEditing(true))}
          >
            {buttonText()}
          </ResponsiveButton>
        </div>
      </div>
    </div>
  );
}
