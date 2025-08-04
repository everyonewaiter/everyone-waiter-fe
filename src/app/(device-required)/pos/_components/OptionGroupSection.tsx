import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/common/Radio";
import cn from "@/lib/utils";
import Checkbox from "@/components/common/Checkbox";
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
    const selected = [...form.watch("required")];

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

    form.setValue("required", selected);
  };

  const handleCheckboxToggle = (
    item: MenuOptionGroups,
    value: string,
    checked: boolean
  ) => {
    const selected = [...form.watch("optional")];

    const groupIndex = selected.findIndex(
      (el) => el.orderOptionGroupId === item.menuOptionGroupId
    );

    const matchedOption = item.menuOptions.find((el) => el.name === value);
    const optionToToggle = {
      name: value,
      price: matchedOption?.price ?? 0,
    };

    // 그룹이 이미 존재하는 경우
    if (groupIndex >= 0) {
      const group = selected[groupIndex];
      const existingOptions = group.orderOptions ?? [];

      if (checked) {
        // 선택 추가
        const updatedOptions = [...existingOptions, optionToToggle];
        selected[groupIndex] = {
          ...group,
          orderOptions: updatedOptions,
        };
      } else {
        // 선택 해제
        const updatedOptions = existingOptions.filter(
          (opt) => opt.name !== value
        );

        if (updatedOptions.length > 0) {
          selected[groupIndex] = {
            ...group,
            orderOptions: updatedOptions,
          };
        } else {
          // 그룹 자체 제거
          selected.splice(groupIndex, 1);
        }
      }
    } else if (checked) {
      // 그룹이 존재하지 않고 새로 추가해야 할 경우
      selected.push({
        orderOptionGroupId: item.menuOptionGroupId,
        name: item.name,
        orderOptions: [optionToToggle],
      });
    }

    form.setValue("optional", selected);
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
              ? item.menuOptions.map((option, index) =>
                  required ? (
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
                  ) : (
                    <div
                      className={cn(
                        "flex w-full items-center space-x-2",
                        index === 0 ? "" : "mt-3"
                      )}
                      key={option.name}
                    >
                      <Checkbox
                        id={option.name}
                        checked={
                          !!form
                            .watch("optional")
                            .find(
                              (el) =>
                                el.orderOptionGroupId === item.menuOptionGroupId
                            )
                            ?.orderOptions.some(
                              (opt) => opt.name === option.name
                            )
                        }
                        onCheckedChange={(checked) =>
                          handleCheckboxToggle(item, option.name, !!checked)
                        }
                      />
                      <OptionItem {...option} />
                    </div>
                  )
                )
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
