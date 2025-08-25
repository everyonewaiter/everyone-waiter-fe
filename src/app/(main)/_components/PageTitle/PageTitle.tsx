import Spinner from "@/components/common/Spinner";
import cn from "@/lib/utils";
import dynamic from "next/dynamic";

const PopupButton = dynamic(() => import("./PopupButton"), {
  ssr: true,
  loading: () => <Spinner />,
});

interface IProps {
  initialTitle?: string;
  storeId?: string;
  className?: string;
}

export default function PageTitle({
  initialTitle,
  storeId,
  className,
}: IProps) {
  return (
    <div
      className={cn(
        "sticky right-0 left-0 mt-3 flex w-full flex-col gap-3 bg-white md:mt-0 md:gap-2 lg:gap-5",
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold md:text-base lg:text-[28px]">
          {initialTitle}
        </h1>
        <PopupButton storeId={storeId} />
      </div>
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
}
