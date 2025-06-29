import { PropsWithChildren } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/common/Radio";
import { useFormContext } from "react-hook-form";
import cn from "@/lib/utils";
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
  const form = useFormContext<{
    required: Omit<OrderOptionGroups, "printEnabled">[];
    optional: Omit<OrderOptionGroups, "printEnabled">[];
  }>();

  const handleValueChange = (item: MenuOptionGroups, value: string) => {
    const key = required ? "required" : "optional";
    const selected = [...form.watch(key)];

    const index = selected.findIndex(
      (el) => el.orderOptionGroupId === item.menuOptionGroupId
    );

    const matchedOption = item.menuOptions.find((el) => el.name === value);

    const updatedGroup = {
      orderOptionGroupId: item.menuOptionGroupId,
      name: item.name,
      orderOptions: [
        {
          name: value,
          price: matchedOption?.price ?? 0,
        },
      ],
    };

    if (index >= 0) {
      selected[index] = updatedGroup;
    } else {
      selected.push(updatedGroup);
    }

    form.setValue(key, selected);
  };

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

          <div className="flex flex-col">
            {type === "order"
              ? item.menuOptions.map((option, index) => (
                  <RadioGroup
                    key={option.name}
                    defaultValue="option-one"
                    className="flex flex-col items-center gap-3"
                    value={
                      form
                        .watch(required ? "required" : "optional")
                        .find(
                          (el) =>
                            el.orderOptionGroupId === item.menuOptionGroupId
                        )?.orderOptions?.[0]?.name ?? ""
                    }
                    onValueChange={(value) => handleValueChange(item, value)}
                  >
                    <div
                      className={cn(
                        "flex w-full items-center space-x-2",
                        index === 0 ? "" : "mt-3"
                      )}
                    >
                      <RadioGroupItem value={option.name} id={option.name} />
                      <OptionItem {...option} />
                    </div>
                  </RadioGroup>
                ))
              : item.menuOptions.map((option) => (
                  <div
                    key={option.name}
                    className="flex w-full items-center space-x-2"
                  >
                    <OptionItem {...option} />
                  </div>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}
