"use client";

import cn from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

function Label({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { disabled?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:text-[13px]",
        disabled ? "text-gray-300" : "text-gray-0",
        className
      )}
      {...props}
    />
  );
}

export default Label;
