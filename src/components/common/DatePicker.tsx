"use client";

import { CalendarDays as CalendarIcon } from "@/components/common/Icon/index";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/Popover";
import Calendar from "@/components/common/Calender";
import cn from "@/lib/utils";

interface IProps {
  date: Date | null;
  onSetDate: (value: Date | null) => void;
}

export default function DatePicker({ date, onSetDate }: IProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      document.body.classList.add("disable-modal-close");
    } else {
      document.body.classList.remove("disable-modal-close");
    }
    setOpen(newOpen);
  };

  const formattedDate = date
    ? date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "")
    : null;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          color="black"
          className={cn(
            "relative h-[48px] w-[280px] justify-between rounded-[10px] border border-gray-500 px-4 py-3 pr-4 text-left text-base font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            <span className="text-gray-0">{formattedDate}</span>
          ) : (
            <span className="text-base text-gray-200">YYYY.MM.DD</span>
          )}
          <CalendarIcon className="absolute right-3 size-6 text-gray-500" />
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent
          className="!z-[10000] mt-2 ml-15 w-auto p-0"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode="single"
            selected={date!}
            onSelect={(day) => {
              onSetDate(day ?? null);
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      )}
    </Popover>
  );
}
