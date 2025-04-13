import Image from "next/image";
import { Button } from "@/components/common/Button";
import { ChangeEvent, useRef, useState } from "react";
import { buttonSize } from "@/styles/responsiveButton";
import cn from "@/lib/utils";
import UploadPhoto from "../UploadPhoto";

interface IProps {
  isPhotoUpdating: boolean;
  onResetPhoto: () => void;
  isUpdating: boolean;
  imageUrl: string;
}

export default function PhotoForBusiness({
  isUpdating,
  onResetPhoto,
  isPhotoUpdating,
  imageUrl,
}: IProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
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
        <div className="mt-5 h-[346px] w-full md:mt-0 lg:h-[457px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${imageUrl}`}
            alt="사업자 등록증"
            width={380}
            height={457}
            className="h-full rounded-[16px] border border-gray-600 md:h-[260px] md:w-[216px] lg:h-[457px] lg:w-[380px]"
          />
          {isUpdating && (
            <Button
              color="outline-black"
              variant="outline"
              className={cn(
                "mt-3 w-full",
                buttonSize(null, "sm"),
                buttonSize("lg", "md"),
                "mb-5 !h-8 lg:!h-10"
              )}
              onClick={onResetPhoto}
            >
              초기화하기
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
