"use client";

import cn from "@/shared/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const checkboxVariants = cva(
  "h-[18px] w-[18px] shrink-0 rounded-[4px] border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed cursor-pointer bg-white fill-white data-[state=checked]:bg-primary",
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

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "ref"
> & {
  variant?: "default" | "focused" | "disabled" | "error";
};

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    disabled={props.disabled || variant === "disabled"}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <div className="h-4 w-4 pt-[2.5px] pl-[2.5px]">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33366 2.5L3.75033 7.08333L1.66699 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = "Checkbox";

export default Checkbox;
