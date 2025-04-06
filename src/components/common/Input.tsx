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
        "md:text-s sm:text-s flex h-10 w-full min-w-0 rounded-md border",
        hasError ? "border-status-error" : "border-gray-600",
        "bg-transparent px-3 py-2.5 text-[13px] outline-none placeholder:text-gray-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:placeholder:text-gray-400",
        "sm:h-9 sm:rounded-[8px] sm:px-3 md:h-9 md:rounded-[8px] md:pr-4 md:pl-4 md:text-[13px] lg:h-12 lg:rounded-[12px] lg:py-3 lg:pr-3 lg:pl-4 lg:text-sm lg:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export default Input;
