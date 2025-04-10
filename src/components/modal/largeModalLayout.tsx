import { ReactNode, useRef } from "react";
import useOutsideClick from "@/hooks/useOutSideClick";
import useEscapeKey from "@/hooks/useEscapeKey";
import { X as CloseIcon } from "lucide-react";
import { Button } from "../common/Button";

interface IProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  topRightComponent?: ReactNode;
  button: {
    text: string;
    onClick: () => void;
  };
}

export default function LargeModal({
  onClose,
  children,
  title,
  topRightComponent,
  button,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div
        ref={ref}
        className="relative rounded-[30px] bg-white lg:w-[543px] lg:p-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-gray-0 text-2xl font-semibold">{title}</h1>
          {topRightComponent || (
            <button type="button" onClick={onClose}>
              <CloseIcon width={32} height={32} color="#222" />
            </button>
          )}
        </div>
        <div className="mt-8 h-139 overflow-y-scroll">{children}</div>
        <Button
          className="w-full"
          color="black"
          size="lg"
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      </div>
    </div>
  );
}
