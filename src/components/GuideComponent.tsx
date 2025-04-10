import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./common/Button";

interface IProps {
  title: string;
  subtitle: string;
  image: {
    url: string;
    size: number;
  };
  gap?: number;
}

export default function GuideComponent({
  title,
  subtitle,
  image,
  gap,
}: IProps) {
  const navigate = useRouter();

  return (
    <div
      className={`flex w-[480px] flex-col items-center ${gap ? `gap-${gap}` : "gap-10"} rounded-[32px] bg-white p-8`}
    >
      <Image
        src={image.url}
        alt="매장이 등록되어있지 않습니다"
        width={image.size}
        height={image.size}
      />
      <div className="flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-3">
          <div>
            {title.split("\\n").map((line) => (
              <span key={line} className="text-gray-0 text-2xl font-semibold">
                {line}
                <br />
              </span>
            ))}
          </div>
          <div>
            {subtitle.split("\\n").map((line) => (
              <span
                key={line}
                className="font-regular text-lg whitespace-pre-wrap text-gray-300"
              >
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
        <Button
          color="primary"
          size="lg"
          onClick={() => navigate.push("/store/list")}
        >
          내 신청 현황 보기
        </Button>
      </div>
    </div>
  );
}
