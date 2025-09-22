import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/common/Spinner";
import { arrayMove, rectSortingStrategy } from "@/components/dnd/index";
import Switch from "@/components/common/Switch";
import { Form } from "@/components/common/Form";
import {
  optionSchema,
  TypeSettingsOptionForm,
} from "../_schema/settings.schema";
import useSettings from "../_queries/useSettings";
import OrderForm from "./OrderForm";

const Sortable = dynamic(() => import("@/components/Sortable"), {
  ssr: false,
  loading: () => <Spinner />,
});

const MoveableChips = dynamic(() => import("./MoveableChips"), {
  ssr: false,
  loading: () => null,
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
  const form = useForm<TypeSettingsOptionForm>({
    mode: "onSubmit",
    resolver: zodResolver(optionSchema),
  });

  const [items, setItems] = useState<string[]>([]);

  const { updateSetting } = useSettings(storeId);

  const handleDrag = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const changeSort = arrayMove(items, oldIndex, newIndex);
      setItems(changeSort);
      updateSetting({ staffCallOptions: changeSort });
    }
  };

  useEffect(() => {
    if (staffCallOptions) setItems(staffCallOptions);
  }, [staffCallOptions]);

  return (
    <div>
      <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
        주문
      </h2>
      <div className="mt-3 flex flex-col gap-3 md:mt-4">
        <div className="flex w-full items-center">
          <span className="flex-1 text-sm">손님 테이블 메뉴 팝업창 띄우기</span>
          <Switch
            checked={showMenuPopup}
            onCheckedChange={(checked) =>
              updateSetting({ showMenuPopup: checked })
            }
          />
        </div>
        <div className="flex w-full gap-12 md:items-center md:gap-1">
          <span className="flex-1 text-sm">
            손님 테이블 주문 내역에서 총 주문금액 표시하기
          </span>
          <Switch
            checked={showOrderTotalPrice}
            onCheckedChange={(checked) =>
              updateSetting({ showOrderTotalPrice: checked })
            }
          />
        </div>
        <div className="mb-0 flex w-full flex-col gap-3 md:mb-3 md:gap-2 lg:gap-3">
          <span className="flex-1 text-sm">
            직원 호출 페이지에 옵션 추가{" "}
            <span className="md:text-xxs ml-1 text-xs font-medium text-gray-300 lg:ml-[6px] lg:text-xs">
              최대 12개
            </span>
          </span>
          <Form {...form}>
            <OrderForm
              onAction={(value) => {
                const nextItems = [...items, value];
                updateSetting({ staffCallOptions: nextItems }, () => {
                  setItems(nextItems);
                  form.reset();
                });
              }}
            />
          </Form>
        </div>
        <Sortable
          items={items}
          onDragEnd={handleDrag}
          sortingStrategy={rectSortingStrategy}
        >
          <div className="-m-1 flex flex-wrap">
            {items?.map((id) => (
              <MoveableChips
                key={id}
                id={id}
                onDelete={() => {
                  const newItems = items.filter((item) => item !== id);
                  updateSetting({ staffCallOptions: newItems }, () => {
                    setItems(newItems);
                  });
                }}
              >
                {id}
              </MoveableChips>
            ))}
          </div>
        </Sortable>
      </div>
    </div>
  );
}
