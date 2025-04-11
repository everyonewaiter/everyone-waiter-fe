import React, { ChangeEvent, forwardRef, RefObject } from "react";
import Image from "next/image";
import cn from "@/lib/utils";

interface IProps {
  image?: string;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
}

const UploadPhoto = forwardRef<HTMLInputElement, IProps>(
  ({ image, handleFile, width, height }, ref) => (
    <button
      type="button"
      style={{ width }}
      className={cn(
        `flex w-full border-spacing-4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[16px] border-1 border-dashed border-gray-500 bg-gray-700 ${image ? "" : "p-6"}`,
        height ? "h-full" : "h-40"
      )}
      onClick={() => (ref as RefObject<HTMLInputElement>).current?.click()}
    >
      {image ? (
        <Image
          src={image}
          alt="사업자 등록중"
          width={Number(width) || 400}
          height={Number(height) || 160}
          className="object-contain"
        />
      ) : (
        <>
          <Image
            src="/icons/file-attach.svg"
            alt="사업자 등록 아이콘"
            width={40}
            height={40}
          />
          <strong className="mt-3 text-base font-medium text-gray-100">
            사업자 등록증을 제출하세요
          </strong>
          <span className="text-s font-regular mt-1 text-gray-300">
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
