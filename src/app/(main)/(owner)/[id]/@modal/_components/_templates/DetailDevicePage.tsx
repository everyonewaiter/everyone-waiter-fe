"use client";

import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import { deviceTranslate, paymentTimeTranslate } from "@/constants/translates";
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

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
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
              if (
                selected?.[0] === "TABLE" &&
                (form.getValues("tableNo") === "0" ||
                  form.getValues("tableNo") === "")
              ) {
                form.setError("tableNo", {
                  message: "테이블 번호를 1 이상으로 변경해주세요.",
                });
              } else {
                form.clearErrors("tableNo");
              }
              form.setValue("purpose", selected?.[0] as DevicePurpose, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            defaultText={
              deviceTranslate[
                deviceDetail?.purpose as keyof typeof deviceTranslate
              ] || "전체"
            }
            triggerClassName="lg:rounded-xl rounded-lg justify-between"
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
                    form.setValue("paymentType", selected[0] as DevicePayment, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }
                }}
                defaultText={
                  paymentTimeTranslate[
                    deviceDetail?.paymentType as DevicePayment
                  ]
                }
                triggerClassName="lg:rounded-xl rounded-lg justify-between"
              />
            </div>
          </>
        )}
        <ModalButton
          buttonText="수정"
          isSubmitted={isSubmitted}
          type="submit"
          onAction={() =>
            submitHandler(form.getValues(), { storeId, deviceId })
          }
          disabled={
            !form.formState.isDirty ||
            !!form.formState.errors.name ||
            !!form.formState.errors.tableNo ||
            !!form.formState.errors.deviceNumber
          }
        />
      </div>
    </Form>
  );
}
