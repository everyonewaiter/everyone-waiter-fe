import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cn from "@/lib/utils";
import { Button, ButtonColors, buttonVariants } from "./Button";

type ButtonSize = "button-sm" | "button-md" | "button-lg" | "button-xl";
type ScreenSize = "sm" | "md" | "lg";

interface IProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  responsiveButtons: Partial<
    Record<ScreenSize, { buttonSize: ButtonSize; className?: string }>
  >;
  commonClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  color?: string;
}

export default function ResponsiveButton({
  responsiveButtons,
  commonClassName,
  variant,
  children,
  color,
  ...props
}: PropsWithChildren<IProps>) {
  return (
    <>
      {Object.keys(responsiveButtons).map((screenSize) => (
        <Button
          key={screenSize}
          variant={variant}
          color={color as keyof ButtonColors}
          className={cn(
            responsiveButtons[screenSize as ScreenSize]?.buttonSize,
            responsiveButtons[screenSize as ScreenSize]?.className,
            commonClassName,
            {
              sm: "block md:hidden",
              md: "hidden md:block lg:hidden",
              lg: "hidden lg:block",
            }[screenSize]
          )}
          {...props}
        >
          {children}
        </Button>
      ))}
    </>
  );
}
