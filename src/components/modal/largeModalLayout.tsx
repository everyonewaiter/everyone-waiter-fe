import { ReactNode, useRef } from "react";
import useOutsideClick from "@/hooks/useOutSideClick";
import useEscapeKey from "@/hooks/useEscapeKey";
import { X as CloseIcon } from "lucide-react";

interface IProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  topRightComponent?: ReactNode;
  buttonComponent?: ReactNode;
}

export default function ModalWithTitle({
  onClose,
  children,
  title,
  topRightComponent,
  buttonComponent,
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
        <div className="flex items-center justify-between">
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
        <div className="md:l-87 md:mt-5 lg:mt-8 lg:h-145">{children}</div>
        {buttonComponent}
      </div>
    </div>
  );
}
