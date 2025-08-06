import Button from "@/components/common/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AlreadyEntered() {
  const navigate = useRouter();

  return (
    <div className="center flex h-screen w-screen flex-col">
      <div className="flex w-full flex-col items-center gap-6 px-5">
        <Image
          src="/gif/success.gif"
          alt="이미 입장 완료되었습니다"
          width={140}
          height={140}
        />
        <h1 className="text-gray-0 text-2xl font-semibold whitespace-pre-line">
          이미 입장 완료되었습니다!
        </h1>
      </div>
      <span className="font-regular mt-3 text-sm whitespace-pre-line text-gray-300">
        {
          "순번이 호출되어 매장에 입장하셨습니다.\n더 이상 웨이팅 정보를 확인할 수 없습니다."
        }
      </span>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          className="button-lg !w-[80px]"
          color="grey"
          onClick={() => {
            // window.close();
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          돌아가기
        </Button>
        <Button
          className="button-lg flex-1"
          color="black"
          onClick={() => navigate.push("/menus/preview")}
        >
          메뉴 보러가기
        </Button>
      </div>
    </div>
  );
}
