import Button from "@/components/common/Button/Button";
import Image from "next/image";

export default function AlreadyCancelled() {
  return (
    <div className="center flex h-screen w-screen flex-col">
      <div className="flex w-full flex-col items-center gap-6 px-5">
        <Image
          src="/gif/cancel.gif"
          alt="웨이팅 등록이 취소되었습니다"
          width={140}
          height={140}
        />
        <h1 className="text-gray-0 inline-block text-center text-2xl font-semibold whitespace-pre-line">
          {"예약이 취소되어 순번을\n확인할 수 없습니다."}
        </h1>
      </div>
      <span className="font-regular mt-3 block text-center text-base whitespace-pre-line text-gray-300">
        {"아래 버튼을 클릭하면 새로운 웨이팅을\n등록할 수 있습니다."}
      </span>
      <div className="absolute bottom-5 w-full px-5">
        <Button
          className="button-lg w-full"
          color="grey"
          onClick={() => {
            // window.close();
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
}
