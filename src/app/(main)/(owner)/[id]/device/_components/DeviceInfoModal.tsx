import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import {
  deviceTranslate,
  paymentTimeTranslate,
  stateTranslate,
} from "@/constants/translates";
import transformDate from "@/lib/formatting/transformDate";
import { useForm } from "react-hook-form";

interface FormType {
  deviceName: string;
  createdAt: string;
  status: ValueOf<typeof stateTranslate>;
  permission: ValueOf<typeof deviceTranslate>;
  tableNo: number | null;
  payment: ValueOf<typeof paymentTimeTranslate>;
  deviceNumber: string;
}

const dummy = {
  deviceName: "테이블",
  createdAt: "2025-05-05 09:00:00",
  status: "ACTIVE",
  permission: "TABLE",
  tableNo: 1,
  payment: "BEFORE",
  deviceNumber: "12345a",
};

interface IProps {
  deviceId: string;
  close: () => void;
}

export default function DeviceInfoModal({ close }: IProps) {
  const form = useForm<FormType>({
    defaultValues: {
      deviceName: dummy.deviceName,
      createdAt: transformDate(dummy.createdAt),
      status: stateTranslate[dummy.status as Status],
      permission:
        deviceTranslate[dummy.permission as keyof typeof deviceTranslate],
      tableNo: dummy.tableNo,
      payment:
        paymentTimeTranslate[
          dummy.payment as keyof typeof paymentTimeTranslate
        ],
      deviceNumber: dummy.deviceNumber,
    },
  });

  return (
    <ModalWithTitle onClose={close} title="기기 정보">
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
            <LabeledInput form={form} name="permission" label="권한" />
            {dummy.permission === "TABLE" && (
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
