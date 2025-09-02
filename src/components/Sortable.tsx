"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  SortableContext,
  verticalListSortingStrategy,
} from "@/components/dnd/index";
import { Modifiers, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { Props } from "@dnd-kit/core/dist/components/DragOverlay";
import { SortingStrategy } from "@dnd-kit/sortable";
import { NamedExoticComponent, PropsWithChildren } from "react";

interface IProps extends Partial<NamedExoticComponent<Props>> {
  items?: any[];
  onDragEnd: (event: any) => void;
  sortingStrategy?: SortingStrategy;
  modifiers?: Modifiers;
}

export default function Sortable({
  items,
  onDragEnd,
  children,
  sortingStrategy,
  modifiers,
  ...props
}: PropsWithChildren<IProps>) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 150, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

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
        items={items!}
        strategy={sortingStrategy ?? verticalListSortingStrategy}
        {...props}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
