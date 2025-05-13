import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import { stateObj } from "@/constants/permissionObj";
import transformDate from "@/lib/formatting/transformDate";
import { TValueOf } from "@/types/common";
import { useForm } from "react-hook-form";
import Label from "@/components/common/Label";
import Dropdown from "@/components/common/Dropdown";
import useDevice from "../_hooks/useDevice";

const paymentObj = {
  BEFORE: "선결제",
  AFTER: "후결제",
};

const devicePermissionObj = {
  HALL: "홀",
  POS: "포스",
  WAITING: "웨이팅",
} as const;

interface FormType {
  deviceName: string;
  createdAt: string;
  status: TValueOf<typeof stateObj>;
  permission: TValueOf<typeof devicePermissionObj>;
  tableNo: number | null;
  payment: TValueOf<typeof paymentObj>;
  deviceNumber: string;
}

interface IProps {
  deviceId: bigint;
  close: () => void;
}

export default function DeviceInfoModal({ close, deviceId }: IProps) {
  const { useGetDeviceDetailQuery } = useDevice();
  const { data } = useGetDeviceDetailQuery(deviceId);

  const form = useForm<FormType>({
    defaultValues: {
      deviceName: data.name,
      createdAt: transformDate(data.createdAt),
      status: stateObj[data.state as TStatus],
      permission: data.purpose,
      tableNo: data.tableNo,
      payment: paymentObj[data.payment as keyof typeof paymentObj],
      deviceNumber: data.deviceNumber,
    },
  });

  return (
    <ModalWithTitle onClose={close} title="기기 정보" preventOutsideClose>
      <ModalWithTitle.Layout className="mb-6 !h-[333px] lg:!h-auto">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <LabeledInput form={form} name="deviceName" label="기기 이름" />
            <LabeledInput
              form={form}
              name="createdAt"
              label="등록일시"
              disabled
              labelDisabled
            />
            <LabeledInput
              form={form}
              name="status"
              label="상태"
              disabled
              labelDisabled
            />
            <div className="flex flex-col gap-2">
              <Label>권한</Label>
              <Dropdown
                data={Object.keys(devicePermissionObj)}
                active={form.watch("permission")}
                setActive={(value) => {
                  const eng =
                    devicePermissionObj[
                      value as keyof typeof devicePermissionObj
                    ];

                  form.setValue("permission", eng);
                }}
                defaultText={
                  devicePermissionObj[
                    data.purpose as keyof typeof devicePermissionObj
                  ]
                }
                triggerClassName="w-full h-10 lg:h-12 rounded-[8px] lg:rounded-[12px] text-sm lg:text-[15px] md:font-regular"
                className="md:!w-[348px] lg:!w-[476px]"
              />
            </div>
            {data.permission === "HALL" && (
              <>
                <LabeledInput form={form} name="tableNo" label="테이블 번호" />
                <LabeledInput form={form} name="payment" label="결제 방식" />
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
        saveBtn={{ text: "저장", onClick: () => {}, disabled: false }}
      />
    </ModalWithTitle>
  );
}
