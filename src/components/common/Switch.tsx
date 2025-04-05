"use client";

import cn from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:border-primary inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer items-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed data-[state=checked]:bg-white disabled:data-[state=checked]:border-transparent disabled:data-[state=checked]:bg-[#F2202030] data-[state=unchecked]:border-gray-600 data-[state=unchecked]:bg-gray-600",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full ring-0 transition-transform",
        "data-[state=checked]:translate-x-6.5 data-[state=unchecked]:translate-x-1",
        "bg-white",
        "data-[state=checked]:bg-primary",
        "data-[disabled]:data-[state=checked]:bg-white"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
