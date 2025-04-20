import Row from "@/app/store/_components/Row";
import cn from "@/lib/utils";

interface IProps {
  itemWidths: Record<string, string>;
  data: { registrationCount: number; registrations: StoreDetail[] };
}

export default function Table({ itemWidths, data }: IProps) {
  return (
    <div className="w-full md:my-3 lg:my-6">
      <div className="hidden items-center justify-center bg-gray-600 md:flex md:h-10 md:rounded-[12px] lg:h-16 lg:rounded-[16px]">
        {Object.keys(itemWidths).map((key) => (
          <div
            key={key}
            className={cn(
              itemWidths[key as keyof typeof itemWidths],
              "text-gray-0 text-s text-center md:font-medium lg:text-base lg:font-bold"
            )}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full flex-col items-center gap-4 md:mt-0 md:items-start md:gap-0">
        {data?.registrations?.map((item, index) => (
          <Row
            itemWidths={itemWidths}
            key={item.createdAt}
            {...item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
