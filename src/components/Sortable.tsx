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

  const handleDragStart = () => {
    document.body.style.overflow = "hidden";
  };

  const handleDragEnd = (event: any) => {
    document.body.style.overflow = "";
    onDragEnd(event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
