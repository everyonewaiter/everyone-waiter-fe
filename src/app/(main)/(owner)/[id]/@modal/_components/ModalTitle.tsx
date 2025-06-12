import cn from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface IProps {
  title: string;
  topRightComponent?: ReactNode;
  className?: string;
}

const ModalTitle = forwardRef<HTMLDivElement, IProps>(
  ({ title, topRightComponent, className }, ref) => (
    <div ref={ref} className={cn("bg-whit relative mb-6 h-fit", className)}>
      {title && (
        <div className="flex items-center justify-between pb-6 md:pb-5 lg:pb-8">
          <h1 className="text-gray-0 font-semibold md:text-base lg:text-2xl">
            {title}
          </h1>
          {topRightComponent && <div>{topRightComponent}</div>}
        </div>
      )}
    </div>
  )
);

export default ModalTitle;
