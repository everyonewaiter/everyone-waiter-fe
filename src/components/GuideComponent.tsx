import Image from "next/image";
import { useRouter } from "next/navigation";
import ResponsiveButton from "./common/ResponsiveButton";

interface IProps {
  title: string;
  subtitle: string;
  image: {
    url: string;
    size: number;
  };
  gap?: number;
  isFromHome?: boolean;
}

export default function GuideComponent({
  title,
  subtitle,
  image,
  gap,
  isFromHome,
}: IProps) {
  const navigate = useRouter();

  return (
    <div
      className={`flex w-[311px] flex-col items-center md:w-[360px] lg:w-[480px] ${gap ? `gap-${gap}` : "md:gap-8 lg:gap-10"} rounded-[32px] bg-white`}
    >
      <Image
        src={image.url}
        alt="매장이 등록되어있지 않습니다"
        width={image.size}
        height={image.size}
        className="md:h-[100px] md:w-[100px] lg:h-[160px] lg:w-[160px]"
      />
      <div className="flex w-full flex-col gap-6 text-center lg:gap-8">
        <div className="flex flex-col">
          <div>
            {title.split("\\n").map((line) => (
              <span
                key={line}
                className="text-gray-0 text-lg font-semibold md:text-base lg:text-2xl"
              >
                {line}
                <br />
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-0.5 md:mt-2 md:gap-1">
            {subtitle.split("\\n").map((line) => (
              <span
                key={line}
                className="font-regular text-s whitespace-pre-wrap text-[#505050] md:text-gray-300 lg:text-lg"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveButton
          color="primary"
          onClick={() =>
            navigate.push(isFromHome ? "/store/create" : "/stores")
          }
          responsiveButtons={{
            lg: { buttonSize: "lg", className: "!h-12" },
            md: { buttonSize: "md", className: "!h-9" },
            sm: { buttonSize: "md", className: "!h-10" },
          }}
        >
          {isFromHome ? "매장 등록하기" : " 내 신청 현황 보기"}
        </ResponsiveButton>
      </div>
    </div>
  );
}
