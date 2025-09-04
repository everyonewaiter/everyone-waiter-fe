import ImageWithFallback from "@/components/common/ImageWithFallback";
import cn from "@/lib/utils";
import Image from "next/image";
import { memo } from "react";

interface IProps extends Menu {
  onClick?: () => void;
}

const POSMenuCard = memo(({ onClick, ...props }: IProps) => (
  <div
    role="button"
    tabIndex={0}
    className={cn(
      "relative aspect-[270/340] overflow-hidden rounded-2xl border-[1.5px] border-gray-600 lg:rounded-3xl",
      props?.state === "SOLD_OUT" ? "cursor-default" : "cursor-pointer"
    )}
    onClick={() => props.state !== "SOLD_OUT" && onClick?.()}
    onKeyDown={(e) => {
      if ((e.key === "Enter" || e.key === " ") && props?.state !== "SOLD_OUT") {
        e.preventDefault();
        onClick?.();
      }
    }}
  >
    {props.state === "SOLD_OUT" && (
      <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/70">
        <span className="text-xl font-semibold text-white lg:text-2xl">
          SOLD OUT
        </span>
      </div>
    )}
    <div className="absolute top-0 left-0 h-full w-full bg-black/70">hi</div>
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
  </div>
));

export default POSMenuCard;
