import * as React from "react";
import cn from "@/lib/utils";

function Input({
  className,
  type,
  value = "",
  onChange,
  hasError,
  ...props
}: React.ComponentProps<"input"> & { hasError?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "md:text-s text-s flex w-full min-w-0 border",
        hasError ? "border-status-error" : "border-gray-600",
        "text-s bg-transparent px-3 py-2.5 outline-none placeholder:text-gray-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-gray-300 disabled:placeholder:text-gray-400",
        "md:text-s h-9 rounded-lg text-sm md:h-9 md:pr-4 md:pl-4 lg:h-12 lg:rounded-xl lg:py-3 lg:pr-3 lg:pl-4 lg:text-[15px]",
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export default Input;
