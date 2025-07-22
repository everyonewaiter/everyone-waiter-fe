import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/common/Spinner";
import { arrayMove } from "@dnd-kit/sortable";
import { TypeSettingsForm } from "../_schema/settings.schema";
import useSettings from "../_queries/useSettings";
import Switches from "./Switches";

const Sortable = dynamic(() => import("@/components/Sortable"), {
  ssr: false,
  loading: () => <Spinner />,
});

const MoveableChips = dynamic(() => import("./MoveableChips"), {
  ssr: false,
  loading: () => <Spinner />,
});

interface IProps {
  staffCallOptions?: string[];
  showMenuPopup?: boolean;
  showOrderTotalPrice?: boolean;
  storeId: string;
}

export default function OrderSection({
  staffCallOptions,
  showMenuPopup,
  showOrderTotalPrice,
  storeId,
}: IProps) {
  const form = useFormContext<TypeSettingsForm>();

  const [items, setItems] = useState<string[]>([]);

  const { updateSetting } = useSettings(storeId);

  useEffect(() => {
    if (staffCallOptions) {
      setItems(staffCallOptions);
    }
  }, [form, staffCallOptions]);

  const handleAddOptionText = useCallback(() => {
    const value = form.getValues("optionText");
    if (value.trim()) {
      const nextItems = [...items, value];
      updateSetting({ staffCallOptions: nextItems }, () => {
        setItems(nextItems);
        form.reset();
      });
    }
    // eslint-disable-next-line
  }, [items]);

  const handleDrag = useCallback(
    ({ active, over }: any) => {
      if (active.id !== over?.id) {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const changeSort = arrayMove(items, oldIndex, newIndex);
        updateSetting({ staffCallOptions: changeSort }, () =>
          setItems(changeSort)
        );
      }
    },
    [items, updateSetting]
  );

  return (
    <div>
      <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
        주문
      </h2>
      <div className="mt-3 flex flex-col gap-3 md:mt-4">
        <Switches
          showMenuPopup={showMenuPopup}
          showOrderTotalPrice={showOrderTotalPrice}
          onShowPopup={(checked) => updateSetting({ showMenuPopup: checked })}
          onShowPrice={(checked) =>
            updateSetting({ showOrderTotalPrice: checked })
          }
        />
        <div className="flex w-full flex-col gap-3 md:gap-2 lg:gap-3">
          <span className="flex-1 text-sm">
            직원 호출 페이지에 옵션 추가{" "}
            <span className="md:text-xxs ml-1 text-xs font-medium text-gray-300 lg:ml-[6px] lg:text-xs">
              최대 12개
            </span>
          </span>
          <FormField
            control={form.control}
            name="optionText"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-[6px]">
                  <FormControl>
                    <Input
                      className="!h-9 w-full !rounded-[10px] placeholder:text-xs placeholder:text-gray-300"
                      placeholder="옵션명을 입력해주세요."
                      {...field}
                    />
                  </FormControl>

                  <ResponsiveButton
                    type="button"
                    color="black"
                    onClick={handleAddOptionText}
                    responsiveButtons={{
                      lg: {
                        buttonSize: "sm",
                        className: "relative gap-0 !w-[71px]",
                      },
                      md: {
                        buttonSize: "sm",
                        className: "flex",
                      },
                      sm: {
                        buttonSize: "sm",
                        className: "flex",
                      },
                    }}
                  >
                    추가
                  </ResponsiveButton>
                </div>
                <FormErrorMessage className="mb-[1.5px]" />
              </FormItem>
            )}
          />
        </div>
        <Sortable items={items} onDragEnd={handleDrag}>
          <div className="flex flex-wrap gap-2">
            {items.map((id) => (
              <MoveableChips key={id} id={id} onDelete={() => {}}>
                {id}
              </MoveableChips>
            ))}
          </div>
        </Sortable>
      </div>
    </div>
  );
}
