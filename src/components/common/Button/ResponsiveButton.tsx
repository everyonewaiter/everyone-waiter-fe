import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cn from "@/lib/utils";
import { Button, ButtonColors, buttonVariants } from "./Button";

type ButtonSize = "sm" | "md" | "lg" | "xl" | "custom";
type ScreenSize = "sm" | "md" | "lg";

interface IProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * - `buttonSize`: 버튼 사이즈
   * - `className`: 해당 버튼 사이즈에 대한 추가적인 스타일 적용 (옵션)
   * - Example: `sm: { buttonSize: 'md', className: '...' }`
   */
  responsiveButtons: Partial<
    Record<
      ScreenSize,
      { buttonSize: ButtonSize; className?: string; color?: string }
    >
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
  const buttonStyle = (size: ButtonSize, className: string) => {
    switch (size) {
      case "sm":
        return `button-sm ${className}`;
      case "md":
        return `button-md ${className}`;
      case "lg":
        return `button-lg ${className}`;
      case "xl":
        return `button-xl ${className}`;
      case "custom":
        return className;
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
            color={(color || buttonProps?.color) as keyof ButtonColors}
            className={cn(
              screenSize === "sm" && buttonProps ? "flex md:hidden" : "hidden",
              screenSize === "md" && buttonProps
                ? "hidden md:flex lg:!hidden"
                : "hidden",
              screenSize === "lg" && buttonProps ? "hidden lg:!flex" : "hidden",
              buttonStyle(
                buttonProps?.buttonSize ?? "md",
                buttonProps?.className ?? ""
              ),
              commonClassName
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
