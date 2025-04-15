import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useRef,
} from "react";
import useOutsideClick from "@/hooks/useOutSideClick";
import useEscapeKey from "@/hooks/useEscapeKey";
import { X as CloseIcon } from "lucide-react";
import ResponsiveButton from "../common/ResponsiveButton";

interface IProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  topRightComponent?: ReactNode;
}

export default function ModalWithTitle({
  onClose,
  children,
  title,
  topRightComponent,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div
        ref={ref}
        className="relative w-[320px] rounded-[30px] bg-white p-5 md:w-[364px] md:p-5 lg:w-[543px] lg:p-8"
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

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[362px] overflow-y-scroll md:h-87 lg:h-145">
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
          buttonSize: "button-xl",
          className: "!text-lg !font-semibold !h-14",
        },
        md: { buttonSize: "button-sm", className: "!h-10" },
        sm: { buttonSize: "button-sm", className: "!h-10" },
      }}
      color={props.color!}
      {...props}
    >
      {children}
    </ResponsiveButton>
  );
}

ModalWithTitle.Layout = Layout;
ModalWithTitle.Button = ModalButton;
