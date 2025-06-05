import Icon from "@/components/common/Icon";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface IProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  iconKey: string;
  color?: string;
  variant?: "default" | "outline";
  className?: string;
  text: string;
}

export default function ActionButton({
  iconKey,
  children,
  color,
  variant = "default",
  className,
  text,
  ...props
}: PropsWithChildren<IProps>) {
  return (
    <ResponsiveButton
      responsiveButtons={{
        lg: {
          buttonSize: "custom",
          className:
            "flex h-30 w-30 flex-col justify-center gap-[2px] rounded-[20px]",
        },
      }}
      color={color}
      variant={variant}
      {...props}
    >
      <Icon iconKey={iconKey} size={40} className={className} />
      <div className="flex flex-col gap-1">
        <strong className="text-xl font-semibold">{text}</strong>
        {children}
      </div>
    </ResponsiveButton>
  );
}
