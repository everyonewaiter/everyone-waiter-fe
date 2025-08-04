import {
  FormErrorMessage,
  FormField,
  FormItem,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import useOpenDaumPostcode from "@/hooks/useOpenDaumPostcode";
import formatBusinessNumber from "@/lib/formatting/formatBusinessNumber";
import formatDate from "@/lib/formatting/formatDate";
import { TypeStore } from "@/schema/store.schema";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  isUpdating: boolean;
  isAccepted: boolean;
}

export default function StoreApplyForm({ isUpdating, isAccepted }: IProps) {
  const form = useFormContext<TypeStore>();

  const { handleOpenAddress } = useOpenDaumPostcode(form);

  const handleBusinessNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");
    form.setValue("license", formatBusinessNumber(str));
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value.replace(/[^0-9]/g, "");

    form.setValue("createdAt", formatDate(str));
  };

  return (
    <div className="flex flex-col gap-4">
      <LabeledInput
        form={form}
        name="name"
        label="상호명"
        placeholder="상호명을 입력해주세요. (20자 이내)"
        disabled={!isUpdating || isAccepted}
      />
      <LabeledInput
        form={form}
        name="ceoName"
        label="대표지"
        placeholder="대표자명을 입력해주세요."
        disabled={!isUpdating || isAccepted}
      />
      <FormField
        control={form.control}
        name="license"
        render={({ field }) => (
          <FormItem>
            <div>
              <Label className="mb-2" disabled={!isUpdating || isAccepted}>
                사업자 번호
              </Label>
              <Input
                {...field}
                placeholder="사업자 번호를 입력해주세요."
                className="placeholder:text-gray-300"
                onChange={handleBusinessNumber}
                disabled={!isUpdating || isAccepted}
              />
            </div>
            <FormErrorMessage />
          </FormItem>
        )}
      />
      <LabeledInput
        form={form}
        name="address"
        label="소재지"
        placeholder="소재지를 입력해주세요."
        disabled={!isUpdating || isAccepted}
        onClick={() => (isUpdating && !isAccepted ? handleOpenAddress() : null)}
        className="cursor-pointer"
        readOnly={isUpdating}
      />
      <FormField
        control={form.control}
        name="createdAt"
        render={({ field }) => (
          <FormItem>
            <div>
              <Label className="mb-2" disabled={!isUpdating || isAccepted}>
                신청일
              </Label>
              <Input
                {...field}
                placeholder="신청일을 입력해주세요."
                className="placeholder:text-gray-300"
                onChange={handleDate}
                disabled={!isUpdating || isAccepted}
              />
            </div>
            <FormErrorMessage />
          </FormItem>
        )}
      />
      {!isAccepted && (
        <LabeledInput
          form={form}
          name="reason"
          label="반려 사유"
          disabled
          className={
            isUpdating
              ? ""
              : "!text-primary border-primary border !bg-[#F2202008] text-center"
          }
        />
      )}
    </div>
  );
}
