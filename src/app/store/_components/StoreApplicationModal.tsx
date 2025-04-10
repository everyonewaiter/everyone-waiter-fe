"use client";

import LargeModal from "@/components/modal/largeModalLayout";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabeledInput from "@/components/common/LabeledInput";
import { TypeStore } from "@/schema/store.schema";
import Image from "next/image";
import StepIndicator from "./StepIndicator";

type FormState = Pick<TypeStore, "storeName" | "businessNumber" | "address"> & {
  applicationDate: string;
  reasons: string;
};

interface IProps {
  close: () => void;
}

const formObj: { [key in keyof FormState]: string } = {
  storeName: "상호명",
  businessNumber: "사업자번호",
  address: "소재지",
  applicationDate: "신청일",
  reasons: "반려 사유",
};

export default function StoreApplicationModal({ close }: IProps) {
  const [active, setActive] = useState(0);
  const form = useForm<FormState>({
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

  return (
    <LargeModal
      onClose={close}
      title="매장 등록 신청 현황"
      button={{ text: "수정하고 재신청하기", onClick: () => null }}
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
              {Object.keys(formObj).map((key) => (
                <LabeledInput
                  key={key}
                  form={form}
                  name={key as keyof FormState}
                  label={formObj[key as keyof FormState]}
                  disabled
                  labelDisabled
                  className={
                    key === "reasons"
                      ? "!text-primary border-primary border !bg-[#F2202008] text-center"
                      : ""
                  }
                />
              ))}
            </form>
          </FormProvider>
        ) : (
          <div className="mb-10 flex w-full justify-center">
            {/* 예시 이미지 */}
            <Image
              src="/gif/no-stores.gif"
              alt="사업자 등록증"
              width={380}
              height={457}
              className="rounded-[16px] border border-gray-600"
            />
          </div>
        )}
      </div>
    </LargeModal>
  );
}
