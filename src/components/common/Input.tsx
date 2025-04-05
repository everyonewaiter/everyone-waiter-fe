import cn from "@/lib/utils";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-md border border-gray-600 bg-transparent px-3 py-2.5 text-[13px] outline-none placeholder:text-gray-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:placeholder:text-gray-400 lg:py-3 lg:text-sm lg:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export default Input;
