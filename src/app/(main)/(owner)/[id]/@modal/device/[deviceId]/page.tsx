"use client";

import { useParams } from "next/navigation";
import {
  deviceTranslate,
  paymentTimeTranslate,
  stateTranslate,
} from "@/constants/translates";
import { useForm } from "react-hook-form";
import getQueryClient from "@/app/get-query-client";
import Dropdown from "@/components/common/Dropdown";
import LabeledInput from "@/components/common/LabeledInput";
import Label from "@/components/common/Label";
import { Form } from "@/components/common/Form";
import { useEffect } from "react";
import useDevice from "../../../device/_hooks/useDevice";

export default function DeviceInfoModal() {
  const params = useParams();
  const storeId = params?.id as string;
  const deviceId = params?.deviceId as string;

  const { useGetDeviceDetailQuery, mutateUpdateDevice } = useDevice();
  const { data } = useGetDeviceDetailQuery(deviceId, storeId);

  const queryClient = getQueryClient();

  const form = useForm<
    Omit<Device, "updatedAt" | "storeId" | "deviceId"> & {
      deviceNumber: string;
      tableNo: number;
      createdAt: string;
    }
  >({
    defaultValues: {
      name: "",
      createdAt: "",
      state: "",
      purpose: "HALL",
      paymentType: "POSTPAID",
      tableNo: 0,
      deviceNumber: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        state: stateTranslate[data?.state as keyof typeof stateTranslate],
        deviceNumber: data?.ksnetDeviceNo,
        tableNo: data?.tableNo,
        createdAt: data?.createdAt,
      });
    }
  }, [form, data]);

  const submitHandler = () => {
    mutateUpdateDevice.mutate(
      {
        name: form.watch("name"),
        purpose: form.watch("purpose") as DevicePurpose,
        paymentType: form.watch("paymentType") as DevicePayment,
        tableNo: form.watch("tableNo") ?? 0,
        ksnetDeviceNo: form.watch("deviceNumber"),
        storeId,
        deviceId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get-devices"] });
        },
        onError: (e) => {
          const res = (e as any).response.data;
          if (
            ["ALREADY_USE_DEVICE_NAME", "DEVICE_NOT_FOUND"].includes(res.code)
          ) {
            form.setError("name", res.message);
          }
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <LabeledInput form={form} name="name" label="기기 이름" />
        <LabeledInput
          form={form}
          name="createdAt"
          label="등록일시"
          disabled
          labelDisabled
        />
        <LabeledInput
          form={form}
          name="state"
          label="상태"
          disabled
          labelDisabled
        />
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
              deviceTranslate[data?.purpose as keyof typeof deviceTranslate]
            }
            triggerClassName="w-full h-10 lg:h-12 rounded-[8px] lg:rounded-[12px] text-sm lg:text-[15px] md:font-regular"
            className="md:!w-[348px] lg:!w-[476px]"
          />
        </div>
        {data?.purpose === "HALL" && (
          <>
            <LabeledInput form={form} name="tableNo" label="테이블 번호" />
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
      </form>
    </Form>
  );
}
