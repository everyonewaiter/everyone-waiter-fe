"use client";

import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import EditIcon from "@public/icons/edit-contained.svg";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  close: () => void;
}

export default function UserInfoModal({ close }: IProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    mode: "onChange",
  });

  const submitHandler = () => {};

  return (
    <ModalWithTitle
      onClose={close}
      title="회원 정보"
      topRightComponent={
        isEditing ? (
          <ResponsiveButton
            type="button"
            variant="outline"
            color="outline-primary"
            responsiveButtons={{
              lg: { buttonSize: "sm" },
            }}
          >
            편집 완료
          </ResponsiveButton>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon width="20" height="20" className="text-gray-300" />
            <span className="text-sm font-medium text-gray-300">편집</span>
          </button>
        )
      }
    >
      <ModalWithTitle.Layout className="mt-6 !h-[450px]">
        <FormProvider {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <div className="flex flex-col gap-4">
              <LabeledInput
                form={form}
                name="email"
                label="이메일"
                placeholder="이메일"
                disabled
                labelDisabled
              />
              <LabeledInput
                form={form}
                name="date"
                label="가입 일시"
                placeholder="가입 일시"
                disabled
                labelDisabled
              />
              <LabeledInput
                form={form}
                name="permission"
                label="권한"
                placeholder="권한"
                disabled={!isEditing}
                labelDisabled={!isEditing}
              />
              <LabeledInput
                form={form}
                name="subscribe"
                label="구독 상태"
                placeholder="구독 상태"
                disabled={!isEditing}
                labelDisabled={!isEditing}
              />
              <LabeledInput
                form={form}
                name="status"
                label="상태"
                placeholder="상태"
                disabled={!isEditing}
                labelDisabled={!isEditing}
              />
            </div>
          </form>
        </FormProvider>
      </ModalWithTitle.Layout>
      <ResponsiveButton
        type={isEditing ? "submit" : "button"}
        color="black"
        responsiveButtons={{
          sm: { buttonSize: "sm" },
          md: { buttonSize: "sm" },
          lg: { buttonSize: "lg" },
        }}
        commonClassName="w-full mt-8"
        onClick={() => (isEditing ? null : close())}
      >
        확인
      </ResponsiveButton>
    </ModalWithTitle>
  );
}
