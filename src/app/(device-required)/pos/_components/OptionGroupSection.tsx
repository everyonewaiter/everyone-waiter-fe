import { PropsWithChildren } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/common/Radio";
import OptionItem from "./OptionItem";

interface IProps {
  data: MenuOptionGroups[];
  type: "order" | "preview";
  required?: boolean;
}

export default function OptionGroupSection({
  data,
  type,
  required,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px] font-semibold lg:text-base">
        {children} {required && <span className="text-primary">*</span>}
      </p>
      {data.map((item) => (
        <div
          className="rounded-[12px] bg-gray-700 p-3 lg:p-4"
          key={item.menuOptionGroupId}
        >
          <p className="text-gray-0 mb-3 text-sm lg:text-lg">{item.name}</p>

          {type === "order" ? (
            <RadioGroup
              defaultValue="option-one"
              className="flex flex-col items-center gap-3"
              // value={discountType}
              // onValueChange={(value) => {
              //   setDiscountType(value as "fixed" | "percentage");
              // }}
            >
              {item.menuOptions.map((option) => (
                <div
                  key={option.name}
                  className="flex w-full items-center space-x-2"
                >
                  <RadioGroupItem value={option.name} id={option.name} />
                  <OptionItem {...option} />
                </div>
              ))}
            </RadioGroup>
          ) : (
            item.menuOptions.map((option) => (
              <div
                key={option.name}
                className="flex w-full items-center space-x-2"
              >
                <OptionItem {...option} />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
