import { useRef } from "react";
import Image from "next/image";
import cn from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { MenuFormType } from "../../_types/menuForm.type";

interface IProps {
  previewUrl: string | null;
  isEditing: boolean;
  onSetPreviewUrl: (value: string) => void;
}

export default function ImageSection({
  previewUrl,
  isEditing,
  onSetPreviewUrl,
}: IProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const form = useFormContext<
    Omit<MenuFormType, "image"> & { image: File | string | null }
  >();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      onSetPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <section className="flex basis-[28.44%] flex-col gap-1 lg:gap-2">
      <div
        className={cn(
          "overflow-hidden rounded-[12px] md:h-[280px] lg:h-[478px] lg:rounded-[24px]",
          previewUrl || form.watch("image") ? "" : "border border-gray-500"
        )}
      >
        {(previewUrl || form.watch("image")) && (
          <Image
            src={
              previewUrl ||
              `${process.env.NEXT_PUBLIC_DEV_CDN}/${form.watch("image")}`
            }
            alt="menu image"
            width={364}
            height={478}
            loading="lazy"
            className="h-full w-full bg-red-50 object-cover"
          />
        )}
      </div>
      {isEditing && (
        <>
          <button
            type="button"
            className="center lg:text-s text-gray-0 md:font-regular h-8 rounded-[8px] border border-gray-300 text-xs lg:h-9 lg:font-medium"
            onClick={() => fileRef.current?.click()}
          >
            이미지 {form.watch("image") ? "수정" : "등록"}
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
