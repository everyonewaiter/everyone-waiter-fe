import ModalWithTitle from "@/shared/ui/modal/largeModalLayout";
import Image from "next/image";

interface IProps {
  close: () => void;
}

export default function PendingAcceptModal({ close }: IProps) {
  return (
    <ModalWithTitle onClose={close} title="매장 등록 신청 현황">
      <div className="flex h-[404px] w-full flex-col items-center justify-center md:h-[258px] lg:h-full">
        <Image
          src="/gif/hourglass.gif"
          alt="매장 등록 승인 대기 중"
          width={180}
          height={180}
          className="h-[120px] w-[120px] lg:h-[180px] lg:w-[180px]"
        />
        <strong className="text-gray-0 text-lg font-semibold md:mt-4 md:text-base lg:mt-10 lg:text-2xl">
          승인을 기다리는 중입니다.
        </strong>
        <p className="font-regular text-s mt-3 text-center text-[#505050] md:mt-2 md:text-gray-300 lg:mt-3 lg:text-base">
          관리자의 승인이 완료될 때까지 1~2일 소요될
          <br />
          예정이니 양해 부탁드립니다.
        </p>
      </div>
    </ModalWithTitle>
  );
}
