import ModalWithTitle from "@/components/modal/largeModalLayout";
import Image from "next/image";

interface IProps {
  close: () => void;
}

export default function PendingAcceptModal({ close }: IProps) {
  return (
    <ModalWithTitle
      onClose={close}
      title="매장 등록 신청 현황"
      width={540}
      height={480}
    >
      <div className="flex h-[350px] w-full flex-col items-center justify-center">
        <Image
          src="/gif/hourglass.gif"
          alt="매장 등록 승인 대기 중"
          width={180}
          height={180}
        />
        <strong className="text-gray-0 mt-10 text-2xl font-semibold">
          매장 등록 승인을 기다리는 중입니다.
        </strong>
        <p className="font-regular mt-3 text-center text-base text-gray-300">
          관리자의 승인이 완료될 때까지 1~2일 소요될
          <br />
          예정이니 양해 부탁드립니다.
        </p>
      </div>
    </ModalWithTitle>
  );
}
