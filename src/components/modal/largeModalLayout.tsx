import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useRef,
} from "react";
import useOutsideClick from "@/hooks/useOutSideClick";
import useEscapeKey from "@/hooks/useEscapeKey";
import { X as CloseIcon } from "lucide-react";
import cn from "@/lib/utils";
import ResponsiveButton from "../common/ResponsiveButton";

interface IProps {
  onClose: () => void;
  title: ReactNode | string;
  topRightComponent?: ReactNode;
  className?: string;
  preventOutsideClose?: boolean;
}

export default function ModalWithTitle({
  onClose,
  children,
  title,
  topRightComponent,
  className,
  preventOutsideClose,
}: PropsWithChildren<IProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref,
    handler: () => {
      if (!preventOutsideClose) {
        onClose();
      }
    },
  });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div
        ref={ref}
        className={cn(
          "relative h-fit w-[320px] rounded-[30px] bg-white p-5 md:w-[364px] md:p-5 lg:w-[543px] lg:p-8",
          className
        )}
      >
        <div className="flex items-center justify-between pb-6 md:pb-5 lg:pb-8">
          <h1 className="text-gray-0 font-semibold md:text-base lg:text-2xl">
            {title}
          </h1>
          {topRightComponent || (
            <button type="button" onClick={onClose}>
              <CloseIcon
                width={32}
                height={32}
                color="#222"
                className="h-6 w-6 lg:h-8 lg:w-8"
              />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

function Layout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "min-h-[362px] overflow-y-scroll md:h-87 lg:h-145",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color?: string;
  onClick: () => void;
  type?: "submit" | "button";
}

function ModalButton({ children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <ResponsiveButton
      responsiveButtons={{
        lg: {
          buttonSize: "xl",
          className: "!text-lg !font-semibold !h-14 !w-full",
        },
        md: { buttonSize: "sm", className: "!h-10 !w-full" },
        sm: { buttonSize: "sm", className: "!h-10 !w-full" },
      }}
      color={props.color!}
      {...props}
    >
      {children}
    </ResponsiveButton>
  );
}

interface ButtonGroupProps {
  cancelBtn: {
    text: string;
    onClick: () => void;
    disabled: boolean;
  };
  saveBtn: {
    text: string;
    onClick: () => void;
    disabled: boolean;
  };
}

function ModalButtonGroups({ cancelBtn, saveBtn }: ButtonGroupProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-2 lg:gap-3">
      <ResponsiveButton
        color="grey"
        responsiveButtons={{
          lg: {
            buttonSize: "xl",
            className: "!text-lg !font-semibold !h-14 !w-[140px]",
          },
          md: { buttonSize: "sm", className: "!h-9 !w-[90px]" },
          sm: { buttonSize: "sm", className: "!h-10 !w-[100px]" },
        }}
        onClick={cancelBtn.onClick}
        disabled={cancelBtn.disabled}
      >
        {cancelBtn.text}
      </ResponsiveButton>
      <ResponsiveButton
        color="primary"
        responsiveButtons={{
          lg: {
            buttonSize: "xl",
            className: "!text-lg !font-semibold !h-14",
          },
          md: { buttonSize: "sm", className: "!h-10" },
          sm: { buttonSize: "sm", className: "!h-10" },
        }}
        commonClassName="!w-full"
        onClick={saveBtn.onClick}
        disabled={saveBtn.disabled}
      >
        {saveBtn.text}
      </ResponsiveButton>
    </div>
  );
}

ModalWithTitle.Layout = Layout;
ModalWithTitle.Button = ModalButton;
ModalWithTitle.ButtonGroup = ModalButtonGroups;
