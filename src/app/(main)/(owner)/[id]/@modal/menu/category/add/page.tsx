"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ArrowDownUp, Plus } from "lucide-react";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ScrollArea } from "@/components/common/ScrollArea";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Icon from "@/components/common/Icon";
import ModalTitle from "../../../_components/ModalTitle";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import ModalButton from "../../../_components/ModalButton";
import useCategoryStore from "../../../../menu/_hooks/useCategoryStore";

export default function Page() {
  const [changeMove, setChangeMove] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const { categories } = useCategoryStore();

  const form = useForm<{ categories: { name: string }[] }>({
    defaultValues: {
      categories,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const handleDrag = ({ active, over }: any) => {
    if (!over) return;

    const oldIndex = categories.findIndex((c) => c.name === active.id);
    const newIndex = categories.findIndex((c) => c.name === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const sorted = arrayMove(categories, oldIndex, newIndex);
    form.setValue("categories", sorted);
  };

  return (
    <>
      <ModalTitle
        title="카테고리"
        topRightComponent={
          <>
            <ResponsiveButton
              color="grey"
              responsiveButtons={{
                lg: {
                  buttonSize: "md",
                  className: "!rounded-[24px] !px-4 !py-2",
                },
              }}
              commonClassName="hidden lg:flex"
              onClick={() => setChangeMove(true)}
            >
              <ArrowDownUp
                size={18}
                strokeWidth={1.5}
                className="md:h-3 md:w-3 lg:h-[18px] lg:w-[18px]"
              />
              <span className="lg:text-base">순서 변경</span>
            </ResponsiveButton>
            <div className="flex items-center gap-4 lg:hidden">
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => setChangeMove(true)}
              >
                <ArrowDownUp
                  size={16}
                  strokeWidth={1.5}
                  className="text-gray-300"
                />
                <span className="text-sm text-gray-300">순서 변경</span>
              </button>
              <button type="button" className="flex items-center gap-1">
                <Icon iconKey="trash" className="text-status-error" size={16} />
                <span className="text-status-error text-sm">삭제</span>
              </button>
            </div>
          </>
        }
      />
      <ScrollArea className="h-[270px]">
        {changeMove ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDrag}
          >
            <SortableContext
              items={categories.map((c) => c.name)}
              strategy={horizontalListSortingStrategy}
            >
              <FormProvider {...form}>
                <CategoryForm
                  changeMove={changeMove}
                  fields={fields}
                  remove={remove}
                />
              </FormProvider>
            </SortableContext>
          </DndContext>
        ) : (
          <FormProvider {...form}>
            <CategoryForm
              changeMove={changeMove}
              fields={fields}
              remove={remove}
            />
          </FormProvider>
        )}
      </ScrollArea>

      {!changeMove && (
        <div className="flex flex-col md:mb-6 lg:mb-8">
          <ResponsiveButton
            type="button"
            variant="outline"
            color="grey"
            responsiveButtons={{
              sm: {
                buttonSize: "sm",
                className: "mt-6 h-[34px] gap-2 items-center",
              },
              md: {
                buttonSize: "sm",
                className: "items-center gap-1 !text-s !font-medium mt-4",
              },
              lg: {
                buttonSize: "lg",
                className: "mt-4",
              },
            }}
            commonClassName="w-full border-none dashed-light"
            onClick={() => append({ name: "" })}
          >
            <Plus size={24} className="md:h-4 md:w-4 lg:h-6 lg:w-6" />
            <span>카테고리 추가</span>
          </ResponsiveButton>
        </div>
      )}

      <ModalButton
        buttonText={changeMove ? "순서 저장하기" : "저장하기"}
        colorBlack={changeMove}
      />
    </>
  );
}
