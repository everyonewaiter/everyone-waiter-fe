import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";

interface IProps {
  name: string;
  price: number;
}

export default function OptionItem({ name, price }: IProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <Label htmlFor={name} className="text-s font-medium lg:text-base">
        {name}
      </Label>
      <div className="text-s flex items-center gap-1 text-gray-100 lg:text-base">
        <PlusIcon size={18} className="text-gray-100" strokeWidth={1} />
        {price.toLocaleString()}원
      </div>
    </div>
  );
}
