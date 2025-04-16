"use client";

import ModalWithTitle from "@/components/modal/largeModalLayout";
import { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LabeledInput from "@/components/common/LabeledInput";
import useOpenDaumPostcode from "@/hooks/useOpenDaumPostcode";
import formatBusinessNumber from "@/lib/formatting/formatBusinessNumber";
import formatDate from "@/lib/formatting/formatDate";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import useStores from "@/hooks/useStores";
import StepIndicator from "../StepIndicator";
import PhotoForBusiness from "./PhotoForBusiness";

type FormState = Omit<StoreDetail, "updatedAt" | "accountId"> & {
  image: string;
};

interface IProps {
  close: () => void;
  item: FormState;
}

export default function StoreApplicationModal({ close, item }: IProps) {
  const [active, setActive] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPhotoUpdating, setIsPhotoUpdating] = useState(false);

  const form = useForm<
    Omit<FormState, "image"> & { image: File | string | null }
  >({
    mode: "onChange",
    defaultValues: {
      name: "",
      ceoName: "",
      landline: "",
      license: "",
      address: "",
      createdAt: "",
      reason: "",
      image: null,
    },
  });

  useEffect(() => {
    if (item) {
      form.setValue("name", item.name);
      form.setValue("license", item.license);
      form.setValue("address", item.address);
      form.setValue("createdAt", item.createdAt);
      form.setValue("reason", item.reason);
      form.setValue("image", item.image);
    }
  }, [item]);

  const { handleOpenAddress } = useOpenDaumPostcode(form);
  const { reapplyRegister, reapplyRegisterWithImage } = useStores();

  const handleBusinessNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");
    form.setValue("license", formatBusinessNumber(str));
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");

    form.setValue("createdAt", formatDate(str));
  };

  const handleReapplyWithImage = () => {
    const formData = new FormData();
    formData.append("name", form.getValues("name"));
    formData.append("ceoName", form.getValues("ceoName"));
    formData.append("landline", form.getValues("landline"));
    formData.append("license", form.getValues("license"));
    formData.append("address", form.getValues("address"));
    formData.append("file", form.getValues("image") as File);

    reapplyRegisterWithImage({
      registrationId: item.registrationId.toString(),
      body: formData,
    });
  };

  const handleReapply = () => {
    reapplyRegister({
      registrationId: item.registrationId.toString(),
      body: {
        name: form.getValues("name"),
        ceoName: form.getValues("ceoName"),
        landline: form.getValues("landline"),
        license: form.getValues("license"),
        address: form.getValues("address"),
      },
    });
  };

  const handleApply = () => {
    if (typeof form.getValues("image") === "string") {
      handleReapply();
    } else {
      handleReapplyWithImage();
    }
  };

  return (
    <ModalWithTitle onClose={close} title="매장 등록 신청 현황">
      <ModalWithTitle.Layout>
        <div className="hidden w-full justify-center md:flex">
          <StepIndicator
            steps={["매장 정보 입력", "파일 첨부"]}
            onSetActive={setActive}
            isActive={active}
          />
        </div>
        <div className="mt-6 h-[340px] md:mt-4 md:mb-6 md:h-[292px] md:overflow-y-scroll lg:mt-5 lg:mb-[33px] lg:h-[424px]">
          {active === 0 ? (
            <FormProvider {...form}>
              <form className="flex flex-col gap-4">
                <LabeledInput
                  form={form}
                  name="name"
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
                    {...form.register("license")}
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
                    {...form.register("createdAt")}
                    placeholder="신청일을 입력해주세요."
                    className="placeholder:text-gray-300"
                    onChange={handleDate}
                    disabled={!isUpdating}
                  />
                </div>
                <LabeledInput
                  form={form}
                  name="reason"
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
              <div className="flex w-full md:hidden">
                <PhotoForBusiness
                  isUpdating={isUpdating}
                  isPhotoUpdating={isPhotoUpdating}
                  onResetPhoto={() => setIsPhotoUpdating(true)}
                  imageUrl={item.image}
                />
              </div>
            </FormProvider>
          ) : (
            <PhotoForBusiness
              isUpdating={isUpdating}
              isPhotoUpdating={isPhotoUpdating}
              onResetPhoto={() => setIsPhotoUpdating(true)}
              imageUrl={item.image}
            />
          )}
        </div>
      </ModalWithTitle.Layout>
      <ModalWithTitle.Button
        type={isUpdating ? "submit" : "button"}
        color={isUpdating ? "primary" : "black"}
        onClick={() => (isUpdating ? handleApply() : setIsUpdating(true))}
      >
        {isUpdating ? "재신청하기" : "수정하고 재신청하기"}
      </ModalWithTitle.Button>
    </ModalWithTitle>
  );
}
