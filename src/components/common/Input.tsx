import cn from "@/lib/utils";
import * as React from "react";

function Input({
  className,
  type,
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
        "bg-transparent px-3 py-2.5 text-[13px] outline-none placeholder:text-gray-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-gray-300 disabled:placeholder:text-gray-400",
        "h-9 rounded-[8px] md:h-9 md:pr-4 md:pl-4 md:text-[13px] lg:h-12 lg:rounded-[12px] lg:py-3 lg:pr-3 lg:pl-4 lg:text-sm lg:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export default Input;
