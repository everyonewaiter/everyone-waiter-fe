import Button from "@/components/common/Button/Button";
import Image from "next/image";

export default function SuccessfullyCancelled() {
  return (
    <div className="center flex h-screen w-screen flex-col">
      <div className="flex w-full flex-col items-center gap-6 px-5">
        <Image
          src="/gif/success.gif"
          alt="웨이팅 등록이 취소되었습니다"
          width={140}
          height={140}
        />
        <h1 className="text-gray-0 text-2xl font-semibold">
          웨이팅 등록이 취소되었습니다!
        </h1>
      </div>
      <div className="absolute bottom-5 w-full px-5">
        <Button
          className="button-lg w-full"
          color="black"
          onClick={() => {
            // window.close();
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
