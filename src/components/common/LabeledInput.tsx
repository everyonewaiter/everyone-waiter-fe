import { InputHTMLAttributes, ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import cn from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "./Form";
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
  containerClassName,
  ...props
}: IProps<T>) {
  const errorMessage = (form.formState.errors[name] as FieldError)?.message;

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex w-full flex-col gap-1", containerClassName)}
        >
          <FormLabel labelDisabled={props.disabled}>{label}</FormLabel>
          <div className="flex gap-3">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className={cn(
                  "flex grow-1 placeholder:text-gray-300",
                  inputClassname
                )}
                hasError={!!errorMessage}
                {...props}
                {...field}
              />
            </FormControl>
            {rightComponent?.(field)}
          </div>

          {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
          {defaultMessage && !errorMessage && (
            <FormDescription className="lg:text-s text-xs text-gray-400 md:text-xs">
              {defaultMessage}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
