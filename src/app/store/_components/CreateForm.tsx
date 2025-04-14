"use client";

/* eslint-disable no-nested-ternary */
import { Button } from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import { storeSchema, TypeStore } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import useOpenDaumPostcode from "@/hooks/useOpenDaumPostcode";
import formatBusinessNumber from "@/lib/formatting/formatBusinessNumber";
import { buttonSize } from "@/styles/responsiveButton";
import cn from "@/lib/utils";
import useStores from "@/hooks/useStores";
import UploadPhoto from "./UploadPhoto";

export default function CreateForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<TypeStore>({
    mode: "onChange",
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      ceoName: "",
      address: "",
      landline: "",
      license: "",
    },
  });

  const { register } = useStores();

  const handleSubmit = (data: TypeStore) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("ceoName", data.ceoName);
    formData.append("address", data.address);
    formData.append("landline", data.landline);
    formData.append("license", data.license);
    if (image) {
      formData.append("file", image);
    }

    register(formData);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const { handleOpenAddress } = useOpenDaumPostcode(form);

  const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");
    form.setValue("landline", phoneNumberPattern(str));
  };

  const handleBusinessNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");
    form.setValue("license", formatBusinessNumber(str));
  };

  return (
    <div className="flex w-full justify-between rounded-[32px] bg-white p-8 md:w-[722px] lg:w-[888px]">
      <div className="hidden flex-col md:flex">
        <Image
          src="/logo.svg"
          alt="로고"
          width={90}
          height={90}
          className="md:h-[60px] md:w-[60px] lg:h-[90px] lg:w-[90px]"
        />
        <h1 className="text-gray-0 md:mt-5 md:text-xl md:font-semibold lg:mt-10 lg:text-4xl lg:font-bold">
          매장 등록
        </h1>
        <p className="font-regular text-gray-300 md:mt-2 md:text-xs lg:mt-3 lg:text-[15px]">
          첫 매장을 등록해볼까요?
          <br />
          간단한 정보만 입력하면 바로 시작할 수 있어요!
        </p>
      </div>
      <div className="flex w-[320px] flex-col gap-[16px] lg:w-[400px]">
        <h1 className="text-gray-0 mb-8 flex w-full justify-center text-xl font-semibold md:hidden">
          매장 등록
        </h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <LabeledInput
              form={form}
              name="name"
              label="상호명"
              placeholder="상호명을 입력해주세요. (20자 이내)"
            />
            <LabeledInput
              form={form}
              name="ceoName"
              label="대표자명"
              placeholder="대표자명 입력해주세요."
              className="hidden cursor-pointer placeholder:text-gray-300 md:block"
              containerClassName="hidden md:block"
            />
            <div className="hidden md:block">
              <Label className="mb-1">소재지</Label>
              <Input
                {...form.register("address")}
                placeholder="소재지를 입력해주세요."
                readOnly
                onClick={handleOpenAddress}
                className="cursor-pointer placeholder:text-gray-300"
              />
            </div>
            <div className="hidden md:block">
              <Label className="mb-1">매장 전화번호</Label>
              <Input
                {...form.register("landline")}
                placeholder="매장 전화번호를 입력해주세요."
                className="placeholder:text-gray-300"
                onChange={handlePhoneNumber}
              />
            </div>
            <div>
              <Label className="mb-1">사업자 번호</Label>
              <Input
                {...form.register("license")}
                placeholder="사업자 번호를 입력해주세요."
                className="placeholder:text-gray-300"
                onChange={handleBusinessNumber}
              />
            </div>
            <UploadPhoto
              ref={fileRef}
              handleFile={handleFile}
              image={imageUrl!}
              className="h-[140px] max-w-full md:h-40 md:w-[348px] lg:w-100"
            />
            <Button
              type="submit"
              className={cn(
                buttonSize("md", "sm"),
                buttonSize("lg", "lg"),
                "h-9 rounded-[8px] text-sm font-medium text-white md:h-10 lg:h-12",
                "mt-4 w-full md:mb-5"
              )}
            >
              신청하기
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
