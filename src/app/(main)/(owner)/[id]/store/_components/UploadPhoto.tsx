"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { ChangeEvent, RefObject, forwardRef, useState } from "react";
import Icon from "@/components/common/Icon/Icon";
import cn from "@/lib/utils";
import Spinner from "@/components/common/Spinner";

import LicensePreview from "./modals/LicensePreview";

const PdfViewer = dynamic(
  () => import("@/app/(main)/create/_components/PdfViewer"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

interface IProps {
  image?: string;
  imageFile?: File;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const UploadPhoto = forwardRef<HTMLInputElement, IProps>(
  ({ image, handleFile, className, imageFile }, ref) => {
    const [open, setOpen] = useState(false);

    let previewContent = null;
    if (imageFile?.type?.includes("pdf")) {
      previewContent = <PdfViewer file={imageFile} />;
    } else if (image) {
      previewContent = (
        <Image
          src={image}
          alt="사업자 등록증"
          width={400}
          height={160}
          className={cn("object-cover", className)}
        />
      );
    } else {
      previewContent = (
        <>
          <Icon
            iconKey="file-attach"
            size={40}
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <strong className="mt-3 text-sm font-medium text-gray-100 lg:text-base">
            사업자 등록증을 제출하세요
          </strong>
          <span className="lg:text-s font-regular mt-1 text-xs text-gray-300">
            JPG, PNG, PDF로 제출 가능합니다.
          </span>
        </>
      );
    }

    return (
      <>
        {open && (
          <LicensePreview
            onClose={() => setOpen(false)}
            onClickUpdate={() =>
              (ref as RefObject<HTMLInputElement>).current?.click()
            }
            image={image!}
            type={imageFile?.type.includes("pdf") ? "pdf" : "image"}
          />
        )}
        <button
          type="button"
          className={cn(
            `flex border-spacing-4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[16px] border-1 border-dashed border-gray-500 bg-gray-700 ${image ? "" : "p-6"}`,
            className
          )}
          onClick={() =>
            image
              ? setOpen(true)
              : (ref as RefObject<HTMLInputElement>).current?.click()
          }
        >
          {previewContent}
          <input
            ref={ref}
            type="file"
            hidden
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleFile}
          />
        </button>
      </>
    );
  }
);

export default UploadPhoto;
