import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  color?: string;
}

export default function SubmitButton(props: IProps) {
  return (
    <ResponsiveButton
      responsiveButtons={{
        sm: {
          buttonSize: "sm",
          className: "!flex md:!hidden mt-6 !h-[34px] !gap-2 items-center",
        },
        md: {
          buttonSize: "sm",
          className: "!h-[34px] md:!flex items-center hidden lg:hidden !gap-1",
        },
        lg: {
          buttonSize: "lg",
          className: "hidden lg:!flex mt-8",
        },
      }}
      {...props}
    />
  );
}
