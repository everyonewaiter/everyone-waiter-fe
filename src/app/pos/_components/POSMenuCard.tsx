import getCdn from "@/utils/getCdn";
import Image from "next/image";

interface IProps extends Menu {
  onClick?: () => void;
}

export default function POSMenuCard({ onClick, ...props }: IProps) {
  return (
    <button
      type="button"
      className="relative h-[340px] overflow-hidden rounded-[24px] border-[1.5px] border-gray-600"
      onClick={onClick}
    >
      <Image src={getCdn(props.image)} alt="menu" width={270} height={340} />
      <div className="absolute bottom-0 flex h-[101px] w-full flex-col items-center justify-center gap-2 bg-white">
        <span className="text-gray-0 text-lg font-medium">{props.name}</span>
        <strong className="text-gray-0 text-2xl font-semibold">
          {props.price.toLocaleString()}원
        </strong>
      </div>
    </button>
  );
}
