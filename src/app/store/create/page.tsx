"use client";

import LabeledInput from "@/components/common/LabeledInput";
import { storeSchema, TypeStore } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const STORE_OBJECT: Record<
  keyof TypeStore,
  { label: string; placeholder: string }
> = {
  storeName: {
    label: "상호명",
    placeholder: "상호명을 입력해주세요. (20자 이내)",
  },
  owner: {
    label: "대표자명",
    placeholder: "대표자명을 입력해주세요.",
  },
  address: {
    label: "소재지",
    placeholder: "소재지를 입력해주세요.",
  },
  phoneNumber: {
    label: "매장 전화번호",
    placeholder: "매장 전화번호를 입력해주세요.",
  },
  businessNumber: {
    label: "사업자번호",
    placeholder: "사업자번호를 입력해주세요. (000-00-00000)",
  },
};

export default function CreateStore() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const form = useForm<TypeStore>({
    mode: "onChange",
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      owner: "",
      address: "",
      phoneNumber: "",
      businessNumber: "",
    },
  });

  const submitHandler = () => {};

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex w-222 justify-between rounded-[32px] bg-white p-8">
      <div className="flex flex-col">
        <Image src="/logo.svg" alt="로고" width={90} height={90} />
        <h1 className="text-gray-0 mt-10 text-4xl font-bold">매장 등록</h1>
        <p className="font-regular mt-3 text-[15px] text-gray-300">
          첫 매장을 등록해볼까요?
          <br />
          간단한 정보만 입력하면 바로 시작할 수 있어요!
        </p>
      </div>
      <div className="flex w-100 flex-col gap-[16px]">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            {Object.keys(STORE_OBJECT).map((key) => (
              <LabeledInput
                key={key}
                form={form}
                name={key as keyof TypeStore}
                label={STORE_OBJECT[key as keyof TypeStore].label}
                placeholder={STORE_OBJECT[key as keyof TypeStore].placeholder}
              />
            ))}
          </form>
        </FormProvider>
        <button
          type="button"
          className={`flex h-40 w-full border-spacing-4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[16px] border-1 border-dashed border-gray-500 bg-gray-700 ${image ? "" : "p-6"}`}
          onClick={() => fileRef.current?.click()}
        >
          {image ? (
            <Image
              src={image}
              alt="사업자 등록중"
              width={400}
              height={160}
              className="object-center"
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
                ref={fileRef}
                type="file"
                hidden
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={handleFile}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
