import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import { useFormContext } from "react-hook-form";
import { TypeSettingsOptionForm } from "../_schema/settings.schema";

interface IProps {
  onAction: (value: string) => void;
}

export default function OrderForm({ onAction }: IProps) {
  const form = useFormContext<TypeSettingsOptionForm>();

  const handleAddOptionText = () => {
    const value = form.getValues("optionText");
    if (value.trim()) {
      onAction(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name="optionText"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-[6px]">
            <FormControl>
              <Input
                className="!h-9 w-full !rounded-[10px] placeholder:text-xs"
                placeholder="옵션명을 입력해주세요."
                {...field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddOptionText();
                  }
                }}
              />
            </FormControl>

            <ResponsiveButton
              type="button"
              color="black"
              onClick={handleAddOptionText}
              responsiveButtons={{
                lg: {
                  buttonSize: "sm",
                  className: "relative gap-0 !w-[71px]",
                },
                md: {
                  buttonSize: "sm",
                  className: "flex",
                },
                sm: {
                  buttonSize: "sm",
                  className: "flex",
                },
              }}
            >
              추가
            </ResponsiveButton>
          </div>
          <FormErrorMessage className="mb-[1.5px]" />
        </FormItem>
      )}
    />
  );
}
