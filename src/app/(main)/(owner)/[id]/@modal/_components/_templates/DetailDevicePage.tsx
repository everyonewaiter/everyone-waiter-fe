"use client";

import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import { deviceTranslate, paymentTimeTranslate } from "@/constants/translates";
import SkeletonGroup from "@/components/common/Skeleton/SkeletonGroup";
import Input from "@/components/common/Input";
import useDeviceForm from "../../_hooks/useDeviceForm";
import ModalButton from "../ModalButton";

interface IProps {
  deviceId: string;
  storeId: string;
}

export default function DetailDevicePage({ deviceId, storeId }: IProps) {
  const { form, submitHandler, isSubmitted, deviceDetail } = useDeviceForm({
    deviceId,
    storeId,
  });

  if (!deviceDetail)
    return (
      <div className="flex h-[288px] flex-col gap-3.5 md:h-[324px] lg:h-[488px]">
        <SkeletonGroup />
      </div>
    );

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <LabeledInput form={form} name="name" label="기기 이름" />
        <LabeledInput form={form} name="createdAt" label="등록일시" disabled />
        <div className="flex flex-col gap-2">
          <Label disabled>상태</Label>
          <Input
            {...form.register("state")}
            value={form.watch("state") === "ACTIVE" ? "활성화" : "비홠성화"}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>권한</Label>
          <Dropdown
            data={Object.values(deviceTranslate)}
            active={
              deviceTranslate[
                form.watch("purpose") as keyof typeof deviceTranslate
              ]
            }
            setActive={(value) => {
              const selected = Object.entries(deviceTranslate).find(
                (el) => el[1] === value
              );
              form.setValue("purpose", selected?.[0] as DevicePurpose);
            }}
            defaultText={
              deviceTranslate[
                deviceDetail?.purpose as keyof typeof deviceTranslate
              ] || "전체"
            }
            triggerClassName="lg:rounded-[12px] rounded-[8px] justify-between"
          />
        </div>
        {form.watch("purpose") === "TABLE" && (
          <>
            <LabeledInput
              form={form}
              name="tableNo"
              label="테이블 번호"
              type="number"
            />
            <div className="flex flex-col gap-2">
              <Label>결제 방식</Label>
              <Dropdown
                data={Object.values(paymentTimeTranslate)}
                active={
                  paymentTimeTranslate[
                    form.watch("paymentType") as DevicePayment
                  ]
                }
                setActive={(value) => {
                  const selected = Object.entries(paymentTimeTranslate).find(
                    (el) => el[1] === value
                  );
                  if (selected) {
                    form.setValue("paymentType", selected[0] as DevicePayment);
                  }
                }}
                defaultText={
                  paymentTimeTranslate[
                    deviceDetail?.paymentType as DevicePayment
                  ]
                }
                triggerClassName="lg:rounded-[12px] rounded-[8px] justify-between"
              />
            </div>
          </>
        )}
        <ModalButton
          buttonText="수정"
          isSubmitted={isSubmitted}
          onAction={() =>
            submitHandler(form.getValues(), { storeId, deviceId })
          }
        />
      </form>
    </Form>
  );
}
