import FormComponent from "./_components/FormComponent";

export default function StoreInfo() {
  return (
    <div className="flex w-80 flex-col md:w-[272px] lg:w-[480px]">
      <div className="min-h-full justify-center">
        <div className="flex h-full w-full flex-col items-center md:mt-6 lg:mt-10">
          <div className="w-full">
            <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
              매장 정보
            </h1>
            <div className="md:text-s font-regular gap-1/2 mt-2 flex w-full flex-col text-xs text-gray-300 lg:mt-3 lg:text-sm">
              <span>등록된 매장 정보를 확인할 수 있습니다.</span>
              <span>변경된 정보가 있다면 언제든지 수정해 주세요.</span>
            </div>
            <FormComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
