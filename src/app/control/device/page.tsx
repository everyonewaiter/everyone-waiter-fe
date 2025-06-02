import Image from "next/image";
import cn from "@/lib/utils";
import AddDeviceStep1 from "./_components/AddDeviceStep1";
import AddDeviceStep2 from "./_components/AddDeviceStep2";
import useDeviceUI from "./_hooks/useDeviceUi";

export default function Device() {
  const { step, setStep, storeId, setStoreId, phoneNumber, setPhoneNumber } =
    useDeviceUI();

  // const { mutate: submitDevice } = useMutation({
  //   mutationFn: addDevice,
  // });

  return (
    <div
      className={cn(
        "mx-5 w-full bg-white p-5 md:mx-0 md:w-[364px] md:rounded-[24px] lg:w-136 lg:rounded-[32px] lg:p-8",
        step === 0 ? "mt-0 md:mt-4 lg:mt-30" : "mt-0 md:mt-2 lg:mt-24"
      )}
    >
      <div>
        <Image
          src="/icons/logo/logo.svg"
          alt="로고"
          width={90}
          height={90}
          className="hidden md:block md:h-15 md:w-15 lg:h-[90px] lg:w-[90px]"
        />
        <h1 className="text-gray-0 text-xl font-bold md:pt-4 md:text-2xl lg:pt-10 lg:text-4xl">
          기기 등록
        </h1>
        <div className="font-regular md:text-s md:gap-1/2 mt-2 flex flex-col text-xs text-gray-300 lg:mt-3 lg:gap-1 lg:text-[15px]">
          <span>첫 매장을 등록해볼까요?</span>
          <span>간단한 정보만 입력하면 바로 시작할 수 있어요!</span>
        </div>
      </div>
      <div className="mt-8 md:mt-6 lg:mt-12">
        {step === 0 && (
          <AddDeviceStep1
            onNextStep={(_storeId: bigint, _phoneNumber: string) => {
              setStoreId(_storeId);
              setPhoneNumber(_phoneNumber);
              setStep(step + 1);
            }}
          />
        )}
        {step === 1 && (
          <AddDeviceStep2
            storeId={storeId.toString()}
            phoneNumber={phoneNumber}
          />
        )}
      </div>
    </div>
  );
}
