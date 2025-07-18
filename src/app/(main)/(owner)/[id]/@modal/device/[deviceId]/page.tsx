"use client";

import { useParams } from "next/navigation";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import { deviceTranslate, paymentTimeTranslate } from "@/constants/translates";
import { useStoreContext } from "@/providers/storeProvider";
import SkeletonGroup from "@/components/common/Skeleton/SkeletonGroup";
import { deviceQueries } from "../../../device/_queries/useDevice";
import ModalButton from "../../_components/ModalButton";
import useDeviceForm from "../../_hooks/useDeviceForm";

export default function DeviceInfoModal() {
  const params = useParams();
  const deviceId = params?.deviceId as string;

  const { storeId } = useStoreContext();

  const { data } = deviceQueries.useDetails(deviceId, storeId);
  const update = deviceQueries.useUpdateDevice();

  const { form, submitHandler } = useDeviceForm(data);

  const handleSubmit = () => {
    submitHandler(update, storeId, deviceId);
  };

  if (!data)
    return (
      <div className="flex h-[288px] flex-col gap-3.5 md:h-[324px] lg:h-[488px]">
        <SkeletonGroup />
      </div>
    );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <LabeledInput form={form} name="name" label="기기 이름" />
        <LabeledInput form={form} name="createdAt" label="등록일시" disabled />
        <LabeledInput form={form} name="state" label="상태" disabled />
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
              deviceTranslate[data?.purpose as keyof typeof deviceTranslate] ||
              "전체"
            }
            triggerClassName="w-full h-10 lg:h-12 rounded-[8px] lg:rounded-[12px] text-sm lg:text-[15px] md:font-regular"
            className="md:!w-[348px] lg:!w-[476px]"
          />
        </div>
        {["HALL", "TABLE"].includes(form.watch("purpose")) && (
          <LabeledInput form={form} name="tableNo" label="테이블 번호" />
        )}

        {(form.watch("purpose") === "HALL" ||
          form.watch("purpose") === "TABLE") && (
          <>
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
                  paymentTimeTranslate[data?.paymentType as DevicePayment]
                }
                triggerClassName="w-full h-10 lg:h-12 rounded-[8px] lg:rounded-[12px] text-sm lg:text-[15px] md:font-regular"
                className="md:!w-[348px] lg:!w-[476px]"
              />
            </div>
            <LabeledInput form={form} name="deviceNumber" label="단말기 번호" />
          </>
        )}
        <ModalButton buttonText="수정" type="submit" />
      </form>
    </Form>
  );
}
