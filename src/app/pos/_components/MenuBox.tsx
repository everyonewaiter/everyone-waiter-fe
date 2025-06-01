import Checkbox from "@/components/common/Checkbox";
import { PlusIcon } from "lucide-react";

interface IProps {
  index: number;
  hasCheckbox?: boolean;
}

export default function MenuBox({ index, hasCheckbox }: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {hasCheckbox && <Checkbox className="h-6 w-6" />}
        <strong className="text-2xl font-semibold">{index + 1}</strong>
      </div>
      <div className="rounded-[12px] border border-gray-600 p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">스노우치즈폭립</span>
          <span className="text-right text-lg font-medium">1개</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-base font-medium text-[#2E7BB3]">
            <PlusIcon size={18} color="#2E7BB3" strokeWidth={1} />
            매운맛
          </span>
          <span className="text-right text-base font-medium text-[#2E7BB3]">
            4단계
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="flex items-center gap-1 text-base font-medium text-[#2E7BB3]">
            <PlusIcon size={18} color="#2E7BB3" strokeWidth={1} />
            매운맛
          </span>
          <span className="text-right text-base font-medium text-[#2E7BB3]">
            3단계
          </span>
        </div>
      </div>
      <div className="rounded-[12px] border border-gray-600 p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">스노우치즈폭립</span>
          <span className="text-right text-lg font-medium">1개</span>
        </div>
      </div>
    </div>
  );
}
