import CallingCardUi from "./CallingCardUi";

export default function CallingCard() {
  return (
    <div className="w-[294px] rounded-[24px] border border-gray-600 p-6">
      <div className="flex h-[52px] items-center justify-between">
        <span className="text-2xl font-semibold text-gray-100">
          테이블 번호
        </span>
        <strong className="text-4xl">01</strong>
      </div>
      <div className="center text-gray-0 mt-2 h-[126px] rounded-[12px] border border-gray-600 text-lg font-semibold">
        김치 더 주세요.
      </div>
      <CallingCardUi />
    </div>
  );
}
