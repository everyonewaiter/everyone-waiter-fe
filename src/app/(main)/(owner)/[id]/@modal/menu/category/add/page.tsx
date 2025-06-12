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
import ModalTitle from "../../../_components/ModalTitle";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import ModalButton from "../../../_components/ModalButton";
import { useCategoryStore } from "../../../../menu/_hooks/useCategoryStore";

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
          <ResponsiveButton
            color="grey"
            responsiveButtons={{
              lg: {
                buttonSize: "md",
                className: "!rounded-[24px] !px-4 !py-2",
              },
            }}
            onClick={() => setChangeMove(true)}
          >
            <ArrowDownUp size={18} strokeWidth={1.5} />
            <span className="lg:text-base">순서 변경</span>
          </ResponsiveButton>
        }
      />
      <ScrollArea className="h-[464px]">
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
        <div className="mb-8 flex flex-col">
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
                className: "h-[34px] items-center hidden gap-1",
              },
              lg: {
                buttonSize: "lg",
                className: "mt-4",
              },
            }}
            commonClassName="w-full border-gray-400 border-dotted"
            onClick={() => append({ name: "" })}
          >
            <Plus />
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
