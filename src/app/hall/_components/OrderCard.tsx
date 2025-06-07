import Button from "@/components/common/Button/Button";
import cn from "@/lib/utils";
import { PlusIcon } from "lucide-react";

interface IProps {
  completed: boolean;
}

export default function OrderCard({ completed }: IProps) {
  return (
    <div
      className={cn(
        "flex w-[320px] flex-col gap-6 rounded-[24px] border border-gray-600 p-6",
        completed ? "h-[245px]" : "h-[279px]"
      )}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <strong className="text-2xl font-semibold text-gray-100">
            스노우치즈폭립
          </strong>
          <span className="text-xl font-semibold text-gray-100">1개</span>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-center justify-between font-medium text-[#2E7BB3]">
            <span className="flex items-center text-base">
              <PlusIcon size={16} className="mr-1 ml-0.5" strokeWidth={1} />
              매운맛
            </span>
            <span className="text-[15px]">1개</span>
          </div>
        </div>
      </div>
      {!completed && (
        <Button
          variant="outline"
          color="black"
          className="button-lg w-full !border-gray-200 text-lg !font-medium text-gray-200"
        >
          완료
        </Button>
      )}
    </div>
  );
}
