import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import transformDate from "@/lib/formatting/transformDate";
import { useForm } from "react-hook-form";
import Label from "@/components/common/Label";
import Dropdown from "@/components/common/Dropdown";
import useStoreId from "@/hooks/store/useStoreId";
import { useEffect } from "react";
import getQueryClient from "@/app/get-query-client";
import useDevice from "../_hooks/useDevice";

const paymentObj: Record<TDevicePayment, string> = {
  PREPAID: "선결제",
  POSTPAID: "후결제",
};

const devicePermissionObj: Record<TDevicePurpose, string> = {
  HALL: "홀",
  POS: "POS",
  WAITING: "웨이팅",
} as const;

interface FormType {
  name: string;
  createdAt: string;
  state: TStatus;
  purpose: TDevicePurpose;
  tableNo: number;
  paymentType: TDevicePayment;
  deviceNumber: string;
}

interface IProps {
  deviceId: bigint;
  close: () => void;
}

export default function DeviceInfoModal({ close, deviceId }: IProps) {
  const { useGetDeviceDetailQuery, mutateUpdateDevice } = useDevice();
  const { data } = useGetDeviceDetailQuery(deviceId);

  const { storeId } = useStoreId();
  const queryClient = getQueryClient();

  const form = useForm<FormType>();

  useEffect(() => {
    if (data?.name) {
      form.reset({
        ...data,
        createdAt: transformDate(data.createdAt),
        deviceNumber: data.ksnetDeviceNo,
      });
    }
  }, [data]);

  const submitHandler = () => {
    mutateUpdateDevice.mutate(
      {
        name: form.watch("name"),
        purpose: form.watch("purpose") as TDevicePurpose,
        paymentType: form.watch("paymentType") as TDevicePayment,
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
                data={Object.values(devicePermissionObj)}
                active={
                  devicePermissionObj[form.watch("purpose") as TDevicePurpose]
                }
                setActive={(value) => {
                  const selected = Object.entries(devicePermissionObj).filter(
                    (el) => el[1] === value
                  );
                  form.setValue("purpose", selected[0][0] as TDevicePurpose);
                }}
                defaultText={
                  devicePermissionObj[data?.purpose as TDevicePurpose]
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
                    data={Object.values(paymentObj)}
                    active={
                      paymentObj[form.watch("paymentType") as TDevicePayment]
                    }
                    setActive={(value) => {
                      const selected = Object.entries(paymentObj).filter(
                        (el) => el[1] === value
                      );
                      form.setValue(
                        "paymentType",
                        selected[0][0] as TDevicePayment
                      );
                    }}
                    defaultText={
                      paymentObj[data?.paymentType as TDevicePayment]
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
