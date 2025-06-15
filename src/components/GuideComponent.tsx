import Image from "next/image";
import { useRouter } from "next/navigation";
import ResponsiveButton from "./common/Button/ResponsiveButton";

interface IProps {
  title: string;
  subtitle: string;
  image: {
    url: string;
    size: number;
  };
  gap?: string;
  isFromHome?: boolean;
  buttonText?: string;
  href: string;
}

export default function GuideComponent({
  title,
  subtitle,
  image,
  gap,
  isFromHome,
  buttonText,
  href,
}: IProps) {
  const navigate = useRouter();

  return (
    <div
      className={`flex w-[288px] flex-col items-center md:w-[360px] lg:w-[480px] ${gap || "gap-6 md:gap-8 lg:gap-10"} rounded-[32px] bg-white md:p-5 lg:p-8`}
    >
      <Image
        src={image.url}
        alt="매장이 등록되어있지 않습니다"
        width={image.size}
        height={image.size}
        className="h-[90px] w-[90px] md:h-[100px] md:w-[100px] lg:h-[160px] lg:w-[160px]"
        priority
      />
      <div className="flex w-full flex-col gap-6 text-center lg:gap-8">
        <div className="flex flex-col">
          {title && (
            <div>
              {title.split("\\n").map((line) => (
                <span
                  key={line}
                  className="text-gray-0 text-base font-semibold md:text-lg lg:text-2xl"
                >
                  {line}
                  <br />
                </span>
              ))}
            </div>
          )}
          {subtitle && (
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
          )}
        </div>
        <ResponsiveButton
          color="primary"
          onClick={() => navigate.push(href)}
          responsiveButtons={{
            lg: { buttonSize: "lg", className: "h-12" },
            md: { buttonSize: "md", className: "h-9" },
            sm: { buttonSize: "sm", className: "h-10" },
          }}
          commonClassName="w-full relative"
        >
          {buttonText || (isFromHome ? "매장 등록하기" : " 내 신청 현황 보기")}
        </ResponsiveButton>
      </div>
    </div>
  );
}
