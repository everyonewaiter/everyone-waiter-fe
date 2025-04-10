import cn from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        outline: "border",
        default: "",
      },
      color: {
        primary: "bg-primary text-white hover:bg-point",
        black: "bg-gray-0 text-white",
        grey: "bg-gray-700 text-gray-300",
        "outline-primary": "border-primary !text-primary",
        "outline-black": "border-gray-200 !text-gray-200",
        "outline-gray": "border-gray-500 !text-gray-200",
      },
      size: {
        sm: "px-[16px] h-[36px] rounded-[8px] text-s font-medium",
        md: "px-[24px] h-[44px] rounded-[8px] text-sm font-medium",
        lg: "px-[24px] h-[48px] rounded-[12px] text-[15px] font-semibold",
        xl: "px-[32px] h-[56px] rounded-[12px] text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color:
    | "primary"
    | "black"
    | "grey"
    | "outline-primary"
    | "outline-black"
    | "outline-gray";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, color, disabled, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            color: disabled ? "grey" : color,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
