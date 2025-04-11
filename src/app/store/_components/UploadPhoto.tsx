import React, { ChangeEvent, forwardRef, RefObject } from "react";
import Image from "next/image";
import cn from "@/lib/utils";

interface IProps {
  image?: string;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const UploadPhoto = forwardRef<HTMLInputElement, IProps>(
  ({ image, handleFile, className }, ref) => (
    <button
      type="button"
      className={cn(
        `flex border-spacing-4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[16px] border-1 border-dashed border-gray-500 bg-gray-700 ${image ? "" : "p-6"}`,
        className
      )}
      onClick={() => (ref as RefObject<HTMLInputElement>).current?.click()}
    >
      {image ? (
        <Image
          src={image}
          alt="사업자 등록중"
          width={400}
          height={160}
          className={cn("object-cover", className)}
        />
      ) : (
        <>
          <Image
            src="/icons/file-attach.svg"
            alt="사업자 등록 아이콘"
            width={40}
            height={40}
          />
          <strong className="mt-3 font-medium text-gray-100 md:text-sm lg:text-base">
            사업자 등록증을 제출하세요
          </strong>
          <span className="lg:text-s font-regular mt-1 text-gray-300 md:text-xs">
            JPG, PNG, PDF로 제출 가능합니다.
          </span>
          <input
            ref={ref}
            type="file"
            hidden
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleFile}
          />
        </>
      )}
    </button>
  )
);

export default UploadPhoto;
