"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import { useStoreContext } from "@/providers/storeProvider";
import { FormProvider, useForm } from "react-hook-form";
import cn from "@/lib/utils";
import FormSection from "./FormSection";
import OptionTemplate from "./OptionTemplate";
import Header from "./Header";
import useMenu from "../../../menu/_queries/useMenu";
import { MenuFormType } from "../_types/menuForm.type";
import { formToRequest } from "../_hooks/useMenuForm";

interface IProps {
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  type: "create" | "update";
  categoryId?: string;
  menuId?: string;
}

export default function DetailMenuModal({
  isEditing,
  onSetEditing,
  type,
  categoryId,
  menuId,
}: IProps) {
  const navigate = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  const { storeId } = useStoreContext();
  const { detailQuery } = useMenu(storeId);

  const isUpdateReady = type === "update" && !!categoryId && !!menuId;
  const { data } = detailQuery(categoryId!, menuId!, isUpdateReady);

  const form = useForm<
    Omit<MenuFormType, "image"> & { image: File | string | null }
  >({
    mode: "onChange",
    defaultValues: {
      image: null,
      category: "",
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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (data?.menuId) {
      form.reset({
        ...data,
        category: data?.categoryId,
        requiredOptions: data?.menuOptionGroups.filter(
          (el) => el.type === "MANDATORY"
        ),
        optionalOptions: data?.menuOptionGroups.filter(
          (el) => el.type === "OPTIONAL"
        ),
      });
    }
  }, [data]);

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

  const { add, update, updateWithImg } = useMenu(storeId);

  const handleSubmit = () => {
    const values = form.getValues();
    const { request } = formToRequest(values);

    if (type === "create") {
      add.mutate(
        {
          storeId,
          categoryId: form.watch("category") || categoryId!,
          body: {
            file: form.getValues("image") as File,
            request,
          },
        },
        {
          onSuccess: () => navigate.back(),
        }
      );
    } else if (type === "update") {
      if (
        form.watch("image") instanceof File &&
        data?.image !== form.watch("image")
      ) {
        updateWithImg.mutate(
          {
            storeId,
            menuId: data?.menuId as string,
            body: {
              file: form.watch("image") as File,
              request,
            },
          },
          {
            onSuccess: () => navigate.back(),
          }
        );
      } else {
        update.mutate(
          {
            storeId,
            menuId: data?.menuId as string,
            body: request,
          },
          { onSuccess: () => navigate.back() }
        );
      }
    }
  };

  const buttonText = () => {
    if (getPathnameWithoutStoreId(pathname) === "/menu/create") {
      return "등록하기";
    }
    return isEditing ? "저장하기" : "수정하기";
  };

  return (
    <div className="scrollbar-hide flex h-full w-full flex-col md:gap-5 lg:gap-8">
      {/* 헤더 */}
      <div className="shrink-0">
        <Header />
      </div>
      {/* 콘텐츠 */}
      <FormProvider {...form}>
        <div className="flex h-full w-full flex-col overflow-y-auto md:flex-row md:gap-3 lg:gap-[18px]">
          <section className="flex basis-[28.44%] flex-col gap-1 lg:gap-2">
            <div
              className={cn(
                "overflow-hidden rounded-[12px] md:h-[280px] lg:h-[478px] lg:rounded-[24px]",
                previewUrl || form.watch("image")
                  ? ""
                  : "border border-gray-500"
              )}
            >
              {(previewUrl || form.watch("image")) && (
                <Image
                  src={
                    previewUrl
                      ? (previewUrl as string)
                      : `${process.env.NEXT_PUBLIC_DEV_CDN}/${form.watch("image")}`
                  }
                  alt="menu image"
                  width={364}
                  height={478}
                  className="h-full w-full bg-red-50 object-cover"
                />
              )}
            </div>
            {isEditing && (
              <button
                type="button"
                className="center lg:text-s text-gray-0 md:font-regular h-8 rounded-[8px] border border-gray-300 text-xs lg:h-9 lg:font-medium"
                onClick={() => fileRef.current?.click()}
              >
                이미지 {form.watch("image") ? "수정" : "등록"}
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
              ref={fileRef}
            />
          </section>

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
              onClick={() => (isEditing ? handleSubmit() : onSetEditing(true))}
            >
              {buttonText()}
            </ResponsiveButton>
          </div>
        </div>
      </FormProvider>
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
  );
}
