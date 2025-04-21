import cn from "@/shared/lib/utils";

interface IProps {
  steps: string[];
  isActive: number;
  onSetActive: (value: number) => void;
}

export default function StepIndicator({
  steps,
  isActive,
  onSetActive,
}: IProps) {
  return (
    <div className="flex gap-6">
      {steps.map((item, index) => (
        <button
          key={item}
          type="button"
          className="relative flex cursor-pointer flex-col items-center gap-1"
          onClick={() => onSetActive(index)}
        >
          {index !== steps.length - 1 && (
            <div className="absolute left-1/2 h-[1px] bg-gray-600 md:top-[4.5px] md:w-[80px] lg:top-[5.5px] lg:w-[90px]" />
          )}
          <div
            className={cn(
              "z-10 rounded-full md:h-[10px] md:w-[10px] lg:h-3 lg:w-3",
              index === isActive ? "bg-primary" : "bg-gray-600"
            )}
          />
          <span
            className={cn(
              "font-regular md:text-xs lg:text-sm",
              index === isActive
                ? "text-primary underline underline-offset-6"
                : "text-gray-300"
            )}
          >
            {item}
          </span>
        </button>
      ))}
    </div>
  );
}
