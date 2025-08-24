import ImageWithFallback from "@/components/common/ImageWithFallback";

interface IProps {
  image: string;
  name: string;
  price: number;
  onClick: () => void;
}

export default function MobileMenuCard({
  image,
  name,
  price,
  onClick,
}: IProps) {
  return (
    <button type="button" className="py-4" onClick={onClick}>
      <div className="flex items-center gap-5">
        <div className="relative h-[96px] w-[96px] overflow-hidden rounded-xl">
          <ImageWithFallback
            src={image}
            alt="menu"
            width={96}
            height={96}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <h3 className="text-gray-0 text-base font-medium">{name}</h3>
          <strong className="text-gray-0 text-xl font-semibold">
            {price.toLocaleString()}원
          </strong>
        </div>
      </div>
    </button>
  );
}
