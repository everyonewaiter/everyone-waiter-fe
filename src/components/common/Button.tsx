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
        primary: "bg-primary !text-white hover:bg-point",
        black: "bg-gray-0 !text-white",
        grey: "bg-gray-700 text-gray-300",
        "outline-primary": "border-primary !text-primary",
        "outline-black": "border-gray-200 !text-gray-200",
        "outline-gray": "border-gray-500 !text-gray-200",
        accepted: "bg-gray-400 !text-white",
        rejected: "bg-[#FF5555] !text-white",
        succeed: "bg-[#2E8CFF] !text-white",
        "re-accepted": "bg-[#FFAB45] !text-white",
      },
      size: {},
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
    },
  }
);

export type ButtonColors = Pick<
  VariantProps<typeof buttonVariants>,
  "color"
> | null;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color = "primary",
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            color: disabled ? "grey" : color,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        {...(asChild ? {} : { type: "button" })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
