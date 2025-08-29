"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  SortableContext,
  verticalListSortingStrategy,
} from "@/components/dnd/index";
import { Props } from "@dnd-kit/core/dist/components/DragOverlay";
import { SortingStrategy } from "@dnd-kit/sortable";
import { NamedExoticComponent, PropsWithChildren } from "react";

interface IProps extends Partial<NamedExoticComponent<Props>> {
  items: any[];
  onDragEnd: (event: any) => void;
  sortingStrategy?: SortingStrategy;
}

export default function Sortable({
  items,
  onDragEnd,
  children,
  sortingStrategy,
  ...props
}: PropsWithChildren<IProps>) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      {...props}
    >
      <SortableContext
        items={items}
        strategy={sortingStrategy ?? verticalListSortingStrategy}
        {...props}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
