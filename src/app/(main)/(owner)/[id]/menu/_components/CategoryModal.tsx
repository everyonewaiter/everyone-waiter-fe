import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";
import ModalWithTitle from "@/components/modal/largeModalLayout";
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
import { ArrowDownUp, Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CategoryForm from "./CategoryForm";

interface IProps {
  close: () => void;
}

export default function CategoryModal({ close }: IProps) {
  const [changeMove, setChangeMove] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const form = useFormContext<{
    categories: { name: string }[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const handleDrag = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = fields.indexOf(active.id);
      const newIndex = fields.indexOf(over.id);
      const sorted = arrayMove(fields, oldIndex, newIndex);
      const sortedValues = sorted.map((field) => ({ name: field.name }));

      form.setValue("categories", sortedValues, {
        shouldDirty: true,
      });
    }
  };

  return (
    <ModalWithTitle
      onClose={close}
      title="카테고리"
      topRightComponent={
        <ResponsiveButton
          color="grey"
          responsiveButtons={{
            lg: { buttonSize: "md", className: "!rounded-[24px] !px-4 !py-2" },
          }}
          onClick={() => setChangeMove(true)}
        >
          <ArrowDownUp size={18} strokeWidth={1.5} />
          <span className="lg:text-base">순서 변경</span>
        </ResponsiveButton>
      }
    >
      <ScrollArea className="h-[464px]">
        {changeMove ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDrag}
          >
            <SortableContext
              items={fields}
              strategy={horizontalListSortingStrategy}
            >
              <CategoryForm remove={remove} changeMove={changeMove} />
            </SortableContext>
          </DndContext>
        ) : (
          <CategoryForm remove={remove} changeMove={changeMove} />
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
      <ModalWithTitle.ButtonGroup
        cancelBtn={{
          text: "닫기",
          onClick: close,
          disabled: false,
        }}
        saveBtn={{
          text: changeMove ? "순서 저장하기" : "저장하기",
          onClick: () => {},
          disabled: false,
          color: changeMove ? "black" : "primary",
        }}
      />
    </ModalWithTitle>
  );
}
