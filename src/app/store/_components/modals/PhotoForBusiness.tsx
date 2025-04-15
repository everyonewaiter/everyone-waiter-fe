import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import UploadPhoto from "../UploadPhoto";

interface IProps {
  isPhotoUpdating: boolean;
  onResetPhoto: () => void;
  isUpdating: boolean;
}

export default function PhotoForBusiness({
  isUpdating,
  onResetPhoto,
  isPhotoUpdating,
}: IProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center md:px-12">
      {/* 예시 이미지 */}
      {isPhotoUpdating ? (
        <div className="h-[346px] w-full lg:h-[457px]">
          <UploadPhoto
            ref={fileRef}
            handleFile={handleFile}
            image={image!}
            className="mt-5 h-[346px] w-[280px] md:mt-0 md:h-[260px] md:w-[216px] lg:h-[457px] lg:w-[380px]"
          />
        </div>
      ) : (
        <div className="mt-5 h-[346px] md:mt-0 lg:h-[457px]">
          <Image
            src="/gif/no-stores.gif"
            alt="사업자 등록증"
            width={380}
            height={457}
            className="h-full rounded-[16px] border border-gray-600 md:h-[260px] md:w-[216px] lg:h-[457px] lg:w-[380px]"
          />
          {isUpdating && (
            <ResponsiveButton
              color="outline-black"
              variant="outline"
              onClick={onResetPhoto}
              responsiveButtons={{
                lg: { buttonSize: "button-md" },
                md: { buttonSize: "button-sm" },
                sm: { buttonSize: "button-sm" },
              }}
              commonClassName="mb-5 mt-3"
            >
              초기화하기
            </ResponsiveButton>
          )}
        </div>
      )}
    </div>
  );
}
