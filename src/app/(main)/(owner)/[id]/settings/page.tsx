"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Input from "@/components/common/Input";
import Switch from "@/components/common/Switch";
import { useState } from "react";
import { Form } from "@/components/common/Form";
import MoveableChips from "./_components/MoveableChips";
import useSettingsForm from "./_hooks/useSettingsForm";

export default function Settings() {
  const [active, setActive] = useState<0 | 1>(0);
  const [items, setItems] = useState(["1", "2", "3", "4"]);

  const { form, submitHandler } = useSettingsForm(setItems);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDrag = ({ _active, over }: any) => {
    if (_active.id !== over?.id) {
      const oldIndex = items.indexOf(_active.id);
      const newIndex = items.indexOf(over.id);
      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex w-[480px] flex-col gap-8">
      <div className="flex flex-col gap-2 md:gap-3">
        <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">설정</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
            매장
          </h2>
          <p className="mt-3 text-sm font-medium text-gray-100 md:mt-4">
            주방 프린터기와 연결된 기기를 선택해주세요.
          </p>
          <div className="mt-3 flex flex-row gap-3">
            {["POS", "홀"].map((key, index) => {
              const isActive = active === index;
              return (
                <ResponsiveButton
                  key={key}
                  variant="outline"
                  color={isActive ? "primary" : "grey"}
                  responsiveButtons={{
                    lg: {
                      buttonSize: "custom",
                      className: `h-10 w-full px-5 rounded-[8px]`,
                    },
                    md: {
                      buttonSize: "sm",
                      className: `w-full`,
                    },
                    sm: {
                      buttonSize: "sm",
                      className: `flex w-full`,
                    },
                  }}
                  commonClassName={isActive ? "" : "border-gray-500"}
                  onClick={() => setActive(index as 0 | 1)}
                >
                  {key}
                </ResponsiveButton>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
            주문
          </h2>
          <div className="mt-3 flex flex-col gap-3 md:mt-4">
            <div className="flex w-full items-center">
              <span className="flex-1 text-sm">
                손님 테이블 메뉴 팝업창 띄우기
              </span>
              <Switch />
            </div>
            <div className="flex w-full items-center">
              <span className="flex-1 text-sm">
                손님 테이블 주문 내역에서 총 주문금액 표시하기
              </span>
              <Switch />
            </div>
            <div className="flex w-full flex-col gap-3 md:gap-2 lg:gap-3">
              <span className="flex-1 text-sm">
                직원 호출 페이지에 옵션 추가{" "}
                <span className="md:text-xxs ml-1 text-xs font-medium text-gray-300 lg:ml-[6px] lg:text-xs">
                  최대 12개
                </span>
              </span>
              <Form {...form}>
                <form
                  className="flex items-center gap-[6px]"
                  onSubmit={form.handleSubmit(submitHandler)}
                >
                  <Input
                    className="!h-9 w-full !rounded-[10px] placeholder:text-xs placeholder:text-gray-300"
                    placeholder="옵션명을 입력해주세요."
                    {...form.register("value")}
                  />
                  <ResponsiveButton
                    type="submit"
                    color="black"
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
                </form>
              </Form>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDrag}
            >
              <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex flex-wrap gap-2">
                  {items.map((id) => (
                    <MoveableChips key={id} id={id} onDelete={() => {}}>
                      {id}
                    </MoveableChips>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}
