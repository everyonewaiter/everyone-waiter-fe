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
import { SortingStrategy } from "@dnd-kit/sortable";
import { PropsWithChildren } from "react";

interface IProps {
  items: any[];
  onDragEnd: (event: any) => void;
  sortingStrategy?: SortingStrategy;
}

export default function Sortable({
  items,
  onDragEnd,
  children,
  sortingStrategy,
}: PropsWithChildren<IProps>) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items}
        strategy={sortingStrategy ?? verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
