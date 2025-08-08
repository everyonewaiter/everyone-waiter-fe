import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormErrorMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Spinner from "@/components/common/Spinner";
import { TypeDeviceStep1Form } from "../_schema/device.schema";

interface Props {
  control: any;
  onClick: () => void;
  authTime: number;
  isSubmitted: boolean;
  disabled: boolean;
  loading: boolean;
}

export default function AuthInput({
  control,
  authTime,
  onClick,
  isSubmitted,
  disabled,
  loading,
}: Props) {
  const form = useFormContext<TypeDeviceStep1Form>();

  return (
    <FormField
      control={control}
      name="authNumber"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row gap-3">
            <div className="relative w-full">
              {isSubmitted && authTime && (
                <div className="font-regular md:text-s absolute top-1/2 -translate-y-1/2 transform pt-1 text-right text-gray-200 transition-all duration-300 ease-in-out sm:right-25 sm:mt-[-2px] md:right-4 lg:text-[15px]">
                  {`${String(Math.floor(authTime / 60)).padStart(2, "0")}:${String(authTime % 60).padStart(2, "0")}`}
                </div>
              )}
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (typeof value === "string" && value.length <= 6) {
                      form.setValue("authNumber", value);
                    }
                  }}
                  placeholder="인증 번호를 입력해주세요."
                  className="cursor-pointer placeholder:text-gray-300"
                />
              </FormControl>
            </div>

            <ResponsiveButton
              type="button"
              color="black"
              disabled={disabled}
              onClick={onClick}
              responsiveButtons={{
                sm: { buttonSize: "sm", className: "!px-[27px]" },
                md: { buttonSize: "sm", className: "w-[94px]" },
                lg: { buttonSize: "lg", className: "w-[120px]" },
              }}
            >
              {loading && isSubmitted ? <Spinner /> : "확인"}
            </ResponsiveButton>
          </div>
          <FormErrorMessage />
        </FormItem>
      )}
    />
  );
}
