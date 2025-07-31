import Select from "@/components/common/Select";
import cn from "@/lib/utils";

interface IProps {
  value: string;
  onValueChange: (value: string) => void;
  triggerClassname: string;
  isMobile?: boolean;
  stores?: {
    storeId: string;
    name: string;
  }[];
}

export default function MainSelect({
  value,
  onValueChange,
  triggerClassname,
  isMobile,
  stores,
}: IProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      triggerClassName={cn(
        "bg-primary flex w-full items-center justify-between rounded-xl",
        triggerClassname
      )}
      triggerPlaceholder="매장 선택"
      triggerValue={
        isMobile
          ? stores?.find((store) => store.storeId === value)?.name ||
            "매장 선택"
          : null
      }
      data={stores?.map((el) => ({
        key: el.storeId,
        value: el.name,
        text: el.name,
      }))}
    />
  );
}
