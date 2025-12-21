"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import cn from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormErrorMessage } from "@/components/common/Form";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { TypeMenuForm } from "../../../../menu/_schema/menu.schema";

const PdfViewer = dynamic(
  () => import("@/app/(main)/create/_components/PdfViewer"),
  { ssr: false }
);

interface IProps {
  isEditing: boolean;
}

export default function ImageSection({ isEditing }: IProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { watch, setValue, formState } = useFormContext<TypeMenuForm>();

  const imgFile = watch("imgFile");
  const imgString = watch("imgString");
  const isPdf = imgFile?.type === "application/pdf";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file?.type!)) {
      // eslint-disable-next-line
      alert("PNG, JPG 및 PDF 파일만 업로드 가능합니다.");
      return;
    }

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
          "aspect-[364/478] h-[373px] overflow-hidden rounded-xl border border-gray-500 md:h-[280px] lg:h-[478px] lg:rounded-3xl",
          formState.errors.imgString || formState.errors.imgFile
            ? "border-status-error"
            : ""
        )}
      >
        {isPdf ? (
          <PdfViewer file={imgFile} />
        ) : (
          <>
            {imgString && imgString.startsWith("blob") && (
              <Image
                src={imgString}
                alt="menu image"
                width={364}
                height={478}
                unoptimized
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
            {imgString && !imgString.startsWith("blob") && (
              <ImageWithFallback
                src={imgString}
                alt="menu image"
                width={364}
                height={478}
                unoptimized
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </>
        )}
        {!imgString && (
          <div className="center h-full w-full">
            <Image
              src="/logo/logo-medium-gray.svg"
              alt="메뉴 이미지 없음"
              width={100}
              height={100}
              className="object-cover opacity-10"
            />
          </div>
        )}
      </div>
      {isEditing && formState.errors.imgString && (
        <FormErrorMessage>
          {formState.errors.imgString?.message?.toString()}
        </FormErrorMessage>
      )}
      {isEditing && formState.errors.imgFile && (
        <FormErrorMessage>
          {formState.errors.imgFile?.message?.toString()}
        </FormErrorMessage>
      )}
      {isEditing && (
        <>
          <button
            type="button"
            className="center lg:text-s md:font-regular h-8 rounded-lg border border-gray-400 text-xs text-gray-100 lg:h-9 lg:font-medium"
            onClick={() => fileRef.current?.click()}
          >
            이미지 {watch("imgString") ? "수정" : "등록"}
          </button>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,.pdf"
            hidden
            ref={fileRef}
            onChange={handleFileChange}
          />
        </>
      )}
    </section>
  );
}
