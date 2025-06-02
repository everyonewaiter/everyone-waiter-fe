import cn from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import buttonVariants from "./styles";

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

export default Button;
