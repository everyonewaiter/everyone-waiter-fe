"use client";

import cn from "@/shared/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import { Circle } from "lucide-react";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const radioVariants = cva(
  "focus-visible:ring-ring aspect-square h-[18px] w-[18px] rounded-full border focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-gray-400 hover:border-primary data-[state=checked]:border-primary",
        focused: "border-primary stroke-gray-700 stroke-2",
        disabled:
          "border-gray-400 bg-gray-600 data[state=checked]:bg-point cursor-not-allowed",
        error: "border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>((props, ref) => (
  <RadioGroupPrimitive.Root
    className={cn("grid gap-2", props.className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

type RadioGroupItemProps = ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> & {
  variant?: "default" | "focused" | "error" | "disabled";
};

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant = "default", ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    disabled={props.disabled || variant === "disabled"}
    className={cn(radioVariants({ variant }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="fill-primary h-[10px] w-[10px] stroke-none" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
