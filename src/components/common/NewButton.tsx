import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import cn from "@/lib/utils";
import * as React from "react";

const newButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 disabled:cursor-not-allowed ",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-[#F24F4F] disabled:bg-[#F5F5F5] disabled:text-gray-300",
        black:
          "bg-black text-white disabled:bg-[#F5F5F5] disabled:text-gray-300",
        "outline-primary":
          "border-primary border text-primary hover:border-[#F22020] hover:border-[#F22020]",
        "outline-black":
          "border-gray-200 border text-gray-200 disabled:border-gray-500",
      },
      size: {
        xs: "text-[13px] px-4 py-2 font-normal",
        sm: "text-sm px-6 py-[11.5px]",
        md: "text-[15px] px-6 py-[12.5px]",
        lg: "text-lg px-8 py-[14.5px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof newButtonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(newButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, newButtonVariants };
