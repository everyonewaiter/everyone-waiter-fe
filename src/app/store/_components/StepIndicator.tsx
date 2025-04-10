import cn from "@/lib/utils";

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
            <div className="absolute top-[5.5px] left-1/2 h-[1px] w-[90px] bg-gray-600" />
          )}
          <div
            className={cn(
              "z-10 h-3 w-3 rounded-full",
              index === isActive ? "bg-primary" : "bg-gray-600"
            )}
          />
          <span
            className={cn(
              "font-regular text-sm",
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
