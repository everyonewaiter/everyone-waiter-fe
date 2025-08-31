import { Skeleton } from "@/components/common/Skeleton/Skeleton";

export default function MenuLoadingSkeleton() {
  return (
    <div className="mt-4 mb-4 flex flex-1 flex-col lg:mt-6 lg:mb-0">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-[10px] md:gap-y-4 lg:grid-cols-5 lg:gap-x-[32px] lg:gap-y-[40px]">
          {[0, 1, 2, 3, 4].map((el) => (
            <Skeleton
              key={el}
              className="aspect-[329/440] rounded-xl lg:rounded-3xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
