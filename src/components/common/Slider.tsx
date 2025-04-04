"use client";

import cn from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative my-10 flex w-full touch-none items-center select-none",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="rounded-10 relative h-2 w-full grow overflow-hidden bg-[#2374FF08]">
      <SliderPrimitive.Range className="bg-primary absolute h-full rounded-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="bg-primary focus-visible:ring-ring block h-6 w-6 rounded-full border-4 border-white transition-colors outline-none disabled:pointer-events-none" />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
