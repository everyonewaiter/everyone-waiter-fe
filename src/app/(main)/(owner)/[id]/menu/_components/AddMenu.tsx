import { Plus } from "lucide-react";

export default function AddMenu() {
  return (
    <button
      type="button"
      className="flex h-[210px] w-[152px] flex-col items-center justify-center gap-1 rounded-xl bg-gray-700 text-[16px] md:h-[220px] md:w-[159px] lg:h-[440px] lg:w-[329px] lg:gap-2 lg:text-lg"
    >
      <Plus className="size-[15px] lg:size-[20px]" />
      메뉴 추가
    </button>
  );
}
