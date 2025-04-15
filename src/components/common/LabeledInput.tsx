import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { Info } from "lucide-react";
import { InputHTMLAttributes, ReactNode } from "react";
import cn from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";
import Input from "./Input";

interface IProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<T>;
  name: Path<T>;
  type?: string;
  label: string;
  placeholder?: string;
  defaultMessage?: string;
  rightComponent?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
  inputClassname?: string;
  labelDisabled?: boolean;
  containerClassName?: string;
}

export default function LabeledInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  defaultMessage,
  rightComponent,
  inputClassname,
  type = "text",
  labelDisabled,
  containerClassName,
  ...props
}: IProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex w-full flex-col gap-1", containerClassName)}
        >
          <FormLabel labelDisabled={labelDisabled!}>{label}</FormLabel>
          <div className="flex gap-3">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className={cn(
                  "flex grow-1 placeholder:text-gray-300",
                  inputClassname
                )}
                hasError={!!form.formState.errors[name]?.message}
                {...props}
                {...field}
              />
            </FormControl>
            {rightComponent?.(field)}
          </div>

          {form.formState.errors[name]?.message && (
            <div className="lg:text-s text-status-error flex items-center gap-1 text-xs md:text-xs">
              <Info className="stroke-error mb-[1px] h-4 w-4" />
              {(form.formState.errors[name] as FieldError).message}
            </div>
          )}
          {defaultMessage && !form.formState.errors[name]?.message && (
            <FormDescription className="lg:text-s text-xs text-gray-400 md:text-xs">
              {defaultMessage}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
