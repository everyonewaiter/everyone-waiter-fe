import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import { TypeDeviceStep1Form } from "../_schema/device.schema";

interface Props {
  control: any;
  onClick: () => void;
  disabled: boolean;
  isSubmitted: boolean;
}

export default function PhoneInput({
  control,
  onClick,
  disabled,
  isSubmitted,
}: Props) {
  const form = useFormContext<TypeDeviceStep1Form>();

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>휴대폰 번호</FormLabel>
          <div className="flex gap-3">
            <FormControl>
              <Input
                {...field}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  const formatted = phoneNumberPattern(onlyNums);
                  form.setValue("phone", formatted, { shouldValidate: true });
                }}
                placeholder="사장님 계정에 등록된 전화번호를 입력해주세요."
                className="cursor-pointer placeholder:text-gray-300"
              />
            </FormControl>

            <ResponsiveButton
              type="button"
              variant="default"
              color="black"
              responsiveButtons={{
                sm: { buttonSize: "sm", className: "!w-[80px]" },
                md: { buttonSize: "sm", className: "w-[94px]" },
                lg: { buttonSize: "lg", className: "w-[120px]" },
              }}
              disabled={disabled}
              onClick={onClick}
            >
              {isSubmitted ? "재인증" : "인증요청"}
            </ResponsiveButton>
          </div>
          <FormErrorMessage />
        </FormItem>
      )}
    />
  );
}
