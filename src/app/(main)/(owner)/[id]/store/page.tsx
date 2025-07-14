import FormComponent from "./_components/FormComponent";

export default function StoreInfo() {
  return (
    <div className="min-h-full justify-center">
      <div className="mt-10 flex w-full flex-col items-center md:mt-6 md:h-[calc(100%-45px)] lg:mt-10 lg:h-[calc(100%-100px)]">
        <div className="w-80 md:w-[272px] lg:w-120">
          <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
            매장 정보
          </h1>
          <div className="md:text-s font-regular gap-1/2 mt-2 flex flex-col text-xs text-gray-300 lg:mt-3 lg:text-sm">
            <span>등록된 매장 정보를 확인할 수 있습니다.</span>
            <span>변경된 정보가 있다면 언제든지 수정해 주세요.</span>
          </div>
          <FormComponent />
        </div>
      </div>
    </div>
  );
}
