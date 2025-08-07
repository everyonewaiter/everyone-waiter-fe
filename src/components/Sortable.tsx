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
import { PropsWithChildren } from "react";

interface IProps {
  items: any[];
  onDragEnd: (event: any) => void;
}

export default function Sortable({
  items,
  onDragEnd,
  children,
}: PropsWithChildren<IProps>) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
