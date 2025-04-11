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
      className={`flex flex-col items-center md:w-[400px] lg:w-[480px] ${gap ? `gap-${gap}` : "md:gap-8 lg:gap-10"} rounded-[32px] bg-white p-8`}
    >
      <Image
        src={image.url}
        alt="매장이 등록되어있지 않습니다"
        width={image.size}
        height={image.size}
        className="md:h-[100px] md:w-[100px] lg:h-[160px] lg:w-[160px]"
      />
      <div className="flex flex-col text-center md:w-[360px] md:gap-6 lg:gap-8">
        <div className="flex flex-col md:gap-2 lg:gap-3">
          <div>
            {title.split("\\n").map((line) => (
              <span
                key={line}
                className="text-gray-0 font-semibold md:text-base lg:text-2xl"
              >
                {line}
                <br />
              </span>
            ))}
          </div>
          <div>
            {subtitle.split("\\n").map((line) => (
              <span
                key={line}
                className="font-regular md:text-s whitespace-pre-wrap text-gray-300 lg:text-lg"
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
          className="md:text-s md:h-[36px] md:rounded-[8px] md:font-medium"
        >
          내 신청 현황 보기
        </Button>
      </div>
    </div>
  );
}
