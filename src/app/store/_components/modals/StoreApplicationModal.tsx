"use client";

import ModalWithTitle from "@/components/modal/largeModalLayout";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabeledInput from "@/components/common/LabeledInput";
import { TypeStore } from "@/schema/store.schema";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import useOpenDaumPostcode from "@/hooks/useOpenDaumPostcode";
import formatBusinessNumber from "@/lib/formatting/formatBusinessNumber";
import formatDate from "@/lib/formatting/formatDate";
import Label from "@/components/common/label";
import Input from "@/components/common/Input";
import StepIndicator from "../StepIndicator";
import UploadPhoto from "../UploadPhoto";

type FormState = Pick<TypeStore, "storeName" | "businessNumber" | "address"> & {
  applicationDate: string;
  reasons: string;
};

interface IProps {
  close: () => void;
}

export default function StoreApplicationModal({ close }: IProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPhotoUpdating, setIsPhotoUpdating] = useState(false);
  const [image, setImage] = useState("");

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const form = useForm<FormState>({
    mode: "onChange",
    defaultValues: {
      storeName: "",
      businessNumber: "",
      address: "",
      applicationDate: "",
      reasons: "",
    },
  });

  useEffect(() => {
    form.setValue("storeName", "모두의 웨이터");
    form.setValue("businessNumber", "123-45-67890");
    form.setValue("address", "서울 강남구 29-12길");
    form.setValue("applicationDate", "2025-01-01");
    form.setValue("reasons", "사업자 정보를 조회할 수 없습니다.");
  }, [form]);

  const { handleOpenAddress } = useOpenDaumPostcode(form);

  const handleBusinessNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");
    form.setValue("businessNumber", formatBusinessNumber(str));
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");
    form.setValue("applicationDate", formatDate(str));
  };

  return (
    <ModalWithTitle
      onClose={close}
      title="매장 등록 신청 현황"
      buttonComponent={
        isUpdating ? (
          <Button
            className="w-full"
            color="primary"
            size="lg"
            onClick={() => null}
          >
            재신청하기
          </Button>
        ) : (
          <Button
            className="w-full"
            color="black"
            size="lg"
            onClick={() => setIsUpdating(true)}
          >
            수정하고 재신청하기
          </Button>
        )
      }
    >
      <div className="flex w-full justify-center">
        <StepIndicator
          steps={["매장 정보 입력", "파일 첨부"]}
          onSetActive={setActive}
          isActive={active}
        />
      </div>
      <div className="mt-5 mb-[33px]">
        {active === 0 ? (
          <FormProvider {...form}>
            <form className="flex flex-col gap-4">
              <LabeledInput
                form={form}
                name="storeName"
                label="상호명"
                placeholder="상호명을 입력해주세요. (20자 이내)"
                disabled={!isUpdating}
                labelDisabled={!isUpdating}
              />
              <div>
                <Label className="mb-2" disabled={!isUpdating}>
                  사업자 번호
                </Label>
                <Input
                  {...form.register("businessNumber")}
                  placeholder="사업자 번호를 입력해주세요."
                  className="placeholder:text-gray-300"
                  onChange={handleBusinessNumber}
                  disabled={!isUpdating}
                />
              </div>
              <LabeledInput
                form={form}
                name="address"
                label="소재지"
                placeholder="소재지를 입력해주세요."
                disabled={!isUpdating}
                labelDisabled={!isUpdating}
                onClick={() => (isUpdating ? handleOpenAddress() : null)}
                className="cursor-pointer"
                readOnly={isUpdating}
              />
              <div>
                <Label className="mb-2" disabled={!isUpdating}>
                  신청일
                </Label>
                <Input
                  {...form.register("applicationDate")}
                  placeholder="신청일을 입력해주세요."
                  className="placeholder:text-gray-300"
                  onChange={handleDate}
                  disabled={!isUpdating}
                />
              </div>
              <LabeledInput
                form={form}
                name="reasons"
                label="반려 사유"
                disabled
                labelDisabled
                className={
                  isUpdating
                    ? ""
                    : "!text-primary border-primary border !bg-[#F2202008] text-center"
                }
              />
            </form>
          </FormProvider>
        ) : (
          <div className="mb-10 flex w-full flex-col items-center justify-center px-12">
            {/* 예시 이미지 */}
            {isPhotoUpdating ? (
              <div className="h-[457px] w-[380px]">
                <UploadPhoto
                  ref={fileRef}
                  handleFile={handleFile}
                  image={image!}
                  width="380"
                  height="457"
                />
              </div>
            ) : (
              <>
                <Image
                  src="/gif/no-stores.gif"
                  alt="사업자 등록증"
                  width={380}
                  height={457}
                  className="h-[457px] w-[380px] rounded-[16px] border border-gray-600"
                />
                {isUpdating && (
                  <Button
                    size="md"
                    color="outline-black"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => setIsPhotoUpdating(true)}
                  >
                    초기화하기
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </ModalWithTitle>
  );
}
