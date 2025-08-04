"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { storesQueries } from "@/app/(main)/(owner)/[id]/store/_queries/useStores";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import LabeledInput from "@/components/common/LabeledInput";
import useOpenDaumPostcode from "@/hooks/useOpenDaumPostcode";
import { TypeAddStoreForm, addStoreSchema } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/common/Spinner";
import Logo from "@/components/Logo";
import { Form } from "@/components/common/Form";
import useCheckLeave from "@/hooks/useCheckLeave";
import UploadPhoto from "../../(owner)/[id]/store/_components/UploadPhoto";

export default function CreateForm() {
  const navigate = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<TypeAddStoreForm>({
    mode: "onSubmit",
    resolver: zodResolver(addStoreSchema),
    defaultValues: {
      name: "",
      ceoName: "",
      address: "",
      landline: "",
      license: "",
    },
  });

  const { mutate } = storesQueries.useRegister();

  useCheckLeave(form.formState.isDirty);

  const handleSubmit = () => {
    setIsSubmitted(true);

    const formData = new FormData();
    formData.append("name", form.getValues("name"));
    formData.append("ceoName", form.getValues("ceoName"));
    formData.append("address", form.getValues("address"));
    formData.append("landline", form.getValues("landline"));
    formData.append("license", form.getValues("license"));
    if (image) {
      formData.append("file", image);
    }

    mutate(formData, {
      onError: () => setIsSubmitted(false),
      onSuccess: () => navigate.replace("/create?state=pending"),
    });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const { handleOpenAddress } = useOpenDaumPostcode(form);

  return (
    <div className="flex w-full items-start justify-between rounded-[32px] bg-white p-8 md:w-[722px] lg:w-[888px]">
      <div className="hidden flex-col md:flex">
        <Logo
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
      <div className="flex w-[320px] flex-col items-start justify-start gap-[16px] lg:w-[400px]">
        <h1 className="text-gray-0 mb-8 flex w-full justify-center text-xl font-semibold md:hidden">
          매장 등록
        </h1>
        <Form {...form}>
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
              className="placeholder:text-gray-300"
            />
            <LabeledInput
              form={form}
              name="address"
              label="소재지"
              placeholder="소재지를 선택해주세요."
              className="cursor-pointer placeholder:text-gray-300"
              readOnly
              onClick={handleOpenAddress}
            />
            {/* <div className="flex flex-col gap-2">
              <Label>매장 전화번호</Label>
              <Input
                {...form.register("landline")}
                // onChange={(e) => {
                //   const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                //   const formatted = phoneNumberPattern(onlyNums);
                //   form.setValue("landline", formatted);
                // }}
                placeholder="매장 전화번호를 입력해주세요"
                className="placeholder:text-gray-300"
              />
            </div> */}
            <LabeledInput
              form={form}
              name="landline"
              label="매장 전화번호"
              placeholder="전화번호를 입력해주세요."
              className="placeholder:text-gray-300"
            />
            {/* <div className="flex flex-col gap-2">
              <Label>사업자 번호</Label>
              <Input
                {...form.register("license")}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  const formatted = formatBusinessNumber(onlyNums);
                  form.setValue("license", formatted);
                }}
                placeholder="사업자 번호를 입력해주세요"
                className="placeholder:text-gray-300"
              />
            </div> */}
            <LabeledInput
              form={form}
              name="license"
              label="사업자 번호"
              placeholder="사업자 번호를 입력해주세요."
              className="placeholder:text-gray-300"
            />
            <UploadPhoto
              ref={fileRef}
              handleFile={handleFile}
              image={imageUrl ?? ""}
              className="h-[140px] max-w-full md:h-40 md:w-[348px] lg:w-100"
            />
            <ResponsiveButton
              type="submit"
              responsiveButtons={{
                lg: { buttonSize: "lg" },
                md: { buttonSize: "sm" },
                sm: { buttonSize: "sm", className: "!h-10" },
              }}
              disabled={isSubmitted}
              commonClassName="mt-4"
            >
              {isSubmitted ? <Spinner /> : "신청하기"}
            </ResponsiveButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
