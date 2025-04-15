import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cn from "@/lib/utils";
import { Button, ButtonColors, buttonVariants } from "./Button";

type ButtonSize = "sm" | "md" | "lg" | "xl";
type ScreenSize = "sm" | "md" | "lg";

interface IProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * - `buttonSize`: 버튼 사이즈
   * - `className`: 해당 버튼 사이즈에 대한 추가적인 스타일 적용 (옵션)
   * - Example: `sm: { buttonSize: 'md', className: '...' }`
   */
  responsiveButtons: Partial<
    Record<ScreenSize, { buttonSize: ButtonSize; className?: string }>
  >;
  /**
   * - 전체 사이즈에 적용되는 공통 스타일
   */
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
  const buttonStyle = (size: ButtonSize) => {
    switch (size) {
      case "sm":
        return "button-sm";
      case "md":
        return "button-md";
      case "lg":
        return "button-lg";
      case "xl":
        return "button-xl";
      default:
        throw new Error("존재하지 않는 버튼 사이즈입니다.");
    }
  };

  return (
    <>
      {Object.keys(responsiveButtons).map((screenSize) => {
        const buttonProps = responsiveButtons[screenSize as ScreenSize];
        return (
          <Button
            key={screenSize}
            variant={variant}
            color={color as keyof ButtonColors}
            className={cn(
              buttonStyle(buttonProps?.buttonSize!),
              buttonProps?.className,
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
        );
      })}
    </>
  );
}
