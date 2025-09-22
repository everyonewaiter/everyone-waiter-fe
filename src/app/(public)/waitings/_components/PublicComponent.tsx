import Logo from "@/components/Logo";
import { PropsWithChildren, ReactNode } from "react";

interface IProps {
  title: ReactNode | string;
  subtitle?: string;
}

export default function PublicComponent({
  title,
  subtitle,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <div className="center flex w-full flex-col gap-8">
      <Logo width={100} height={100} />
      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-0 text-center text-[28px] font-bold whitespace-pre-line">
            {title}
          </h1>
          <span className="font-regular text-center text-sm whitespace-pre-line text-gray-300">
            {subtitle}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
