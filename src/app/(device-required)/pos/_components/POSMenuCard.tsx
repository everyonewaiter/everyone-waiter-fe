import ImageWithFallback from "@/components/common/ImageWithFallback";
import Image from "next/image";
import { memo } from "react";

interface IProps extends Menu {
  onClick?: () => void;
}

const POSMenuCard = memo(({ onClick, ...props }: IProps) => (
  <button
    type="button"
    className="relative h-[340px] overflow-hidden rounded-3xl border-[1.5px] border-gray-600"
    onClick={onClick}
  >
    {props.image ? (
      <ImageWithFallback
        src={props.image}
        alt={`${props.name} 메뉴 이미지`}
        fill
        className="object-cover"
        unoptimized
        priority
      />
    ) : (
      <div className="center h-full w-full bg-gray-600 pb-20 opacity-50">
        <Image
          src="/logo/logo-medium-gray.svg"
          alt="메뉴 이미지 없음"
          width={100}
          height={100}
          className="opacity-50"
        />
      </div>
    )}
    <div className="absolute bottom-0 flex h-[101px] w-full flex-col items-center justify-center gap-2 bg-white">
      <span className="text-gray-0 text-lg font-medium">{props.name}</span>
      <strong className="text-gray-0 text-2xl font-semibold">
        {props.price.toLocaleString()}원
      </strong>
    </div>
  </button>
));

export default POSMenuCard;
