import { useParams } from "next/navigation";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import { deviceTranslate, paymentTimeTranslate } from "@/constants/translates";
import { useForm } from "react-hook-form";
import Label from "@/components/common/Label";
import Dropdown from "@/components/common/Dropdown";
import getQueryClient from "@/app/get-query-client";
import useDevice from "../_hooks/useDevice";

interface IProps {
  deviceId: string;
  close: () => void;
}

export default function DeviceInfoModal({ close, deviceId }: IProps) {
  const params = useParams();
  const storeId = params?.id as string;

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
      ...data,
      deviceNumber: data?.ksnetDeviceNo,
      tableNo: data?.tableNo,
      createdAt: data?.createdAt,
    },
  });

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
          close();
        },
        onError: (e) => {
          const res = (e as any).response.data;
          if (
            ["ALREADY_USE_DEVICE_NAME", "DEVICE_NOT_FOUND"].includes(res.code)
          ) {
            form.setError("name", res.message);
          }
          // TODO: 페이지 접근 자체에 대한 에러 처리 수정
          // if (res.code === "STORE_NOT_FOUND") {
          // console.error(e);
          // }
        },
      }
    );
  };

  return (
    <ModalWithTitle onClose={close} title="기기 정보" preventOutsideClose>
      <ModalWithTitle.Layout className="mb-6 !h-[333px] lg:!h-auto">
        <Form {...form}>
          <form className="flex flex-col gap-4">
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
                  deviceTranslate[data?.purpose as keyof typeof deviceTranslate]
                }
                setActive={(value) => {
                  const selected = Object.entries(deviceTranslate).find(
                    (el) => el[1] === value
                  );
                  if (selected) {
                    form.setValue("purpose", selected[0] as DevicePurpose);
                  }
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
                      const selected = Object.entries(
                        paymentTimeTranslate
                      ).find((el) => el[1] === value);
                      if (selected) {
                        form.setValue(
                          "paymentType",
                          selected[0] as DevicePayment
                        );
                      }
                    }}
                    defaultText={
                      paymentTimeTranslate[data?.paymentType as DevicePayment]
                    }
                    triggerClassName="w-full h-10 lg:h-12 rounded-[8px] lg:rounded-[12px] text-sm lg:text-[15px] md:font-regular"
                    className="md:!w-[348px] lg:!w-[476px]"
                  />
                </div>
                <LabeledInput
                  form={form}
                  name="deviceNumber"
                  label="단말기 번호"
                />
              </>
            )}
          </form>
        </Form>
      </ModalWithTitle.Layout>
      <ModalWithTitle.ButtonGroup
        cancelBtn={{
          text: "닫기",
          onClick: close,
          disabled: false,
        }}
        saveBtn={{ text: "저장", onClick: submitHandler, disabled: false }}
      />
    </ModalWithTitle>
  );
}
