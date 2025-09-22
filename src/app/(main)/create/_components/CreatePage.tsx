import Logo from "@/components/Logo";
import CreateForm from "./CreateForm";

interface IProps {
  storeId?: string;
}

export default function CreatePage({ storeId }: IProps) {
  return (
    <div className="flex items-start justify-between rounded-4xl bg-white md:w-[722px] md:p-8 lg:w-[888px]">
      <div className="hidden flex-col md:flex">
        <Logo
          width={90}
          height={90}
          className="md:h-12 md:w-12 lg:h-[90px] lg:w-[90px]"
        />
        <h1 className="text-gray-0 md:mt-5 md:text-xl md:font-semibold lg:mt-10 lg:text-4xl lg:font-bold">
          매장 등록
        </h1>
        <p className="font-regular text-gray-300 md:mt-2 md:text-xs lg:mt-3 lg:text-[15px]">
          첫 매장을 등록해볼까요?
          <br />
          간단한 정보만 입력하면 바로 시작할 수 있어요!
        </p>
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        <h1 className="text-gray-0 flex w-full justify-center text-xl font-semibold md:hidden">
          매장 등록
        </h1>
        <CreateForm storeId={storeId} />
      </div>
    </div>
  );
}
