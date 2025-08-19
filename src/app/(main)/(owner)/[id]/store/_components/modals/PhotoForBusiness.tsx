import { ChangeEvent, useRef } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import ImageWithFallback from "@/components/common/ImageWithFallback";

interface IProps {
  isUpdating: boolean;
  image: string;
  onSetImage: (value: string) => void;
}

export default function PhotoForBusiness({
  isUpdating,
  image,
  onSetImage,
}: IProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image.startsWith("blob:")) URL.revokeObjectURL(image);
    onSetImage(URL.createObjectURL(file));
  };

  const isBlob = image.startsWith("blob:") || image.startsWith("data:");

  return (
    <div className="flex w-full flex-col items-center justify-center md:px-12">
      <div className="mt-5 flex w-full flex-col items-center md:mt-0">
        {isBlob ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="사업자 등록증"
            className="h-full rounded-[16px] border border-gray-600 object-cover md:h-[260px] md:w-[210px] lg:h-[437px] lg:w-[360px]"
          />
        ) : (
          <ImageWithFallback
            src={image}
            alt="사업자 등록증"
            width={380}
            height={457}
            className="h-full rounded-[16px] border border-gray-600 md:h-[260px] md:w-[216px] lg:h-[437px] lg:w-[360px]"
            unoptimized
          />
        )}
        <input
          ref={fileRef}
          type="file"
          hidden
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={handleFile}
        />
        {isUpdating && (
          <ResponsiveButton
            color="black"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            responsiveButtons={{
              lg: { buttonSize: "md" },
              md: { buttonSize: "sm" },
              sm: { buttonSize: "sm" },
            }}
            commonClassName="md:mb-0 lg:mb-5 mt-3 !w-full"
          >
            변경하기
          </ResponsiveButton>
        )}
      </div>
    </div>
  );
}
