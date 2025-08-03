import Spinner from "@/components/common/Spinner";
import dynamic from "next/dynamic";

const PopupButton = dynamic(() => import("./PopupButton"), {
  ssr: true,
  loading: () => <Spinner />,
});

interface IProps {
  initialTitle?: string;
  storeId: string;
}

export default function PageTitle({ initialTitle, storeId }: IProps) {
  return (
    <div className="sticky right-0 left-0 z-50 flex w-full flex-col gap-3 bg-white pt-5 md:gap-2 md:pt-0 lg:gap-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[18px] font-bold md:text-[16px] lg:text-[28px]">
          {initialTitle}
        </h1>
        <PopupButton storeId={storeId} />
      </div>
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
}
