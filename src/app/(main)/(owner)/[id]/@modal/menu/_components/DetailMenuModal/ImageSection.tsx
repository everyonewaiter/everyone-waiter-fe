"use client";

import { useRef } from "react";
import Image from "next/image";
import cn from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormErrorMessage } from "@/components/common/Form";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { TypeMenuForm } from "../../../../menu/_schema/menu.schema";

interface IProps {
  isEditing: boolean;
}

export default function ImageSection({ isEditing }: IProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { watch, setValue, formState } = useFormContext<TypeMenuForm>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imgFile", file, { shouldDirty: true, shouldValidate: true });
      setValue("imgString", URL.createObjectURL(file), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <section className="flex basis-[28.44%] flex-col gap-1 lg:gap-2">
      <div
        className={cn(
          "overflow-hidden rounded-xl md:h-[280px] lg:h-[478px] lg:rounded-3xl",
          watch("imgString") ? "" : "border border-gray-500",
          formState.errors.imgString ? "border-status-error" : ""
        )}
      >
        {watch("imgString") && watch("imgString").startsWith("blob") && (
          <Image
            src={watch("imgString")}
            alt="menu image"
            width={364}
            height={478}
            unoptimized
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
        {watch("imgString") && !watch("imgString").startsWith("blob") && (
          <ImageWithFallback
            src={watch("imgString")}
            alt="menu image"
            width={364}
            height={478}
            unoptimized
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
        {!watch("imgString") && (
          <div className="center h-full w-full">
            <Image
              src="/logo/logo-medium-gray.svg"
              alt="메뉴 이미지 없음"
              width={100}
              height={100}
              className="opacity-10"
            />
          </div>
        )}
      </div>
      {isEditing && formState.errors.imgString && (
        <FormErrorMessage>
          {formState.errors.imgString?.message?.toString()}
        </FormErrorMessage>
      )}
      {isEditing && (
        <>
          <button
            type="button"
            className="center lg:text-s text-gray-0 md:font-regular h-8 rounded-lg border border-gray-300 text-xs lg:h-9 lg:font-medium"
            onClick={() => fileRef.current?.click()}
          >
            이미지 {watch("imgString") ? "수정" : "등록"}
          </button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleFileChange}
          />
        </>
      )}
    </section>
  );
}
