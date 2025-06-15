import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import cn from "@/lib/utils";
import Button, { ButtonColors } from "./Button";
import buttonVariants from "./styles";

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
      {
        buttonSize: ButtonSize;
        className?: string;
        color?: string;
        variant?: string;
      }
    >
  >;
  /**
   * - 전체 사이즈에 적용되는 공통 스타일
   */
  commonClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  color?: string;
}

const ResponsiveButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IProps>
>(
  (
    { responsiveButtons, commonClassName, variant, children, color, ...props },
    ref
  ) => {
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

    const getClassName = (screenSize: ScreenSize) => {
      let buttonClassName = "hidden";

      if (screenSize === "sm") {
        buttonClassName = "flex md:hidden";
      } else if (screenSize === "md") {
        buttonClassName = "hidden md:flex lg:!hidden";
      } else if (screenSize === "lg") {
        buttonClassName = "hidden lg:!flex";
      }

      return buttonClassName;
    };

    return (
      <>
        {Object.keys(responsiveButtons).map((screenSize) => {
          const buttonProps = responsiveButtons[screenSize as ScreenSize];
          return (
            <Button
              key={screenSize}
              ref={ref}
              variant={
                (variant || buttonProps?.variant) as VariantProps<
                  typeof buttonVariants
                >["variant"]
              }
              color={(color || buttonProps?.color) as keyof ButtonColors}
              className={cn(
                getClassName(screenSize as ScreenSize),
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
);

ResponsiveButton.displayName = "ResponsiveButton";

export default ResponsiveButton;
