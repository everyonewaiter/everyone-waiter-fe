import LabeledInput from "@/components/common/LabeledInput";
import { TypeStoreInfo } from "@/schema/store.schema";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<TypeStoreInfo>;
}

export default function InfoFields({ form }: IProps) {
  return (
    <>
      <LabeledInput
        form={form}
        label="상호명"
        name="name"
        disabled
        labelDisabled
      />
      <LabeledInput
        form={form}
        label="사업자 번호"
        name="license"
        disabled
        labelDisabled
      />
      <LabeledInput
        form={form}
        label="주소"
        name="address"
        disabled
        labelDisabled
      />
    </>
  );
}
