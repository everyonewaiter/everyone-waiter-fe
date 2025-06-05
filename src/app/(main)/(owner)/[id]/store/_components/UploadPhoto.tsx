import React, { ChangeEvent, forwardRef, RefObject } from "react";
import Image from "next/image";
import cn from "@/lib/utils";
import Icon from "@/components/common/Icon";

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
